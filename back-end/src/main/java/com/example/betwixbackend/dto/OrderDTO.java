package com.example.betwixbackend.dto;

import java.sql.Array;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {
    @NotNull(message = "client must not be null")
    @NotBlank(message = "client must not be null")
    private String client;

    @NotNull(message = "item must not be null")
    @NotBlank(message = "item must not be null")
    private  List<OrderItemDTO> items;;

    private String typeDePayement;


}
