package com.subserve.theideacatalystbackend.Service.impl;

import com.subserve.theideacatalystbackend.Entity.Posting;
import com.subserve.theideacatalystbackend.Repository.PostRepository;
import com.subserve.theideacatalystbackend.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Posting postContent(Posting posting) {
        postRepository.save(posting);
        return posting;
    }

    @Override
    public void deletePost(String postId) {
        Posting user = postRepository.findByPostId(postId);
        postRepository.delete(user);
    }
}
