package com.subserve.theideacatalystbackend.Repository;

import com.subserve.theideacatalystbackend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByName(String name); // Return type is Optional<User>
}


