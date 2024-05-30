package com.maveric.cms.service;

import com.maveric.cms.client.RegisterApi;
import com.maveric.cms.dto.LoginRequest;
import com.maveric.cms.dto.LoginResponse;
import com.maveric.cms.exception.AgentNotFoundException;
import com.maveric.cms.exception.PasswordIncorectException;
import com.maveric.cms.service.LoginService;
import feign.FeignException;
import feign.Request;
import feign.Response;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.function.Executable;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LoginServiceTest {

    @Mock
    private RegisterApi registerApi;

    @InjectMocks
    private LoginService loginService;

    @Test
    public void testSuccessfulLogin() {
        // Mock login request
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password123");

        // Mock login response
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setEmail("test@example.com");

        // Mock successful login response from RegisterApi
        when(registerApi.loginUser(any(LoginRequest.class))).thenReturn(loginResponse);

        // Call login method
        LoginResponse response = loginService.login(loginRequest);
        verify(registerApi, times(1)).loginUser(loginRequest);

        assertEquals(loginResponse, response);
    }


    @Test
    public void testOtherFeignException() {
        // Mock login request
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password123");

        // Mock FeignException with a generic message
        when(registerApi.loginUser(any(LoginRequest.class)))
                .thenThrow(FeignException.class);

        // Verify that a RuntimeException is thrown
        assertThrows(RuntimeException.class, () -> loginService.login(loginRequest));
    }

    @Test
    void test_login_when_given_password_invalid(){
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password123");
        FeignException feignException=new FeignException.BadRequest("Password is Wrong", Request.create(Request.HttpMethod.GET,"null",new HashMap<>(),null,null,null), null, null);
        doThrow(feignException)
                .when(registerApi)
                .loginUser(any(LoginRequest.class));
        Executable executable=()->{
            loginService.login(loginRequest);
        };
        assertThrows(PasswordIncorectException.class,executable);
    }

    @Test
    void test_login_when_No_User_Exist_with_given_mailId(){
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password123");
        FeignException feignException=new FeignException.BadRequest("user does not exist", Request.create(Request.HttpMethod.GET,"null",new HashMap<>(),null,null,null), null, null);
        doThrow(feignException)
                .when(registerApi)
                .loginUser(any(LoginRequest.class));
        Executable executable=()->{
            loginService.login(loginRequest);
        };
        assertThrows(AgentNotFoundException.class,executable);
    }

    @Test
    void test_login_when_UnExpected_Exception_thrown(){
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password123");
        FeignException feignException=new FeignException.BadRequest("exception", Request.create(Request.HttpMethod.GET,"null",new HashMap<>(),null,null,null), null, null);
        doThrow(feignException)
                .when(registerApi)
                .loginUser(any(LoginRequest.class));
        Executable executable=()->{
            loginService.login(loginRequest);
        };
        assertThrows(RuntimeException.class,executable);
    }
}

