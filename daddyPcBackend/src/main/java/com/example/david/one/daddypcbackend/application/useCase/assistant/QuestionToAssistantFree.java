package com.example.david.one.daddypcbackend.application.useCase.assistant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantTestCommand;
import com.example.david.one.daddypcbackend.application.port.in.assistant.IAssistantAIFree;
import com.example.david.one.daddypcbackend.application.port.out.assistant.IAssistantAIFreeClient;
import reactor.core.publisher.Flux;

public class QuestionToAssistantFree implements IAssistantAIFree {

    private final IAssistantAIFreeClient iAssistantAITest;

    public QuestionToAssistantFree(IAssistantAIFreeClient iAssistantAITest) {
        this.iAssistantAITest = iAssistantAITest;
    }

    @Override
    public Flux<String> askQuestion(QuestionToAssistantTestCommand command) {
        return iAssistantAITest.askQuestion(command);
    }
}
