package com.stackroute.accountmanager.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("com.stackroute.accountmanager.controller"))
				.paths(PathSelectors.regex("/api/.*")).build().apiInfo(apiInfo());
	}

	// This is advanced config of spring UI to display info about our
	// application
	private ApiInfo apiInfo() {
		return new ApiInfo("My Spring Boot REST API", "Documentation of accountManager App.", "v1.0.0",
				"Terms of service", new Contact("Sonu Kumar", "www.example.com", "myeaddress@company.com"),
				"License of API", "API license URL", Collections.emptyList());
	}
}
