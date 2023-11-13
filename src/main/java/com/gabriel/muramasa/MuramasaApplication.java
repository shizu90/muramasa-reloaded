package com.gabriel.muramasa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EntityScan(basePackages = {"com.gabriel.muramasa.models"})
public class MuramasaApplication {
    
        @Bean
        public WebMvcConfigurer cors() {
            return new WebMvcConfigurer(){
                @Override
                public void addCorsMappings(CorsRegistry registry) {
                    registry.addMapping("/**")
                            .allowedOrigins("http://localhost:5173")
                            .allowedMethods("*");
                }
            };
        }
    
	public static void main(String[] args) {
		SpringApplication.run(MuramasaApplication.class, args);
	}

}
