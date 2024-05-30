package com.maveric.cms.controller;

import com.maveric.cms.dto.request.CustomerRegistration;
import com.maveric.cms.dto.request.GetCustomerPagination;
import com.maveric.cms.dto.request.SearchCustomerRequest;
import com.maveric.cms.dto.response.CustomerResponse;
import com.maveric.cms.dto.response.GetAllCustomers;
import com.maveric.cms.service.CustomerService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CustomerControllerTest {

    @Mock
    private CustomerService customerService;

    @InjectMocks
    private CustomerController customerController;

    @Test
    public void testGetCustomerById() {
        // Arrange
        Long customerId = 1L;
        CustomerResponse customerResponse = new CustomerResponse();
        when(customerService.getCustomerById(customerId)).thenReturn(customerResponse);

        // Act
        ResponseEntity<CustomerResponse> responseEntity = customerController.getCustomerById(customerId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(customerResponse, responseEntity.getBody());
        verify(customerService, times(1)).getCustomerById(customerId);
    }

    @Test
    public void testRegister() {
        // Arrange
        CustomerRegistration customerRegistration = new CustomerRegistration();
        CustomerResponse customerResponse = new CustomerResponse();
        when(customerService.register(any(CustomerRegistration.class))).thenReturn(customerResponse);

        // Act
        ResponseEntity<CustomerResponse> responseEntity = customerController.register(customerRegistration);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(customerResponse, responseEntity.getBody());
        verify(customerService, times(1)).register(customerRegistration);
    }

    @Test
    public void testGetAllCases() {
        // Arrange
        GetCustomerPagination getCustomerPagination = new GetCustomerPagination();
        GetAllCustomers<CustomerResponse> allCustomers = new GetAllCustomers<>();
        when(customerService.getCustomersPaged(getCustomerPagination)).thenReturn(allCustomers);

        // Act
        ResponseEntity<GetAllCustomers> responseEntity = customerController.getAllCases(getCustomerPagination);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(allCustomers, responseEntity.getBody());
        verify(customerService, times(1)).getCustomersPaged(getCustomerPagination);
    }

    @Test
    public void testFilterCases() {
        // Arrange
        SearchCustomerRequest searchCustomerRequest = new SearchCustomerRequest();
        GetAllCustomers<CustomerResponse> filteredCustomers = new GetAllCustomers<>();
        List<CustomerResponse> customerResponseList=new ArrayList<>();
        CustomerResponse customerResponse=new CustomerResponse();
        customerResponse.setCustomerId(1L);
        customerResponse.setEmailId("example@gmail.com");
        customerResponse.setDesignation("developer");
        customerResponse.setMobile("9999999999");
        customerResponse.setLastname("Gopan");
        customerResponse.setFirstname("Asish");
        customerResponse.setNationality("Indian");
        customerResponseList.add(customerResponse);
        filteredCustomers.setContent(customerResponseList);
        when(customerService.filterCustomers(searchCustomerRequest)).thenReturn(filteredCustomers);

        // Act
        ResponseEntity<GetAllCustomers<CustomerResponse>> responseEntity =
                customerController.filterCases(searchCustomerRequest);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(filteredCustomers, responseEntity.getBody());
        verify(customerService, times(1)).filterCustomers(searchCustomerRequest);
    }

    @Test
    public void testFilterCasesEmptyResult() {
        // Arrange
        SearchCustomerRequest searchCustomerRequest = new SearchCustomerRequest();
        GetAllCustomers<CustomerResponse> filteredCustomers = new GetAllCustomers<>();
        filteredCustomers.setContent(Collections.emptyList()); // Empty list indicates no results
        when(customerService.filterCustomers(searchCustomerRequest)).thenReturn(filteredCustomers);

        // Act
        ResponseEntity<GetAllCustomers<CustomerResponse>> responseEntity =
                customerController.filterCases(searchCustomerRequest);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertNull(responseEntity.getBody()); // Ensure the body is null for a NOT_FOUND response
        verify(customerService, times(1)).filterCustomers(searchCustomerRequest);
    }

    @Test
    public void testGetAllCases_CustomerServiceReturnsNull() {
        // Arrange
        GetCustomerPagination getCustomerPagination = new GetCustomerPagination();
        when(customerService.getCustomersPaged(getCustomerPagination)).thenReturn(null);

        // Act
        ResponseEntity<GetAllCustomers> responseEntity = customerController.getAllCases(getCustomerPagination);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertNull(responseEntity.getBody());
        verify(customerService, times(1)).getCustomersPaged(getCustomerPagination);
    }
}
