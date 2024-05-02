package com.subserve.theideacatalystbackend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Blob;

@Entity
@Table(name = "post_content")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Posting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private String postId;

    @Column(name = "post_data")
    @Lob
    private Blob postData;

    @Column(name = "time_posted")
    private String timePosted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

}
