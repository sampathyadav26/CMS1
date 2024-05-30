package com.maveric.cms_agent_note;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class CmsAgentNoteApplication {

	public static void main(String[] args) {
		SpringApplication.run(CmsAgentNoteApplication.class, args);
	}

}
