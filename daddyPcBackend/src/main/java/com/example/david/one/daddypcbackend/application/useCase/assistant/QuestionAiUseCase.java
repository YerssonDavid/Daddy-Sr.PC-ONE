package com.example.david.one.daddypcbackend.application.useCase.assistant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantCommand;
import com.example.david.one.daddypcbackend.application.port.in.assistant.IAssistantAI;
import com.example.david.one.daddypcbackend.application.port.out.assistant.IAssistantAIClient;
import reactor.core.publisher.Flux;

public class QuestionAiUseCase implements IAssistantAI {

    private final IAssistantAIClient assistantAIClient;

    public QuestionAiUseCase(IAssistantAIClient assistantAIClient) {
        this.assistantAIClient = assistantAIClient;
    }

    @Override
    public Flux<String> askToAi(QuestionToAssistantCommand command) {
        return assistantAIClient.ask(command.questionAi(), command.conversationId());
    }
}
