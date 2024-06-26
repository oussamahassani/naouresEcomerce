package com.example.betwixbackend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.annotation.Collation;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;


@Document
@Collation("pack")

@Getter
@Setter
public class Roulette {

	private String fillStyle;
	    private String text;
	
	    private int id;
	    private String textFillStyle;
	    private String textFontSize;
	    @Id
	    private String indexRoulette ;
		public Roulette(String fillStyle, String text, int id, String textFillStyle, String textFontSize) {
			super();
			this.fillStyle = fillStyle;
			this.text = text;
			this.id = id;
			
			this.textFillStyle = textFillStyle;
			this.textFontSize = textFontSize;
			this.indexRoulette = indexRoulette;
		}
		public Roulette() {
			super();
			// TODO Auto-generated constructor stub
		}

		
		 
		 
}
