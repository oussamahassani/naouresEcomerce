package com.example.betwixbackend.validation;

import com.example.betwixbackend.dto.AuthRequest;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class AuthRequestValidation {
    public static List<String>  validate(AuthRequest dto)
    {
        List<String> errors = new ArrayList<>() ;
        if(dto == null)
        {
            errors.add("Email est obligatoire ");
            errors.add("Mot de passe est obligatoire");
        } else {
            if(!StringUtils.hasLength(dto.getEmail()))
            {
                errors.add("Email est obligatoire ");
            }
            if(!StringUtils.hasLength(dto.getPassword()))
            {
                errors.add("Mot de passe est obligatoire ");
            }
        }
        return errors;


    }
}