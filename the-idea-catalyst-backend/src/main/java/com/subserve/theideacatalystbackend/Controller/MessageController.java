package com.subserve.theideacatalystbackend.Controller;

import com.subserve.theideacatalystbackend.Entity.MessageEntity;
import com.subserve.theideacatalystbackend.Entity.User;
import com.subserve.theideacatalystbackend.Service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/message")
// /message/send_message
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("send_message")
    public ResponseEntity<User> sendMessage(@RequestBody MessageEntity messageEntity){
        return new ResponseEntity(messageService.sendMessage(messageEntity), HttpStatus.CREATED);
    }
}
