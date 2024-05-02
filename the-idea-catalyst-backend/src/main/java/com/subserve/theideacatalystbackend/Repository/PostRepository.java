package com.subserve.theideacatalystbackend.Repository;

import com.subserve.theideacatalystbackend.Entity.Posting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Posting, String> {

    Posting findByPostId(String postId);
}
