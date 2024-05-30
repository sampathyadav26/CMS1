package com.maveric.cms_audit_event;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class CmsAuditEventApplication {

	public static void main(String[] args) {
		SpringApplication.run(CmsAuditEventApplication.class, args);
	}

}
