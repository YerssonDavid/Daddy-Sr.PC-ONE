package com.example.david.one.daddypcbackend.infraestructure.adapter.assistant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantSupportCommand;
import com.example.david.one.daddypcbackend.application.port.out.assistant.IAskToAiSupportClient;
import com.example.david.one.daddypcbackend.infraestructure.dto.asistant.SystemPromptAgentSupport;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

@Component
public class IAskToAiSupportClientAdapter implements IAskToAiSupportClient {

    private final ChatClient chatClient;

    public IAskToAiSupportClientAdapter(@Qualifier("supportAgentChatClient") ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @Override
    public Flux<String> askToAiSupport(QuestionToAssistantSupportCommand command) {
        return chatClient.prompt()
                .user(command.question())
                .advisors(a -> a.param(ChatMemory.CONVERSATION_ID, command.conversationId()))
                .stream()
                .content();
    }
}
