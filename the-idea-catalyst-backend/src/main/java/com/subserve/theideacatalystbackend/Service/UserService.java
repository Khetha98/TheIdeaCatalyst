package com.subserve.theideacatalystbackend.Service;

import com.subserve.theideacatalystbackend.Entity.User;
import java.util.List;

import java.util.Optional;

public interface UserService {
    User createUser(User user);
    String userLogin(User user);
    User updateUser(User user);
    List<User> getAllUsers();
    Optional<User> findUserById(Long id);
    void deleteUser(Long id);
}


