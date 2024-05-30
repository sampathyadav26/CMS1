package com.maveric.cms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class CmsCustomerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CmsCustomerApplication.class, args);
	}

}
