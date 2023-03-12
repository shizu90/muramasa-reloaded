package com.gabriel.muramasa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;


@SpringBootApplication
@EntityScan(basePackages = {"com.gabriel.muramasa.models"})
public class MuramasaApplication {
	public static void main(String[] args) {
		SpringApplication.run(MuramasaApplication.class, args);
	}

}
