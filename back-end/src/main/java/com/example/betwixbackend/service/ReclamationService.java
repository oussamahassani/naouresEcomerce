package com.example.betwixbackend.service;

import com.example.betwixbackend.entity.Reclamation;
import com.example.betwixbackend.repository.ReclamationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReclamationService {
    @Autowired
    private ReclamationRepository reclamationRepository;

    public List<Reclamation> findAll() {
        return reclamationRepository.findAll();
    }

    public Optional<Reclamation> findById(String id) {
        return reclamationRepository.findById(id);
    }

    public Reclamation save(Reclamation reclamation) {
      /*  reclamation.setDateModification(LocalDateTime.now());
        if (reclamation.getDateCreation() == null) {
            reclamation.setDateCreation(LocalDateTime.now());
        }*/
        return reclamationRepository.save(reclamation);
    }

    public void deleteById(String id) {
        reclamationRepository.deleteById(id);
    }

	public List<Reclamation>  findByIdUser(String id) {
		// TODO Auto-generated method stub
		return reclamationRepository.findByIdUser(id);
	}
}
