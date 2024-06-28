package com.example.betwixbackend.service;

import com.example.betwixbackend.auth.AuthService;
import com.example.betwixbackend.dto.CountByYearAndMonthDTO;
import com.example.betwixbackend.dto.UserResponse;
import com.example.betwixbackend.dto.UserUpdateStatusDto;
import com.example.betwixbackend.entity.Product;
import com.example.betwixbackend.entity.Reclamation;
import com.example.betwixbackend.entity.User;
import com.example.betwixbackend.entity.UserPayement;
import com.example.betwixbackend.enums.RoleEnum;
import com.example.betwixbackend.repository.CategoryRepository;
import com.example.betwixbackend.repository.ClickToPayRepository;
import com.example.betwixbackend.repository.ProductRepository;
import com.example.betwixbackend.repository.ReclamationRepository;
import com.example.betwixbackend.repository.UserRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import utils.Utils;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.HashMap;
import com.example.betwixbackend.repository.UserPayementRepository;
@Service
public class UserIService {
    @Autowired
    public UserRepository repository;
    private static final Logger logger = LogManager.getLogger(UserIService.class);
    @Autowired
    private CategoryRepository categoryrepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private ClickToPayRepository clickToPayRepository;
    @Autowired
    private ReclamationRepository reclamationRepository;
    
    @Autowired
     private AuthService authService;
    
    @Autowired
    private UserPayementRepository UserPayementRepository ;
    
    @Value("${pathUser}")
    private String pathUser;

    public User createUser(String firstName, String lastName, String genre, String tel, String brithday, String email, String password, boolean enabled, String role, MultipartFile imgUrl) {

        User user =  new User();
        if (!imgUrl.isEmpty()) {
            try {
                Utils.saveImage(imgUrl, pathUser,
                        "");
                user.setImgUrl( Utils.noSpecialCharacters(imgUrl.getOriginalFilename()));
            } catch (Exception e) {
                logger.error("user Exception: "
                        + e.getMessage());

            }
        }
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setGenre(genre);
        user.setTel(tel);
        user.setBrithday(brithday);
        user.setEmail(email);
        var encryptedPassword = authService.encryptedPassword(password);
        user.setPassword(encryptedPassword);
        user.setEnabled(enabled);
        if (role != null  && role.equals("Admin")){
            user.setRole(RoleEnum.ROLE_ADMIN);
        }else {
            user.setRole(RoleEnum.ROLE_CLIENT);
        }
        repository.save(user);
        return user;
    }


    public List<User> findAll() {
        return repository.findAllByRole(RoleEnum.ROLE_CLIENT.name().toString());
    }

    public User UpdateUser(User user) {
        // TODO Auto-generated method stub

        return repository.save(user);
    }

    public User UpdateStatusUser(UserUpdateStatusDto userUpdateStaus) {
        Optional<User> findUser = repository.findById(userUpdateStaus.getId());
        if(findUser.isPresent()){
            findUser.get().setEnabled(userUpdateStaus.getStatus());
            repository.save(findUser.get());
            return findUser.get() ;
        }
        else
            return null ;
    }

    // public List<User> findAll() {
    // return repository.findAll();
    //}

    //
    // @Transactional



    public User UpdateUser(User user , MultipartFile photoPack) {
        // TODO Auto-generated method stub

        return repository.save(user);
    }

    public User findById(String id) {
        User  obj = findById(id);
        return obj;
    }


	public User updateUserPassword(String id, UserResponse userRespense) {
        Optional<User> findUser = repository.findById(id);
        if(findUser.isPresent()){
            var encryptedPassword = authService.encryptedPassword(userRespense.getPassword());

        	 findUser.get().setPassword(encryptedPassword);
            repository.save(findUser.get());
            return findUser.get() ;
        	 
        }
		return null;
	}


	public Map<String, Object> getDashbordData() {
		 Map<String, Object> hashMap = new HashMap<>();
			List<Product> lastProduit = productRepository.findTop5ByOrderByIdDesc();
			List<Reclamation>  lastReclamation = reclamationRepository.findTop5ByOrderByIdDesc();
			List<UserPayement>  lastDonation = UserPayementRepository.findTop5ByOrderByIdDesc();
			
			
			long  TotalUser= repository.count();
			long  TotalReclamation= reclamationRepository.count();
			int  TotalPayement= clickToPayRepository.countsuccessPayement();
			long  TotalCategory= categoryrepository.count();
			
			List<CountByYearAndMonthDTO> ReclamationParDate = reclamationRepository.countByYearAndMonth();
			List<CountByYearAndMonthDTO> ProduitParDate = productRepository.countByYearAndMonth();
			 hashMap.put("TotalUser",TotalUser);
			 hashMap.put("TotalReclamation",TotalReclamation);
			 hashMap.put("TotalPayement",TotalPayement);
			 hashMap.put("TotalCategory",TotalCategory);
			 hashMap.put("LastProduit",lastProduit);
			 hashMap.put("LastReclamation",lastReclamation);
			 hashMap.put("ReclamationParDate",ReclamationParDate);
			 hashMap.put("ProduitParDate",ProduitParDate);
			 hashMap.put("lastDonation",lastDonation);
			
				return hashMap	;
	}
}
