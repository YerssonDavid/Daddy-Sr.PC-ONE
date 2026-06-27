package com.example.david.one.daddypcbackend.infraestructure.web.in.assitant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantTestCommand;
import com.example.david.one.daddypcbackend.application.port.in.assistant.IAssistantAI;
import com.example.david.one.daddypcbackend.application.port.in.assistant.IAssistantAITest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("ai/free/user")
@RequiredArgsConstructor
public class QuestionAssistantFreeController {
    private final IAssistantAITest iAssistantAITest;

    @PostMapping(produces= MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> askToModelOfUserFree (@RequestBody QuestionToAssistantTestCommand command) {
        return iAssistantAITest.askQuestion(command);
    }
}
