package com.maveric.cms.controller;
import com.maveric.cms.dto.request.LoginRequest;
import com.maveric.cms.dto.request.RegisterationRequest;
import com.maveric.cms.dto.request.ResetPasswordRequestDTO;
import com.maveric.cms.dto.request.ValidateUserRequestDTO;
import com.maveric.cms.dto.response.LoginResponse;
import com.maveric.cms.service.AgentRegistrationService;
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
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AgentRegistrationControllerTest {

    @Mock
    private AgentRegistrationService agentRegistrationService;

    @InjectMocks
    private AgentRegistrationController agentRegistrationController;


    @Test
    void testRegister() {
        // Mocking the behavior of agentRegistrationService.registration
        RegisterationRequest request = new RegisterationRequest();
        LoginResponse mockResponse = new LoginResponse();
        when(agentRegistrationService.registration(any(RegisterationRequest.class))).thenReturn(mockResponse);

        // Invoking the controller method
        ResponseEntity<LoginResponse> responseEntity = agentRegistrationController.register(request);
        // Verifying the response
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(mockResponse, responseEntity.getBody());
    }
    @Test
    void testLogin() {
        // Mocking the behavior of agentRegistrationService.login
        LoginRequest loginRequest = new LoginRequest();
        LoginResponse mockResponse = new LoginResponse();
        when(agentRegistrationService.login(any(LoginRequest.class))).thenReturn(mockResponse);

        // Invoking the controller method
        ResponseEntity<LoginResponse> responseEntity = agentRegistrationController.login(loginRequest);

        // Verifying the response
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(mockResponse, responseEntity.getBody());
    }

    @Test
    void testValidatingUser_Success() {
        // Arrange
        ValidateUserRequestDTO requestDTO = new ValidateUserRequestDTO();
        LoginResponse expectedResponse = new LoginResponse();
        when(agentRegistrationService.validatingUser(requestDTO)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<LoginResponse> responseEntity = agentRegistrationController.validatingUser(requestDTO);

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResponse, responseEntity.getBody());

        // Verify the method was called
        verify(agentRegistrationService, times(1)).validatingUser(requestDTO);
    }

    @Test
    void testAcceptingNewCreds_Success() {
        // Arrange
        ResetPasswordRequestDTO requestDTO = new ResetPasswordRequestDTO();
        LoginResponse expectedResponse = new LoginResponse();
        when(agentRegistrationService.validatePassword(requestDTO)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<LoginResponse> responseEntity = agentRegistrationController.acceptingNewCreds(requestDTO);

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResponse, responseEntity.getBody());

        // Verify the method was called
        verify(agentRegistrationService, times(1)).validatePassword(requestDTO);
    }


}
