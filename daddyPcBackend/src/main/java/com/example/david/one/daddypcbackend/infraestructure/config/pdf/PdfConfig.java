package com.example.david.one.daddypcbackend.infraestructure.config.pdf;

import com.example.david.one.daddypcbackend.infraestructure.service.pdf.PdfReader;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PdfConfig {

    @Bean
    CommandLineRunner ingestPrincipalRunner (PdfReader pdfReader,
                                             @Qualifier("vectorPrincipalAgent") VectorStore principalVectorStore)
    {
        return args -> {
            pdfReader.ingestAllDocuments("DocumentationTechnique", principalVectorStore);
        };
    }

    @Bean
    CommandLineRunner ingestSecondRunner (PdfReader pdfReader,
                                          @Qualifier("vectorSupportAgent") VectorStore secondaryVectorStore)
    {
        return args -> {
            pdfReader.ingestAllDocuments("DocumentationSupport", secondaryVectorStore);
        };
    }
}
