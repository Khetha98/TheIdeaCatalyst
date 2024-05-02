package com.subserve.theideacatalystbackend.Controller;

import com.subserve.theideacatalystbackend.Entity.Posting;
import com.subserve.theideacatalystbackend.Entity.User;
import com.subserve.theideacatalystbackend.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/postRequest")
// /postRequest/add_post, /postRequest/delete_message
public class PostRequestController {

    @Autowired
    private PostService postService;

    @PostMapping("add_post")
    public ResponseEntity<User> createUser(@RequestBody Posting posting){
        return new ResponseEntity(postService.postContent(posting), HttpStatus.CREATED);
    }

    @DeleteMapping("{postId}")
    public ResponseEntity<String> deletePost(@PathVariable("postId") String postId){
        postService.deletePost((postId));
        return new ResponseEntity("Post deleted!", HttpStatus.OK);
    }
}
