package com.example.betwixbackend.controller;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import utils.Utils;

import com.example.betwixbackend.entity.Order;
import com.example.betwixbackend.dto.SaveInitpaymentData;
import com.example.betwixbackend.entity.ClickToPay;
import com.example.betwixbackend.entity.User;
import com.example.betwixbackend.handlers.ErrorResponse;
import com.example.betwixbackend.handlers.ErrorResponseKonnectApi;
import com.example.betwixbackend.handlers.ErrorResponseKonnectErrorApi;
import com.example.betwixbackend.repository.*;
import com.example.betwixbackend.service.SequenceService;
import jakarta.servlet.http.HttpServletRequest;




@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")

@RequestMapping(value = "/payment")
public class ClickToPayController<saveInitpaymentDataDTO> {
  @Value("${returnAdresse}")
  private String returnAdresse;

  @Value("${click.to.pay.login}")
  private String clickToPayLogin;

  @Value("${click.to.pay.password}")
  private String clickToPayPassword;

  // private static SessionFactory sessionFactory;
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ClickToPayRepository clickToPayRepository;

  
  @Autowired
  private OrderRepository orderRepository;

  @Autowired
  private SequenceService sequenceService;

  private final Logger LOGGER = LogManager.getLogger(this.getClass());
  private static final String PAYTABS_FEEDBACK_URL = "/checkout";
  private static final String RETURN_URL = "/feedback";
  
	@GetMapping
	public ResponseEntity<String> findAll() {
		
		return ResponseEntity.ok().body("hy");
	}
  @PostMapping(PAYTABS_FEEDBACK_URL)
  public  Map<String, Object> ClickToPayPayment(
		  @RequestBody Map<String, String> body ,HttpServletRequest httpRequest) {
    // Map<String, Object> response = new HashMap<>();
    StringBuilder response = new StringBuilder();
    Map<String, Object> returnResponse = new HashMap<>();
    String montantBd = body.get("montant");
    String refBordereau = body.get("reforder");
    String currency = "788";
    // Implement logic to get merchant details and transaction values

    String localHost;

    localHost = httpRequest.getServerName();
    // Get the host name

    // Print the host name
    LOGGER.info("Host Name: " + localHost);

    long orderNumberQuery = sequenceService.getNextSequence("sequance_order");
    Date date = new Date();
    SimpleDateFormat df = new SimpleDateFormat("yyyy");
    String year = df.format(date);
    String format = "%1$07d";
    String result = String.format(format, orderNumberQuery) + "-" + year;
    // Execute the query


  //  String montant = Utils.formatDoubleInputToString(montantBd).replace(".", "");
    Map<String, Object> ClickToPayTxValues = new HashMap<>();
    ClickToPayTxValues.put("userName", clickToPayLogin);
    ClickToPayTxValues.put("password", clickToPayPassword);
    ClickToPayTxValues.put("returnUrl", returnAdresse + "/checkout");
    ClickToPayTxValues.put("orderNumber", result);
    ClickToPayTxValues.put("currency", currency);
    ClickToPayTxValues.put("amount", montantBd);
    ClickToPayTxValues.put("failUrl", returnAdresse + "/failed");

    String payPageUrl = "https://test.clictopay.com/payment/rest/register.do"; // Replace with your
    // actual code to get
    // the URL
    String apiUrl = payPageUrl + "?";
    for (Map.Entry<String, Object> entry : ClickToPayTxValues.entrySet()) {
      apiUrl += entry.getKey() + "=" + entry.getValue() + "&";
    }
    try {
      // Create a URL object
      URL url = new URL(apiUrl);

      // Open a connection to the URL
      HttpURLConnection connection = (HttpURLConnection) url.openConnection();

      // Set the request method to POST
      connection.setRequestMethod("POST");

      // Enable input and output streams
      connection.setDoOutput(true);

      // Write the POST data to the connection's output stream
      OutputStream os = connection.getOutputStream();
      os.write(apiUrl.getBytes());
      os.flush();
      os.close();

      // Get the response from the server
      int responseCode = connection.getResponseCode();
      if (responseCode == HttpURLConnection.HTTP_OK) {
        // Read the response data
        BufferedReader reader =
            new BufferedReader(new InputStreamReader(connection.getInputStream()));

        String line;
        while ((line = reader.readLine()) != null) {
          response.append(line);
        }
        reader.close();

        // Parse the response as needed (e.g., JSON parsing)
        String responseText = response.toString();
        // Use responseText as needed

        // Log the response
        LOGGER.info("ClickToPay Response: " + responseText);
        // Redirect to formUrl
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(responseText.toString());
        ClickToPay newClickToPay = new ClickToPay();
        newClickToPay.setClickToPayOrder(refBordereau);
        newClickToPay.setOrderNumber(result);
        if (rootNode.has("orderId")) {
          newClickToPay.setOrderId(rootNode.get("orderId").asText());
        }
        if (rootNode.has("errorMessage")) {
          newClickToPay.setErrorMessage(rootNode.get("errorMessage").asText());
        }
        clickToPayRepository.save(newClickToPay);
        if (rootNode.has("formUrl")) {
          // Extract the formUrl field from JSON
          String formUrl = rootNode.get("formUrl").asText();
          returnResponse.put("formUrl", formUrl);
          returnResponse.put("success", true);
         
        } else {
          String originalUrl = httpRequest.getHeader("referer");
          if (originalUrl != null) {
    
            returnResponse.put("originalUrl", originalUrl);
            returnResponse.put("success", true);
          }
        }

      } else {
        // Handle the error response
        String originalUrl = httpRequest.getHeader("referer");
        if (originalUrl != null) {
        
          returnResponse.put("originalUrl", originalUrl);
          returnResponse.put("success", true);
        }
        LOGGER.info("HTTP Error: " + responseCode);
        returnResponse.put("error", originalUrl);
        returnResponse.put("success", false);
      
      }

      // Disconnect the connection
      connection.disconnect();
    } catch (Exception e) {
      // Handle exceptions
      LOGGER.info("error payement en ligne", e);
      e.printStackTrace();
    
      returnResponse.put("error", e.getMessage());
      returnResponse.put("success", false);
      // String formUrl = "ffff";
      // httpResponse.sendRedirect(formUrl);
    }

     return returnResponse;
  }

