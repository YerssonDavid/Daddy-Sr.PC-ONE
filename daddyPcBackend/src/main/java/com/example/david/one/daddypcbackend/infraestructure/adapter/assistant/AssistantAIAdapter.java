package com.example.david.one.daddypcbackend.infraestructure.adapter.assistant;

import com.example.david.one.daddypcbackend.application.port.out.assistant.IAssistantAIClient;
import com.example.david.one.daddypcbackend.infraestructure.dto.asistant.SystemPromptAgent;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

import java.util.concurrent.atomic.AtomicBoolean;

@Component
public class AssistantAIAdapter implements IAssistantAIClient {

    private final TavilySearchToolsAdapter tavilySearchToolsAdapter;
    private final ChatClient chatClient;

    public AssistantAIAdapter(ChatClient.Builder chatClientBuilder, ChatMemory chatMemory, TavilySearchToolsAdapter tavilySearchToolsAdapter) {
        this.chatClient = chatClientBuilder
                .defaultSystem(SystemPromptAgent.getPrompt())
                .defaultAdvisors(MessageChatMemoryAdvisor.builder(chatMemory).build())
                .build();
        this.tavilySearchToolsAdapter = tavilySearchToolsAdapter;
    }

    @Override
    public Flux<String> ask(String question, String conversationId) {
        AtomicBoolean answerStarted = new AtomicBoolean(false);
        StringBuilder buffer = new StringBuilder();

        return chatClient.prompt()
                .user(question)
                .tools(tavilySearchToolsAdapter)
                .advisors(a -> a.param(ChatMemory.CONVERSATION_ID, conversationId))
                .stream()
                .content();
    }
}
