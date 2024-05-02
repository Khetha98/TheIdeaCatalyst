package com.subserve.theideacatalystbackend.Controller;

import com.subserve.theideacatalystbackend.Entity.User;
import com.subserve.theideacatalystbackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user")
// /user/register, /user/login
public class UserController {

    @Autowired
    private UserService userService;
    @PostMapping("register")
    public ResponseEntity<User> createUser(@RequestBody User user){
        return new ResponseEntity(userService.createUser(user), HttpStatus.CREATED);
    }

    @PostMapping("login")
    public ResponseEntity<String> userLogin(@RequestBody User user){
        return new ResponseEntity(userService.userLogin(user), HttpStatus.OK);
    }

    //Optional Extra Methods
    @PutMapping("update")
    public ResponseEntity<User> updateUser(@RequestBody User user){
        return new ResponseEntity(userService.updateUser(user), HttpStatus.OK);
    }

    @GetMapping("users")
    public ResponseEntity<List> getAllUsers(){
        return new ResponseEntity(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("{userId}")
    public ResponseEntity<User> findUser(@PathVariable("userId") String userId){
        return new ResponseEntity(userService.findUserById(userId), HttpStatus.OK);
    }

    @DeleteMapping("{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") String userId){
        userService.deleteUser((userId));
        return new ResponseEntity("User deleted!", HttpStatus.OK);
    }
}
