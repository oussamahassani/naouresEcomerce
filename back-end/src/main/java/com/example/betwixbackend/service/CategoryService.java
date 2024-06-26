package com.example.betwixbackend.service;


import java.util.List;
import java.util.Optional;


import com.example.betwixbackend.entity.Pack;
import com.example.betwixbackend.repository.ProductRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.betwixbackend.dto.CategoryDTO;
import com.example.betwixbackend.entity.Category;
import com.example.betwixbackend.entity.Product;
import com.example.betwixbackend.repository.CategoryRepository;
import org.springframework.web.multipart.MultipartFile;
import utils.Utils;

@Service
public class CategoryService {

    private static final Logger logger = LogManager.getLogger(CategoryService.class);

    @Autowired
    private CategoryRepository repository;

    @Autowired
    private ProductRepository productRepository;

    @Value("${pathCategorie}")
    private String pathCategorie;

    public List<Category> findAll() {
        return repository.findAll();
    }

    public Category findById(String id) {
        Optional<Category> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ResourceNotFoundException("None entity with id: " + id + " was found!"));
    }

    public List<Product> findByCategory(String id) {
        ObjectId catId = new ObjectId(id);
        return productRepository.findByCategory(catId);
    }

    /*public Category createCategory(CategoryDTO category) {
        // TODO Auto-generated method stub
        Category newCategry = new Category();
        newCategry.setName(category.getName());
        return  repository.save(newCategry);
    }*/
    public Category createCategory(String name, MultipartFile imageCategorie) {
        // TODO Auto-generated method stub
        Category newCategry = new Category();

        if (!imageCategorie.isEmpty()) {
            try {
                // Enregistrer l'image (implémentez la logique d'enregistrement)
                Utils.saveImage(imageCategorie, pathCategorie,
                        "");
                newCategry.setImage(
                        Utils.noSpecialCharacters(imageCategorie.getOriginalFilename()));
            } catch (Exception e) {
                logger.error("Erreur lors de l'enregistrement de l'image : " + e.getMessage());

            }
        }
        newCategry.setName(name);
        repository.save(newCategry);
        return newCategry;
    }

    public Category UpdateCategory(Category category) {
        // TODO Auto-generated method stub

        return repository.save(category);
    }

    public void deleteCategoryById(String id) throws Exception {
        // TODO Auto-generated method stub
        if (repository.existsById(id)) {
            // If the product exists, delete it
            repository.deleteById(id);
        } else {
            // If the product does not exist, throw an exception or handle the error accordingly
            throw new Exception("Category with ID " + id + " not found");
        }
    }
}
