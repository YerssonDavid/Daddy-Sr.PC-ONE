package com.example.david.one.daddypcbackend.infraestructure.web.in.assitant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantSupportCommand;
import com.example.david.one.daddypcbackend.application.port.in.assistant.IAssistantAISupport;
import com.example.david.one.daddypcbackend.infraestructure.dto.asistant.QuestionAssistantRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/ask/support")
@RequiredArgsConstructor
public class QuestionAssitantSupportController {

    private final IAssistantAISupport assistantAISupport;

    @PostMapping(produces= MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> questionAssistantSupport(@Valid @RequestBody QuestionAssistantRequest question, @RequestParam String conversationId) {
        QuestionToAssistantSupportCommand command = new QuestionToAssistantSupportCommand(
                question.question(),
                conversationId
        );
        return assistantAISupport.askToAiSupport(command)
                .map(chunk -> ServerSentEvent.<String>builder()
                        .data(chunk)
                        .build());
    }
}
