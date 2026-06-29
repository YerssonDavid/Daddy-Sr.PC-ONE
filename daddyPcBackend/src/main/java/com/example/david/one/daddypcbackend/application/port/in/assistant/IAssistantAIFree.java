package com.example.david.one.daddypcbackend.application.port.in.assistant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantTestCommand;
import reactor.core.publisher.Flux;

public interface IAssistantAIFree {
    String askQuestion(QuestionToAssistantTestCommand command);
}
