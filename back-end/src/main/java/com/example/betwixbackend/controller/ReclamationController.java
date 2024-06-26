package com.example.betwixbackend.controller;

import com.example.betwixbackend.entity.Reclamation;
import com.example.betwixbackend.service.ReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/reclamations")
public class ReclamationController {
    @Autowired
    private ReclamationService reclamationService;

    @GetMapping
    public List<Reclamation> getAllReclamations() {
        return reclamationService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reclamation> getReclamationById(@PathVariable String id) {
        return reclamationService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("byUser/{id}")
    public List<Reclamation>  getReclamationByUserId(@PathVariable String id) {
        return reclamationService.findByIdUser(id) ;
               
    }

    @PostMapping("/add")
    public Reclamation createReclamation(@RequestBody Reclamation reclamation) {
        return reclamationService.save(reclamation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reclamation> updateReclamation(@PathVariable String id, @RequestBody Reclamation reclamation) {
        return reclamationService.findById(id)
                .map(existingReclamation -> {
                    //reclamation.setId(existingReclamation.getId());
                    return ResponseEntity.ok(reclamationService.save(reclamation));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReclamation(@PathVariable String id) {
        if (reclamationService.findById(id).isPresent()) {
            reclamationService.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
