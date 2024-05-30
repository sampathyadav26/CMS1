package com.maveric.cms_case_details;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class CmsCaseDetailsApplication {

	public static void main(String[] args) {
		SpringApplication.run(CmsCaseDetailsApplication.class, args);
	}

}
