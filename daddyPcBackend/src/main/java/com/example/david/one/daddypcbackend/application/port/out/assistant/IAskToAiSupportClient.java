package com.example.david.one.daddypcbackend.application.port.out.assistant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantSupportCommand;
import reactor.core.publisher.Flux;

public interface IAskToAiSupportClient {
    Flux<String> askToAiSupport(QuestionToAssistantSupportCommand command);
}
