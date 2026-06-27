package com.example.david.one.daddypcbackend.infraestructure.config.beans.assistant;

import com.example.david.one.daddypcbackend.application.port.out.assistant.IAssistantAIClient;
import com.example.david.one.daddypcbackend.application.port.out.assistant.IAssistantAITestClient;
import com.example.david.one.daddypcbackend.application.useCase.assistant.QuestionAiUseCase;
import com.example.david.one.daddypcbackend.application.useCase.assistant.QuestionToAssistantTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConfigAssistant {

    @Bean
    public QuestionAiUseCase questionAiUseCase(IAssistantAIClient assistantAIClient) {
        return new QuestionAiUseCase(assistantAIClient);
    }

    @Bean
    public QuestionToAssistantTest questionToAssistantTest(IAssistantAITestClient iAssistantAITestClient) {
        return new QuestionToAssistantTest(iAssistantAITestClient);
    }
}
