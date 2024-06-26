package com.example.betwixbackend.service;
import java.util.List;
import java.util.Set;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import utils.HtmlTemplateEmail;

@Service
public class MailSendService {
private static final Logger logger = LogManager.getLogger(MailSendService.class);


@Value("${spring.mail.username}")
private String sender;

@Autowired
private JavaMailSender mailSender;



public String sendContactMsg(ContactMsg contactMsg) {

try {
  String Template = HtmlTemplateEmail.AjouterClient("http://localhost:3000", "admin");
  String Resultat =
      sendSimpleMailHtml(contactMsg.getEmail(), Template, "demande de rejoindre news");
return Resultat;
} catch (Exception e) {
  // TODO Auto-generated catch block
	
  e.printStackTrace();
  return "Error while Sending Mail";
}

}

public String sendMsg(String emailTo, String sendMsg , String ObjectEmail) {

    try {

      String Resultat =
          sendSimpleMailHtml(emailTo, sendMsg, ObjectEmail);
    return Resultat;
    } catch (Exception e) {
      // TODO Auto-generated catch block
    	
      e.printStackTrace();
      return "Error while Sending Mail";
    }

  }
public String sendSimpleMailHtml(String recipient, String template, String subject) {
// Try block to check for exceptions
try {
    SimpleMailMessage mailMessage = new SimpleMailMessage();

    jakarta.mail.internet.MimeMessage message = mailSender.createMimeMessage();

  message.setSubject(subject);
  MimeMessageHelper helper;
  helper = new MimeMessageHelper(message, true);
  helper.setFrom(sender);
  helper.setTo(recipient);
  helper.setText(template, true);
  logger.info("message" + message);
  // Sending the mail
  mailSender.send(message);
  return "Mail Sent Successfully";
}

// Catch block to handle the exceptions
catch (Exception e) {
  logger.info("status" + e);
  return "Error while Sending Mail";
}
}
}