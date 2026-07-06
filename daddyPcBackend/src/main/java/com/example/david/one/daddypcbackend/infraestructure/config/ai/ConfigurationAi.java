package com.example.david.one.daddypcbackend.infraestructure.config.ai;

import com.example.david.one.daddypcbackend.infraestructure.dto.asistant.SystemPromptAgent;
import com.example.david.one.daddypcbackend.infraestructure.dto.asistant.SystemPromptAgentSupport;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.InMemoryChatMemoryRepository;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.ai.vectorstore.pgvector.PgVectorStore;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class ConfigurationAi {

    //ChatClient for principal agent
    @Bean("principalAgentChatClient")
    public ChatClient chatClient(ChatClient.Builder builder, @Qualifier("vectorPrincipalAgent") VectorStore vectorStore, @Qualifier("principalAgent") ChatMemory chatMemory) {
        QuestionAnswerAdvisor advisor = QuestionAnswerAdvisor.builder(vectorStore)
                .searchRequest(SearchRequest.builder()
                        .similarityThreshold(0.5)
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


    //Chat client for support agent
    @Bean("supportAgentChatClient")
    public ChatClient supportAgentChatClient(ChatClient.Builder builder, @Qualifier("vectorSupportAgent") VectorStore vectorStore, @Qualifier("supportAgent") ChatMemory chatMemory) {
        QuestionAnswerAdvisor advisor = QuestionAnswerAdvisor.builder(vectorStore)
                .searchRequest(SearchRequest.builder()
                        .similarityThreshold(0.1)
                        .topK(5)
                        .build())
                .build();

        MessageChatMemoryAdvisor memoryAdvisor = MessageChatMemoryAdvisor.builder(chatMemory).build();
        return builder
                .defaultSystem(SystemPromptAgentSupport.getPrompt())
                .defaultAdvisors(advisor, memoryAdvisor)
                .build();
    }

    //Config chat memory for agent of support
    @Bean("supportAgent")
    public ChatMemory chatMemorySupportAgent(){
        return MessageWindowChatMemory.builder()
                .chatMemoryRepository(new InMemoryChatMemoryRepository())
                .maxMessages(20)
                .build();
    }

    @Bean("vectorPrincipalAgent")
    public PgVectorStore vectorStorePrincipalAgent(JdbcTemplate jdbcTemplate, EmbeddingModel embeddingModel) {
        return PgVectorStore.builder(jdbcTemplate, embeddingModel)
                .vectorTableName("principal_agent")
                .initializeSchema(false)
                .build();
    }

    @Bean("vectorSupportAgent")
    public PgVectorStore vectorStoreSupportAgent(JdbcTemplate jdbcTemplate, EmbeddingModel embeddingModel) {
        return PgVectorStore.builder(jdbcTemplate, embeddingModel)
                .vectorTableName("support_agent")
                .initializeSchema(false)
                .build();
    }
}
