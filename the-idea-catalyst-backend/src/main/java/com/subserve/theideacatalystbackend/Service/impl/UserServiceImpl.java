package com.subserve.theideacatalystbackend.Service.impl;

import com.subserve.theideacatalystbackend.Entity.User;
import com.subserve.theideacatalystbackend.Repository.UserRepository;
import com.subserve.theideacatalystbackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        Optional<User> loggingUser = userRepository.findByName(user.getName());
        if (loggingUser.isPresent() && user.getPassword().equals(loggingUser.get().getPassword())) {
            return "Login successful!";
        }
        return "Login unsuccessful!";
    }

    @Override
    public User updateUser(User user) {
        Optional<User> updateUser = userRepository.findById(user.getId());
        if (updateUser.isPresent()) {
            User existingUser = updateUser.get();
            existingUser.setName(user.getName());
            existingUser.setSurname(user.getSurname());
            existingUser.setPassword(user.getPassword());
            existingUser.setStreet(user.getStreet());
            existingUser.setCity(user.getCity());
            existingUser.setState(user.getState());
            existingUser.setCountry(user.getCountry());
            existingUser.setZipcode(user.getZipcode());
            existingUser.setPic(user.getPic());
            userRepository.save(existingUser);
            return existingUser;
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}


