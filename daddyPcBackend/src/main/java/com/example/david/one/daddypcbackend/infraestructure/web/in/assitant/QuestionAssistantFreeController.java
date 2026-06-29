package com.example.david.one.daddypcbackend.infraestructure.web.in.assitant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantTestCommand;
import com.example.david.one.daddypcbackend.application.port.in.assistant.IAssistantAIFree;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/ai/free/user")
@RequiredArgsConstructor
public class QuestionAssistantFreeController {

    private final IAssistantAIFree iAssistantAIFree;

    @PostMapping
    public String askToModelOfUserFree (@RequestBody QuestionToAssistantTestCommand command) {
        return iAssistantAIFree.askQuestion(command);
    }
}
