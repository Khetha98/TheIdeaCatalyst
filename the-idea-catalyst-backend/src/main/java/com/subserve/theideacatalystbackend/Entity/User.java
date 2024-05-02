package com.subserve.theideacatalystbackend.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "username")
    private String name;

    @Column(name = "surname")
    private String Surname;

    @Column(name = "password")
    private String Password;

    @Column(name = "street")
    private String Street;

    @Column(name = "city")
    private String City;

    @Column(name = "state_or_province")
    private String State;

    @Column(name = "country")
    private String Country;

    @Column(name = "zipcode")
    private String ZipCode;
}
