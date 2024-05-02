package com.subserve.theideacatalystbackend.Service;

import com.subserve.theideacatalystbackend.Entity.User;

import java.util.ArrayList;
import java.util.List;

public interface UserService {

    User createUser(User user);

    String userLogin(User user);

    User updateUser(User user);

    List getAllUsers();

    User findUserById(String userId);

    void deleteUser(String userId);
}
