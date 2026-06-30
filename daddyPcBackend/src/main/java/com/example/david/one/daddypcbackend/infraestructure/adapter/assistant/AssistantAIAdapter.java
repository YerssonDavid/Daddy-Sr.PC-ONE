package com.example.david.one.daddypcbackend.infraestructure.adapter.assistant;

import com.example.david.one.daddypcbackend.application.port.out.assistant.IAssistantAIClient;
import com.example.david.one.daddypcbackend.infraestructure.dto.asistant.SystemPromptAgent;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

@Component
public class AssistantAIAdapter implements IAssistantAIClient {

    private final TavilySearchToolsAdapter tavilySearchToolsAdapter;
    private final ChatClient chatClient;

    public AssistantAIAdapter(ChatClient chatClient, TavilySearchToolsAdapter tavilySearchToolsAdapter) {
        this.chatClient = chatClient;
        this.tavilySearchToolsAdapter = tavilySearchToolsAdapter;
    }

    @Override
    public Flux<String> ask(String question, String conversationId) {
        return chatClient.prompt()
                .user(question)
                .tools(tavilySearchToolsAdapter)
                .advisors(a -> a.param(ChatMemory.CONVERSATION_ID, conversationId))
                .stream()
                .content();
    }
}
