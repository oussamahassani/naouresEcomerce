package com.example.betwixbackend.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.betwixbackend.dto.NewPayementProductDto;
import com.example.betwixbackend.dto.ProductDTO;
import com.example.betwixbackend.dto.ProductUpdatePayementDto;
import com.example.betwixbackend.entity.Category;
import com.example.betwixbackend.entity.Product;
import com.example.betwixbackend.service.ProductService;
import org.springframework.http.MediaType;
import com.example.betwixbackend.entity.UserPayement;


@RestController
@RequestMapping(value = "/products")
public class ProductController {

	@Autowired
	private ProductService service;

	@GetMapping
	public ResponseEntity<List<Product>> findAll() {
		List<Product> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/productsPayed")
	public ResponseEntity<List<Product>> productsPayed() {
		List<Product> list = service.findAllProductsPayed();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Product> findById(@PathVariable String id){
		Product obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}


    @PostMapping( consumes = MediaType.ALL_VALUE)
    public ResponseEntity<Product> createProduct(@RequestParam(required = false)  String name ,
    		@RequestParam(required = false)  String category,  @RequestParam(required = false) String description , @RequestParam(required = false) Double price
           ,@RequestParam MultipartFile photoProduct) {
        Product createdProduct = service.createProduct(name,category, description ,price,photoProduct );
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }
    @PatchMapping
    public ResponseEntity<Product> UpdateCategory(@RequestBody Product produit) {
    	Product updateProduit = service.UpdateProduit(produit);
        return new ResponseEntity<>(updateProduit, HttpStatus.CREATED);
    }
    @PatchMapping(value = "/updatePayementProduct")
    public ResponseEntity<Product> updatePayementProduct(@RequestBody ProductUpdatePayementDto produit) {
    	Product updateProduit = service.UpdateProduitPayement(produit);
        return new ResponseEntity<>(updateProduit, HttpStatus.CREATED);
    }
    
    
    @PostMapping(value = "/addNewPayement")
    public ResponseEntity<?> addNewPayementProduct(@RequestBody NewPayementProductDto newPayement) {
    	UserPayement updateProduit = service.addNewPayementProduit(newPayement);
        return new ResponseEntity<>(updateProduit, HttpStatus.CREATED);
    }
    @GetMapping(value = "/getPayement/{id}")
    public ResponseEntity<?> getPayementProductByIdUser(@PathVariable("id") String id) {
    	List<UserPayement>  updateProduit = service.getPayementProduit(id);
        return new ResponseEntity<>(updateProduit, HttpStatus.CREATED);
    }
    @GetMapping(value = "/getPayementByProduct/{id}")
    public ResponseEntity<?> getPayementProductByIdProduct(@PathVariable("id") String id) {
    	List<UserPayement>  updateProduit = service.getPayementProduitByIdProduct(id);
        return new ResponseEntity<>(updateProduit, HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") String id) {
        try {
            // Call the service method to delete the product
        	service.deleteProductById(id);
            return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete product", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
