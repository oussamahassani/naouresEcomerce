package utils;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.List;
import java.util.Locale;

import org.springframework.web.multipart.MultipartFile;

import com.example.betwixbackend.entity.Roulette;
import java.util.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.File;


public class Utils {

	
	  public static String formatDoubleInputToString(String input) {
	        // Define the pattern for formatting the double value
		  DecimalFormat formatter = new DecimalFormat("#0.000");
		    DecimalFormatSymbols dfs = new DecimalFormatSymbols(Locale.FRANCE);
		    dfs.setDecimalSeparator('.');
		    formatter.setDecimalFormatSymbols(dfs);
		    dfs.setDecimalSeparator('.');
		    formatter.setDecimalFormatSymbols(dfs);
		    String formatted = formatter.format(input);

		    return formatted;

}
	  
		 public static List<Roulette> generatePrizes(int count) {
		        List<Roulette> prizes = new ArrayList<>();
		        String[] colors = {"red", "blue", "green", "yellow"}; // Couleurs disponibles
		        String[] game = {"xyz", "100 dt", "zzz", "10 dt"}; 
		        for (int value = 1; value <= count; value++) {
		            String fillStyle = colors[value % 2];
		            String text = game[value % 2] + value;
		            String textFillStyle = "white";
		            String textFontSize = "16";

		            Roulette prize = new Roulette(fillStyle, text, value, textFillStyle, textFontSize);
		            prizes.add(prize);
		        }

		        return prizes;
		    }
		 
		 public static String saveImage(MultipartFile imageFile, String pathphoto,
										String caractaireDestingtion) throws Exception {

			    String folder = pathphoto  + "/";
			    File uploadDir = new File(folder);
			    if (!uploadDir.exists()) {
			      uploadDir.mkdirs();
			    }
			    byte[] bytes = imageFile.getBytes();
			    Path path = Paths.get(folder + caractaireDestingtion
			        + Utils.noSpecialCharacters(imageFile.getOriginalFilename()));
			    Files.write(path, bytes);
			 return folder;
		 }
		 
		  public static String noSpecialCharacters(String input) {
			    if (input.length() > 45) {
			      String extension = input.substring(input.lastIndexOf(".") + 1);
			      input = input.substring(0, 15).concat("." + extension);
			    }

			    return input.trim().replaceAll("[^A-Za-z0-9.]", "-");

			  }


}
