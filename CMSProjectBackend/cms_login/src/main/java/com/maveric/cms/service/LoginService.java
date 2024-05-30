package com.maveric.cms.service;

import com.maveric.cms.client.RegisterApi;
import com.maveric.cms.dto.LoginRequest;
import com.maveric.cms.dto.LoginResponse;
import com.maveric.cms.exception.AgentNotFoundException;
import com.maveric.cms.exception.PasswordIncorectException;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    private RegisterApi registerApi;

    public LoginResponse login(LoginRequest loginRequest) {
        try {
            LoginResponse loginResponse = registerApi.loginUser(loginRequest);
            return loginResponse;
        } catch (FeignException.BadRequest e) {
            String errorMessage = e.getMessage();
            if (errorMessage.contains("Password is Wrong")) {
                throw new PasswordIncorectException("Password is incorrect");
            } else if (errorMessage.contains("user does not exist")) {
                throw new AgentNotFoundException("User does not exist: " + loginRequest.getEmail());
            } else {
                throw new RuntimeException("An error occurred while processing the login request: " + errorMessage);
            }
        }
    }
}
