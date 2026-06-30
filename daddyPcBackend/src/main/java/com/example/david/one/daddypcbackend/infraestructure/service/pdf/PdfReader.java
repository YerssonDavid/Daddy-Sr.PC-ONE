package com.example.david.one.daddypcbackend.infraestructure.service.pdf;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.document.Document;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.reader.pdf.config.PdfDocumentReaderConfig;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;
import java.util.List;

@Component
@RequiredArgsConstructor
public class PdfReader {

    private final VectorStore vectorStore;

    public void ingestAllDocuments() {
        ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        Resource[] resources;

        try {
            resources = resolver.getResources("classpath:pdf/*.pdf");
        } catch (IOException e) {
            throw new RuntimeException("Error finding documents", e);
        }

        for (Resource resource : resources) {
            ingestSinglePdf(resource);
        }

        System.out.println("Ingested completed!");
    }

    private void ingestSinglePdf(Resource resource) {
        try {
            String filename = resource.getFilename();

            PagePdfDocumentReader reader = new PagePdfDocumentReader(
                    resource,
                    PdfDocumentReaderConfig.builder()
                            .withPageTopMargin(0)
                            .withPagesPerDocument(1)
                            .build()
            );

            List<Document> documents = reader.read();

            TokenTextSplitter splitter = TokenTextSplitter.builder()
                    .withChunkSize(500)
                    .withMinChunkSizeChars(280)
                    .build();

            List<Document> chunks = splitter.apply(documents);

            chunks.forEach(chunk -> {
                chunk.getMetadata().put("source", filename);
                chunk.getMetadata().put("type", "documentation");
                chunk.getMetadata().put("ingested_at", Instant.now().toString());
            });

            vectorStore.add(chunks);

            System.out.println("Index: " + filename + " → " + chunks.size() + " chunks");

        } catch (Exception e) {
            System.err.println("Error processing: " + resource.getFilename());
            e.printStackTrace();
        }
    }
}