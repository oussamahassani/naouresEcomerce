package com.example.betwixbackend.entity;

import com.example.betwixbackend.enums.Genre;
import com.example.betwixbackend.enums.RoleEnum;
import lombok.*;
import lombok.experimental.SuperBuilder;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.annotation.Collation;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Document
@Collation("users")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@SuperBuilder
public class User implements UserDetails  {

    @Id
    private String id;

    private String firstName;
    private String lastName;
    private String genre;
    private String tel;
    private String brithday;
    private String email;
    private String password;
    private String imgUrl;
    private Boolean enabled;
    private String sold = "0" ;
    //private Role role;

    @CreatedDate
    private Date createdDate;
    
    private RoleEnum role ;



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return List.of(new SimpleGrantedAuthority(role.name()));
    }
    @Override
    public String getPassword() {

        return password;
    }


    @Override
    public String getUsername() {

        return email;
    }

    @Override

    public boolean isAccountNonExpired() {

        return true;
    }

    @Override
    public boolean isAccountNonLocked() {

        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }

  @Override
    public boolean isEnabled() {


        return enabled;
    }

}
