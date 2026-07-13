package com.example.david.one.daddypcbackend.infraestructure.adapter.assistant;

import com.example.david.one.daddypcbackend.application.port.out.assistant.IAssistantAIClient;
import com.example.david.one.daddypcbackend.infraestructure.dto.asistant.SystemPromptAgent;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

@Component
public class AssistantAIAdapter implements IAssistantAIClient {

    private final TavilySearchToolsAdapter tavilySearchToolsAdapter;
    private final GetTime getTime;
    private final ChatClient chatClient;

    public AssistantAIAdapter(@Qualifier("principalAgentChatClient") ChatClient chatClient, TavilySearchToolsAdapter tavilySearchToolsAdapter, GetTime getTime) {
        this.chatClient = chatClient;
        this.tavilySearchToolsAdapter = tavilySearchToolsAdapter;
        this.getTime = getTime;
    }

    @Override
    public Flux<String> ask(String question, String conversationId) {
        return chatClient.prompt()
                .user(question)
                .tools(tavilySearchToolsAdapter, getTime)
                .advisors(a -> a.param(ChatMemory.CONVERSATION_ID, conversationId))
                .stream()
                .content();
    }
}
