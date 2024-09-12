package com.subserve.theideacatalystbackend.Controller;

import com.subserve.theideacatalystbackend.Entity.MessageEntity;
import com.subserve.theideacatalystbackend.Entity.User;
import com.subserve.theideacatalystbackend.Service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/message")
public class MessageController implements ErrorController {

    @Autowired
    private MessageService messageService;

    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    public String error() {
        return "Error handling";
    }


    @PostMapping("/send_message")
    public ResponseEntity<MessageEntity> sendMessage(@RequestBody MessageEntity messageEntity) {
        return new ResponseEntity<>(messageService.sendMessage(messageEntity), HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/get_messages/{sender}/{receiver}")
    public ResponseEntity<List<MessageEntity>> getMessages(@PathVariable String sender, @PathVariable String receiver) {
        return ResponseEntity.ok(messageService.getMessages(sender, receiver));
    }
}