  @GetMapping(RETURN_URL + "/{orderId}")
  public String ClickToPayFeedback(
		  @PathVariable(value = "orderId", required = false) String orderId,
      RedirectAttributes redirectAttributes) {

    String orderStatusUrl = "https://test.clictopay.com/payment/rest/getOrderStatus.do";
    String responseText = "";
    try {
      // Construct the URL with query parameters
      String userName = clickToPayLogin; // "0402392401";
      String password = clickToPayPassword; // "7VRJpvM5";

      String apiUrl = orderStatusUrl + "?userName=" + userName + "&password=" + password
          + "&orderId=" + orderId;

      // Create a URL object
      URL url = new URL(apiUrl);

      // Open a connection to the URL
      HttpURLConnection connection = (HttpURLConnection) url.openConnection();

      // Set the request method to GET
      connection.setRequestMethod("GET");

      // Get the response from the server
      int responseCode = connection.getResponseCode();
      if (responseCode == HttpURLConnection.HTTP_OK) {
        // Read the response data
        BufferedReader reader =
            new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
          response.append(line);
        }
        reader.close();

        // Parse the response as needed (e.g., JSON parsing)
         responseText = response.toString();
        // Use responseText as needed
        ClickToPay exitClickToPay = clickToPayRepository.findOderByOrderId(orderId);
        if (exitClickToPay != null) {
          exitClickToPay.setIsPassed(true);
          ObjectMapper objectMapper = new ObjectMapper();
          JsonNode rootNode = objectMapper.readTree(responseText);

          if (rootNode.has("approvalCode")) {
            exitClickToPay.setApprovalCode(rootNode.get("approvalCode").asText());
          }
          if (rootNode.has("ErrorCode")) {
            exitClickToPay.setErrorCode(rootNode.get("ErrorCode").asText());
          }
          if (rootNode.has("ErrorMessage")) {
            exitClickToPay.setErrorMessage(rootNode.get("ErrorMessage").asText());
          }
          clickToPayRepository.save(exitClickToPay);
          Order existBrd =
              orderRepository.findOrderByClickToPayOrder(exitClickToPay.getClickToPayOrder());
          if (existBrd != null) {
         //   User user = userRepository.findTop1UsersByTypeuser("SYSTEM");
            
            existBrd.setDateVersement(new Date());
            existBrd.setTypeDePayement("payementparcarte");
            orderRepository.save(existBrd);
          }
        }

        // Log the response
        System.out.println("Response: " + responseText);
      } else {
        // Handle the error response
        System.err.println("HTTP Error: " + responseCode);
      }

      // Disconnect the connection
      connection.disconnect();
    } catch (Exception e) {
      // Handle exceptions
      e.printStackTrace();
    }

