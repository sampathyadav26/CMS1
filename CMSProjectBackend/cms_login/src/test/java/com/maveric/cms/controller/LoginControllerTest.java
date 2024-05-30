package com.maveric.cms.controller;

import com.maveric.cms.controller.LoginController;
import com.maveric.cms.dto.LoginRequest;
import com.maveric.cms.dto.LoginResponse;
import com.maveric.cms.service.LoginService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LoginControllerTest {

    @Mock
    private LoginService loginService;

    @InjectMocks
    private LoginController loginController;


    @Test
    public void testLogin() {
        // Mock login request
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("xyz@gmail.com");
        loginRequest.setPassword("testPassword");

        // Mock login response
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setEmail("testUser");
        // Mock login service behavior
        when(loginService.login(loginRequest)).thenReturn(loginResponse);

        // Call login API
        ResponseEntity<LoginResponse> responseEntity = loginController.login(loginRequest);

        // Verify login service method is called with correct arguments
        verify(loginService, times(1)).login(loginRequest);

        // Verify response entity status code
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verify response entity body
        assertEquals(loginResponse, responseEntity.getBody());
    }
}
