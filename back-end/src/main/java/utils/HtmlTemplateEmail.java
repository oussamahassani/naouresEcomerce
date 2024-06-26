package utils;


public final class HtmlTemplateEmail {
  HtmlTemplateEmail() {

  }

  public static String AjouterClient(String message, String nomuser) {
    String modelHtml = "<div class='mailbox-read-message'>";
    modelHtml += "<p>Bonjour</p>";
    modelHtml += "<p>vous avez un nouvaux  email  de la part de cette personne  :" + nomuser + " </p>";
    modelHtml += "<p> "
        + message + "  </p>";
    modelHtml += "</div>";
     

    return modelHtml;
  }

  public static String changeStautsClient(String codeColis, String status) {
	    String modelHtml = "<div class='mailbox-read-message'>";
	    modelHtml += "<p>Bonjour</p>";
	    modelHtml += "<p> votre colis de reference   :" + codeColis + " a eté changeé et passe au statut "+status+" </p>";
	   
	    modelHtml += "</div>";

	    return modelHtml;
	  }

}