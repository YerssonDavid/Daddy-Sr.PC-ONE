package com.example.david.one.daddypcbackend.application.port.in.assistant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantCommand;
import reactor.core.publisher.Flux;

public interface IAssistantAI {
    Flux<String> askToAi(QuestionToAssistantCommand command);
}
