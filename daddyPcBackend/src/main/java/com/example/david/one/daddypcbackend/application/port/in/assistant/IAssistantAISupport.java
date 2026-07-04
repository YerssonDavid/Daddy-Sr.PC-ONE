package com.example.david.one.daddypcbackend.application.port.in.assistant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantSupportCommand;
import reactor.core.publisher.Flux;

public interface IAssistantAISupport {
    Flux<String> askToAiSupport(QuestionToAssistantSupportCommand command);
}
