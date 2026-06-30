package com.example.david.one.daddypcbackend.infraestructure.config.pdf;

import com.example.david.one.daddypcbackend.infraestructure.service.pdf.PdfReader;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PdfConfig {

    @Bean
    CommandLineRunner ingestRunner(PdfReader pdfReader) {
        return args -> pdfReader.ingestAllDocuments();
    }
}
