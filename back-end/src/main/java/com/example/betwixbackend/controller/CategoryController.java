package com.example.betwixbackend.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.betwixbackend.dto.CategoryDTO;
import com.example.betwixbackend.dto.ProductDTO;
import com.example.betwixbackend.entity.Category;
import com.example.betwixbackend.entity.Product;
import com.example.betwixbackend.service.CategoryService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "/categories")

public class CategoryController {

    @Autowired
    private CategoryService service;

    @GetMapping
    public ResponseEntity<List<Category>> findAll() {
        List<Category> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Category> findById(@PathVariable String id){
        Category obj = service.findById(id);
        return ResponseEntity.ok().body(obj);
    }


    @GetMapping(value = "/{id}/products")
    public ResponseEntity<List<Product>> findProductsById(@PathVariable String id){
        List<Product> obj = service.findByCategory(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping(path="/create-category", consumes = MediaType.ALL_VALUE)
    public ResponseEntity<Category> createCategory(@RequestParam(required = false) String name ,@RequestParam MultipartFile imageCategorie) {
        System.out.println(imageCategorie.getOriginalFilename());
        Category createdCategory = service.createCategory(name, imageCategorie);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }



    @PatchMapping
    public ResponseEntity<Category> UpdateCategory(@RequestBody Category category) {
        Category updateCategory = service.UpdateCategory(category);
        return new ResponseEntity<>(updateCategory, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") String id) {
        try {
            service.deleteCategoryById(id);
            return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete product", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
