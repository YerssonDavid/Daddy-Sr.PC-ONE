package com.example.david.one.daddypcbackend.application.useCase.assistant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantTestCommand;
import com.example.david.one.daddypcbackend.application.port.in.assistant.IAssistantAITest;
import com.example.david.one.daddypcbackend.application.port.out.assistant.IAssistantAITestClient;
import reactor.core.publisher.Flux;

public class QuestionToAssistantTest implements IAssistantAITest {

    private final IAssistantAITestClient iAssistantAITest;

    public QuestionToAssistantTest(IAssistantAITestClient iAssistantAITest) {
        this.iAssistantAITest = iAssistantAITest;
    }

    @Override
    public Flux<String> askQuestion(QuestionToAssistantTestCommand command) {
        return iAssistantAITest.askQuestion(command);
    }
}
