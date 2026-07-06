package com.example.david.one.daddypcbackend.infraestructure.config.pdf;

import com.example.david.one.daddypcbackend.infraestructure.service.pdf.PdfReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PdfConfig {

    private static final Logger log = LoggerFactory.getLogger(PdfConfig.class);

    @Bean
    CommandLineRunner ingestPrincipalRunner (PdfReader pdfReader,
                                             @Qualifier("vectorPrincipalAgent") VectorStore principalVectorStore)
    {
        return args -> {
            try {
                pdfReader.ingestAllDocuments("DocumentationTechnique", principalVectorStore);
            } catch (Exception e) {
                log.error("Failed to ingest principal documents: {}", e.getMessage());
            }
        };
    }

    @Bean
    CommandLineRunner ingestSecondRunner (PdfReader pdfReader,
                                          @Qualifier("vectorSupportAgent") VectorStore secondaryVectorStore)
    {
        return args -> {
            try {
                pdfReader.ingestAllDocuments("DocumentationSupport", secondaryVectorStore);
            } catch (Exception e) {
                log.error("Failed to ingest support documents: {}", e.getMessage());
            }
        };
    }
}
