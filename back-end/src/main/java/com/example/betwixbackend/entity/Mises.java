package com.example.betwixbackend.entity;

import jakarta.websocket.Decoder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.annotation.Collation;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.http.MediaType;

@Document
@Collation("products")
@NoArgsConstructor
@Getter
@Setter
public class Mises {
    @Id
    private String id;

    private String name;
    private Float price;
    private Binary media;


}
