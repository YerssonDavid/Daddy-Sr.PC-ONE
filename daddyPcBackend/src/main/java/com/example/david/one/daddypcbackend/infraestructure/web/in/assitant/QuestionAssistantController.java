package com.example.david.one.daddypcbackend.infraestructure.web.in.assitant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantCommand;
import com.example.david.one.daddypcbackend.application.port.in.assistant.IAssistantAI;
import com.example.david.one.daddypcbackend.infraestructure.web.in.assitant.dto.QuestionAssistantRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/ask")
@RequiredArgsConstructor
public class QuestionAssistantController {

    private final IAssistantAI assistantAI;

    @PostMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> askToAi(@Valid @RequestBody QuestionAssistantRequest request, @RequestParam String conversationId) {
        return assistantAI.askToAi(new QuestionToAssistantCommand(request.question(), conversationId))
                .map(chunk -> ServerSentEvent.<String>builder()
                        .data(chunk)
                        .build());
    }
}
