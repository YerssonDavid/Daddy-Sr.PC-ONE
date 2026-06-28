package com.example.david.one.daddypcbackend.application.port.out.assistant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantTestCommand;
import reactor.core.publisher.Flux;

public interface IAssistantAIFreeClient {
    Flux<String> askQuestion(QuestionToAssistantTestCommand command);
}
