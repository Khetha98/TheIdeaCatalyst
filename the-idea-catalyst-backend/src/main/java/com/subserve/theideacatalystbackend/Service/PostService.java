package com.subserve.theideacatalystbackend.Service;

import com.subserve.theideacatalystbackend.Entity.Posting;

public interface PostService {

    Posting postContent(Posting posting);

    void deletePost(String postId);
}
