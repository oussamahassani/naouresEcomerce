package com.example.betwixbackend.config;

import com.example.betwixbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {
    private final UserRepository repository;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable)
        		 .cors(cors -> cors.configurationSource(corsFilter())) // Enab
                .authorizeHttpRequests(req -> {
                    req.requestMatchers("/imageProduit/**").permitAll()
                            .requestMatchers("/imagePack/**").permitAll()
                            .requestMatchers("/imageCategorie/**").permitAll()
                            .requestMatchers("/imageUser/**").permitAll()
                            .requestMatchers("/*.gif").permitAll()
                            .requestMatchers("/*.jpg").permitAll()
                            .requestMatchers("/*.png").permitAll()
                            .requestMatchers("/payment/**").permitAll()
                            .requestMatchers("/orders/**").permitAll()
                            .requestMatchers("/products/**").permitAll()
                            .requestMatchers("/categories/**").permitAll()
                            .requestMatchers("/reclamations/**").permitAll()
                            .requestMatchers("/notifications/**").permitAll()
                           .requestMatchers("/roullete/**").permitAll()
                            .requestMatchers("/pack/**").permitAll()
                            .requestMatchers("/auth/**").permitAll()
                            .requestMatchers("/users/**").permitAll()
                            .requestMatchers("/posts/**").permitAll()
                            
                            .anyRequest().authenticated();
                })
                .authenticationManager(authenticationManager)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();

    }

    @Bean
    public UserDetailsService userDetailsService() {
        return email -> repository.findByEmail(email).orElseThrow();

    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(userDetailsService())
                .passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder.build();
    }


    @Bean
    public BCryptPasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean

    public CorsConfigurationSource  corsFilter()
    {
    	 CorsConfiguration corsConfiguration = new CorsConfiguration();
   	  corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200" ,"http://localhost:54089","http://localhost:53200"));
         corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization"));
         corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
         corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS"));
	      //  corsConfiguration.addAllowedHeader("*"); // Allow all headers
	      //  corsConfiguration.addAllowedMethod("*"); // Allow all methods
	        corsConfiguration.setAllowCredentials(true); // Allow credentials

	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", corsConfiguration); // Apply CORS settings to all endpoints
	     
	        
        
	        return source;

    }
}
