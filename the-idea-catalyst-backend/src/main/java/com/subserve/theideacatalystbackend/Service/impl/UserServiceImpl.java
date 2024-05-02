package com.subserve.theideacatalystbackend.Service.impl;

import com.subserve.theideacatalystbackend.Entity.User;
import com.subserve.theideacatalystbackend.Repository.UserRepository;
import com.subserve.theideacatalystbackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public User createUser(User user) {
        userRepository.save(user);
        return user;
    }

    @Override
    public String userLogin(User user) {
        User logingUser = userRepository.findByUserId(user.getUserId());
        if (logingUser != null && user.getName().equals(logingUser.getName())) {
            return "Login successful!";
        }
        return "Login unsuccessful!";
    }


    // Optional addition
    @Override
    public User updateUser(User user){
        User updateUser = userRepository.findByUserId(user.getUserId());
        updateUser.setUserId(user.getUserId());
        updateUser.setName(user.getName());
        updateUser.setSurname(user.getSurname());
        userRepository.save(updateUser);
        return updateUser;
    }

    @Override
    public List getAllUsers() {
        List<User> listOfUsers = userRepository.findAll();
        return listOfUsers;
    }

    //Optional addition
    @Override
    public User findUserById(String userId) {
        return userRepository.findByUserId(userId);
    }

    @Override
    public void deleteUser(String userId) {
        User user = userRepository.findByUserId(userId);
        userRepository.delete(user);
    }
}
