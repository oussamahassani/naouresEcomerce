package com.example.betwixbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.betwixbackend.entity.Roulette;
import com.example.betwixbackend.repository.RouletteRepository;

import utils.Utils;

import java.util.List;
import java.util.Optional;
import java.util.Random;



@Service
public class RouletteRandomService {
	@Autowired
	private SequenceService sequenceService;
	@Autowired
	RouletteRepository rouletteRepository;
//	List<Roulette>      //listeGame = Utils.generatePrizes(8);
	  public Roulette getRandom( int id){
		
		  Optional<Roulette> myroulette = rouletteRepository.findById(id);
		  
		  if(myroulette != null)
			  return myroulette.get();
		  else
			  return null ;
	    }
	  public List<Roulette> getALL(){
		     
	        return rouletteRepository.findAll();
	    }
	public void deleteRouletteById(int id) 
		// TODO Auto-generated method stub
		throws Exception {
			   if (rouletteRepository.existsById(id)) {
		            // If the product exists, delete it
				   rouletteRepository.deleteById(id);
		        } else {
		            // If the product does not exist, throw an exception or handle the error accordingly
		            throw new Exception("Product with ID " + id + " not found");
		        }	
	}
	public Roulette UpdateRoulette(Roulette roulette) {
		// TODO Auto-generated method stub
		return rouletteRepository.save(roulette);
	}
	public Roulette createRoulette(String fillStyle,String text, String textFillStyle, String textFontSize) {
		// TODO Auto-generated method stub
	    Long orderNumberQuery = sequenceService.getNextSequence("sequance_roulette");
	    int sequance = orderNumberQuery.intValue() ;
		Roulette roulette = new Roulette() ;
		roulette.setFillStyle(fillStyle);
		roulette.setText(text);
		roulette.setTextFillStyle(textFillStyle);
		roulette.setTextFontSize(textFontSize);
		roulette.setId(sequance);

		rouletteRepository.save(roulette);
		return roulette;
		
	}
}
