package com.example.david.one.daddypcbackend.application.useCase.assistant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantSupportCommand;
import com.example.david.one.daddypcbackend.application.port.in.assistant.IAssistantAISupport;
import com.example.david.one.daddypcbackend.application.port.out.assistant.IAskToAiSupportClient;
import reactor.core.publisher.Flux;

public class QuestionAiSupport implements IAssistantAISupport {

    private final IAskToAiSupportClient iAskToAiSupportClient;

    public QuestionAiSupport(IAskToAiSupportClient client) {
        this.iAskToAiSupportClient = client;
    }

    @Override
    public Flux<String> askToAiSupport(QuestionToAssistantSupportCommand command) {
        return iAskToAiSupportClient.askToAiSupport(command);
    }
}
