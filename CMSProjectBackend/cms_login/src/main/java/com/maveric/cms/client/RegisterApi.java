package com.maveric.cms.client;

import com.maveric.cms.dto.LoginRequest;
import com.maveric.cms.dto.LoginResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@FeignClient(name = "user-registration", url="http://192.168.97.41:8085" )
public interface RegisterApi {

    @PostMapping("/user/login")
    LoginResponse loginUser(@RequestBody LoginRequest loginRequest);
}
