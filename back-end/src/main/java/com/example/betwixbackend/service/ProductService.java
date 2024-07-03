package com.example.betwixbackend.service;

import java.util.List;
import com.example.betwixbackend.entity.UserPayement;
import java.util.Objects;
import java.util.Optional;

import jdk.jfr.Description;
import org.bson.types.ObjectId;
import org.springframework.dao.EmptyResultDataAccessException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.betwixbackend.dto.NewPayementProductDto;
import com.example.betwixbackend.dto.ProductDTO;
import com.example.betwixbackend.dto.ProductUpdatePayementDto;
import com.example.betwixbackend.entity.Product;
import com.example.betwixbackend.entity.User;
import com.example.betwixbackend.repository.CategoryRepository;
import com.example.betwixbackend.repository.NotificationRepository;
import com.example.betwixbackend.repository.ProductRepository;
import com.example.betwixbackend.repository.UserPayementRepository;
import com.example.betwixbackend.repository.UserRepository;

import utils.Utils;

import com.example.betwixbackend.entity.Category;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import com.example.betwixbackend.entity.Notification;

@Service
public class ProductService {
    private static final Logger logger = LogManager.getLogger(ProductService.class);

    @Autowired
    private NotificationRepository notificationRepository;
    
    @Value("${pathProduit}")
    private String pathProduit;

    @Autowired
    private ProductRepository repository;

    @Autowired
	MailSendService mailSendService;
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    UserPayementRepository userPayementRepository;
    public List<Product> findAll() {
        return repository.findAll();
    }

    public Product findById(String id) {
        Optional<Product> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ResourceNotFoundException("None entity with id: " + id + " was found!"));
    }


    @Transactional
    public Product createProduct(String nameProduct, String category, String desc, Double price, MultipartFile photo) {
        try {
            Optional<Category> optionalCategory = categoryRepository.findById(category);
            System.out.println(optionalCategory);
            if (optionalCategory.isPresent()) {
                Category ProductCategory = optionalCategory.get();
                Product newproduct = new Product();
                newproduct.setCategory(new ObjectId(ProductCategory.getId()));
                newproduct.setDescription(desc);
                newproduct.setName(nameProduct);
                newproduct.setPrice(price);
                if (!photo.isEmpty()) {
                    Utils.saveImage(photo, pathProduit, "");
                    newproduct.setImgUrl(Utils.noSpecialCharacters(Objects.requireNonNull(photo.getOriginalFilename())));
                }
                repository.save(newproduct);
                return newproduct;
            } else {
                throw new IllegalArgumentException("Category with id " + category + " does not exist.");
            }

        } catch (Exception e) {
            logger.error("Error Creating Product : " + e.getMessage());
            throw new RuntimeException("Error Creating Product", e);
        }
    }


    public void deleteProductById(String id) throws Exception {
        if (repository.existsById(id)) {
            // If the product exists, delete it
            repository.deleteById(id);
        } else {
            // If the product does not exist, throw an exception or handle the error accordingly
            throw new Exception("Product with ID " + id + " not found");
        }
    }

    public Product UpdateProduit(Product produit) {
        // TODO Auto-generated method stub
        return repository.save(produit);
    }

	public UserPayement addNewPayementProduit(NewPayementProductDto newPayement) {
		// TODO Auto-generated method stub
		Product myproduct = this.findById(newPayement.getProduit());
		if(myproduct != null) {
			Optional<User> userPayement = userRepository.findById(newPayement.getUserId());
			if(userPayement.get() != null) {
			UserPayement newpayement = new UserPayement();
			newpayement.setFirstName(userPayement.get().getFirstName());
			newpayement.setGenre(userPayement.get().getGenre());
			newpayement.setLastName(userPayement.get().getLastName());
			newpayement.setPayement(newPayement.getPrice());
			newpayement.setTel(userPayement.get().getTel());
			newpayement.setUserid(userPayement.get().getId());
			newpayement.setProductId(myproduct);
			userPayementRepository.save(newpayement);
			myproduct.setPrice(myproduct.getPrice() -  Double.parseDouble(newPayement.getPrice()));
			repository.save(myproduct);
			  Long newSoled = Long.parseLong(userPayement.get().getSold()) - Long.parseLong(newPayement.getPrice());

			userPayement.get().setSold(newSoled.toString());
			userRepository.save(userPayement.get());
			if(myproduct.getPrice() >= 0) {
				List<User> UserSupperAdmin = userRepository.findAllByRole("ROLE_SUPERADMIN");
			    for (User user : UserSupperAdmin) {
				Notification newNotification = new Notification();
				newNotification.setRecipient(user.getId());
				newNotification.setSender("System");;
				newNotification.setMessage("le produit de reference " + myproduct.getId() + " est totalement Payee" );
				notificationRepository.save(newNotification);
			}
			}
			return newpayement ;
			}
		}
		return null;
	}

	public List<UserPayement> getPayementProduit(String id) {
		// TODO Auto-generated method stub
		return userPayementRepository.findByUserid(id);
	}

	public List<Product> findAllProductsPayed() {
		// TODO Auto-generated method stub
		return repository.findByPriceGreaterThanEqual(0);
	}

	public List<UserPayement> getPayementProduitByIdProduct(String id) {
		// TODO Auto-generated method stub
		return userPayementRepository.findByProductId_id(id);
	}

	public Product UpdateProduitPayement(ProductUpdatePayementDto produit) {
		// TODO Auto-generated method stub
		Product myproduct = this.findById(produit.getIdProduct());
		if(myproduct != null) {
			Optional<User> userPayement = userRepository.findById(produit.getUserId());
			if(userPayement.get() != null) {
			var resultemail =  mailSendService.sendMsg(userPayement.get().getEmail() ,"vous avez gagner  le produit de reference "+myproduct.getId() + " titre de produit " + myproduct.getName() ,userPayement.get().getFirstName() )	;
			myproduct.setIdUser(produit.getUserId());
			myproduct.setIsDone(true);
			repository.save(myproduct);
			}
		}
		return myproduct;
	}


}
