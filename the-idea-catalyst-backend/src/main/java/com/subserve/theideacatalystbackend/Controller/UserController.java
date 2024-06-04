package com.subserve.theideacatalystbackend.Controller;

import com.subserve.theideacatalystbackend.Entity.User;
import com.subserve.theideacatalystbackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("user")
// /user/register, /user/login
public class UserController {

    @Autowired
    private UserService userService;
    @PostMapping("register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }

    @PostMapping("login")
    public ResponseEntity<String> userLogin(@RequestBody User user) {
        return new ResponseEntity<>(userService.userLogin(user), HttpStatus.OK);
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
    public ResponseEntity<User> findUser(@PathVariable("userId") String userId) {
        Long id = Long.parseLong(userId);
        Optional<User> userOptional = userService.findUserById(id);
        if (userOptional.isPresent()) {
            return new ResponseEntity<>(userOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") String userId) {
        Long id = Long.parseLong(userId);
        Optional<User> userOptional = userService.findUserById(id);
        if (userOptional.isPresent()) {
            userService.deleteUser(id);
            return new ResponseEntity<>("User deleted!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found!", HttpStatus.NOT_FOUND);
        }
    }


}
