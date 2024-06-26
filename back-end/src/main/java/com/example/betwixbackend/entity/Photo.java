package com.example.betwixbackend.entity;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Getter
@Setter
@Document(collection = "photos")
public class Photo {
    @Id
    private String id;

    private String title;

    private Binary image;
}