    return responseText;
  }

  @RequestMapping("failed")
  public String ClickToPayFailed(Model model,
      @RequestParam(value = "orderId", required = false) String orderId) {
    // Implement logic for failed payments
    LOGGER.info("failed to payement");

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    String currentUser = authentication.getName();
    User user = userRepository.findUsersByEmail(currentUser);
    model.addAttribute("userfullname", user.getLastName() + " " + user.getFirstName());
    model.addAttribute("useremail", user.getEmail());
    String orderStatusUrl = "https://test.ClickToPay.com/payment/rest/getOrderStatus.do";

    try {
      // Construct the URL with query parameters
      String userName = clickToPayLogin; // "0402392401";
      String password = clickToPayPassword; // "7VRJpvM5";

      String apiUrl = orderStatusUrl + "?userName=" + userName + "&password=" + password
          + "&orderId=" + orderId;

      // Create a URL object
      URL url = new URL(apiUrl);

      // Open a connection to the URL
      HttpURLConnection connection = (HttpURLConnection) url.openConnection();

      // Set the request method to GET
      connection.setRequestMethod("GET");

      // Get the response from the server
      int responseCode = connection.getResponseCode();
      if (responseCode == HttpURLConnection.HTTP_OK) {
        // Read the response data
        BufferedReader reader =
            new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
          response.append(line);
        }
        reader.close();

        // Parse the response as needed (e.g., JSON parsing)
        String responseText = response.toString();
        // Use responseText as needed
        ClickToPay exitClickToPay = clickToPayRepository.findOderByOrderId(orderId);
        if (exitClickToPay != null) {
          exitClickToPay.setIsPassed(false);
          ObjectMapper objectMapper = new ObjectMapper();
          JsonNode rootNode = objectMapper.readTree(responseText);

          if (rootNode.has("ErrorCode")) {
            exitClickToPay.setErrorCode(rootNode.get("ErrorCode").asText());
          }
          if (rootNode.has("ErrorMessage")) {
            exitClickToPay.setErrorMessage(rootNode.get("ErrorMessage").asText());
          }
          clickToPayRepository.save(exitClickToPay);

        }

        // Log the response
        System.out.println("Response: " + responseText);
      } else {
        // Handle the error response
        System.err.println("HTTP Error: " + responseCode);
      }

      // Disconnect the connection
      connection.disconnect();
    } catch (Exception e) {
      // Handle exceptions
      e.printStackTrace();
    }
    return "bordereaux/statusPayementError";
  }

  @GetMapping(value = "statusPayement")
  public String statusPayement(Model model, HttpServletRequest request) {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    String currentUser = authentication.getName();
    User user = userRepository.findUsersByEmail(currentUser);
    model.addAttribute("userfullname", user.getLastName() + " " + user.getFirstName());;
    model.addAttribute("useremail", user.getEmail());

    return "bordereaux/statusPayementSuccess";
  }

  @RequestMapping("/returnToOrder")
  public Order returnToBordereau(
      @RequestParam(value = "orderId", required = false) String orderId) {

    ClickToPay exitClickToPay = clickToPayRepository.findOderByOrderId(orderId);
    Order existOrder =
        orderRepository.findOrderByClickToPayOrder(exitClickToPay.getClickToPayOrder());
    if (existOrder != null) {
    return existOrder;
    } else {
    return  null ;
    }
   
  }
  @RequestMapping("/allPayement")
  public List<ClickToPay>  allPayement(
      @RequestParam(value = "orderId", required = false) String orderId) {

    List<ClickToPay> exitClickToPay = clickToPayRepository.findAll();
  
    if (exitClickToPay.size() >0 ) {
    return exitClickToPay;
    } else {
    return  null ;
    }
   
  }
  
 

  @PostMapping("/concatPayement")
  public Map<String, Object> initPayment(@RequestBody Map<String, Object> paymentData) throws IOException {
      try {
    	   String apiUrl = "https://api.preprod.konnect.network/api/v2/"; // or "https://api.konnect.network/api/v2" for production

          URL url = new URL(apiUrl + "payments/init-payment");
          HttpURLConnection conn = (HttpURLConnection) url.openConnection();
          conn.setRequestMethod("POST");
          conn.setRequestProperty("x-api-key", "64ff797847bb62fc99b7e3fe:9BfIuEhwty1L33bCJ7t"); // Replace with your API key
          conn.setRequestProperty("Content-Type", "application/json");
          conn.setDoOutput(true);

          ObjectMapper objectMapper = new ObjectMapper();
          String jsonBody = objectMapper.writeValueAsString(paymentData);
          conn.getOutputStream().write(jsonBody.getBytes());

          if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
              ObjectMapper responseMapper = new ObjectMapper();
              Map<String, Object> responseData = responseMapper.readValue(conn.getInputStream(), Map.class);
              return responseData;
          } 
          else if (conn.getResponseCode() == 422) {
        	 ObjectMapper mapper = new ObjectMapper();
        	  Object errorResponse = mapper.readValue(conn.getErrorStream(), ErrorResponseKonnectApi.class);
              Map<String, Object> ResultErreur = new HashMap<>();
              ResultErreur.put("code", 422);
              ResultErreur.put("message",errorResponse );
              return ResultErreur ;
          }
          else   if (conn.getResponseCode() == 404) {
        
         	 ObjectMapper mapper = new ObjectMapper();
             Map<String, Object> ResultErreur = new HashMap<>();

        	  Object errorResponse = mapper.readValue(conn.getErrorStream(), ErrorResponseKonnectErrorApi.class);
        	  ResultErreur.put("code", 404);
        	     ResultErreur.put("message",errorResponse );
                 return ResultErreur ;
          }
          else {
              throw new RuntimeException("Failed to initialize payment. HTTP error code: " + conn.getResponseCode());

          }
      } catch (IOException e) {
          throw e;
      }
  }
  @PostMapping("/saveInitPayement")
  public ResponseEntity<?> saveInitPayement(@RequestBody SaveInitpaymentData paymentData)  {
	  ClickToPay newClickToPay = new ClickToPay();
	  newClickToPay.setApprovalCode(paymentData.getClickToPayOrder());
	  newClickToPay.setOrderId(paymentData.getClickToPayOrder());
	  newClickToPay.setIdUser(paymentData.getIdUser());
	  newClickToPay.setMontantPayement(paymentData.getMontantPayement());
	  clickToPayRepository.save(newClickToPay);
	  return new ResponseEntity<>(newClickToPay, HttpStatus.CREATED);
  }
  @PostMapping("/getMontantByreference")
  public ResponseEntity<?> getMontantByreference(@RequestBody SaveInitpaymentData paymentData)  {
	  ClickToPay myclickToPay = clickToPayRepository.findOderByOrderId(paymentData.getClickToPayOrder());
	  return new ResponseEntity<>(myclickToPay, HttpStatus.CREATED);
  }
  @GetMapping("/getOrderByUser/{id}")
  public ResponseEntity<?> getOrderByUser(@PathVariable String id)  {
	  List<ClickToPay>  myclickToPay = clickToPayRepository.findOderByIdUser(id);
	  return new ResponseEntity<>(myclickToPay, HttpStatus.CREATED);
  }
  @PostMapping("/updteMontantUserAcount")
  public ResponseEntity<?> updteMontantUserAcount(@RequestBody SaveInitpaymentData paymentData)  {
	  Optional<User> userToUpdate = userRepository.findById(paymentData.getIdUser());
	  if(userToUpdate.isPresent()) {
		  ClickToPay myclickToPay = clickToPayRepository.findOderByOrderId(paymentData.getClickToPayOrder());
		  myclickToPay.setErrorCode("200");
		  myclickToPay.setErrorMessage("success");
		  clickToPayRepository.save(myclickToPay);
		  Long newSoled = Long.parseLong(userToUpdate.get().getSold()) + Long.parseLong(paymentData.getMontantPayement());
		  userToUpdate.get().setSold(newSoled.toString());
		  userRepository.save(userToUpdate.get());
	  }
	  return new ResponseEntity<>(userToUpdate.get(), HttpStatus.CREATED);
  }
   
}

