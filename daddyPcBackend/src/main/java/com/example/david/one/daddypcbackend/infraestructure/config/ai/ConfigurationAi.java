package com.example.david.one.daddypcbackend.infraestructure.config.ai;

import com.example.david.one.daddypcbackend.infraestructure.dto.asistant.SystemPromptAgent;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.InMemoryChatMemoryRepository;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConfigurationAi {
    @Bean
    public ChatClient chatClient(ChatClient.Builder builder, VectorStore vectorStore, @Qualifier("principalAgent") ChatMemory chatMemory) {
        QuestionAnswerAdvisor advisor = QuestionAnswerAdvisor.builder(vectorStore)
                .searchRequest(SearchRequest.builder()
                        .similarityThreshold(0.75)
                        .topK(5)
                        .build())
                .build();

        MessageChatMemoryAdvisor memoryAdvisor = MessageChatMemoryAdvisor.builder(chatMemory).build();

        return builder
                .defaultSystem(SystemPromptAgent.getPrompt())
                .defaultAdvisors(advisor, memoryAdvisor)
                .build();
    }

    //Config Chat Memory for agents
    @Bean("principalAgent")
    public ChatMemory chatMemoryPrincipalAgent(){
        return MessageWindowChatMemory.builder()
                .chatMemoryRepository(new InMemoryChatMemoryRepository())
                .maxMessages(25)
                .build();
    }
}
