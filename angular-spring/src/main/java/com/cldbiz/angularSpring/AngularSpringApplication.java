package com.cldbiz.angularSpring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {
	"com.cldbiz.angularSpring"
})
@EnableCaching
@EnableJpaRepositories("com.cldbiz.angularSpring.dao")
public class AngularSpringApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(AngularSpringApplication.class, args);
	}

}
