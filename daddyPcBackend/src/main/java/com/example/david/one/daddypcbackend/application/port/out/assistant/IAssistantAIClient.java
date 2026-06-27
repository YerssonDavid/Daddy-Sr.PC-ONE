package com.example.david.one.daddypcbackend.application.port.out.assistant;

import reactor.core.publisher.Flux;

public interface IAssistantAIClient {
    Flux<String> ask(String question, String conversationId);
}
