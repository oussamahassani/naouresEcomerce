package com.example.betwixbackend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfiguration extends WebMvcAutoConfiguration implements WebMvcConfigurer  {
  @Value("${pathProduit}")
  private String pathProduit;

  @Value("${pathPack}")
  private String pathPack;

  @Value("${pathCategorie}")
  private String pathCategorie;

  @Value("${pathUser}")
  private String pathUser;
  private static final String FILE = "file:"; // Compliant

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("imageProduit/**").addResourceLocations(FILE + pathProduit);
    registry.addResourceHandler("imagePack/**").addResourceLocations(FILE + pathPack);
    registry.addResourceHandler("imageCategorie/**").addResourceLocations(FILE + pathCategorie);


    registry.addResourceHandler("imageUser/**").addResourceLocations(FILE +pathUser);
  }
}
