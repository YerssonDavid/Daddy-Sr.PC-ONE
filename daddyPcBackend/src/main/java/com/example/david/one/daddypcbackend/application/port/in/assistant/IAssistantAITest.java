package com.example.david.one.daddypcbackend.application.port.in.assistant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantTestCommand;
import reactor.core.publisher.Flux;

public interface IAssistantAITest {
    Flux<String> askQuestion(QuestionToAssistantTestCommand command);
}
