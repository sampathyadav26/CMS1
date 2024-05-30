package com.maveric.cms.service;

import com.maveric.cms.dto.request.CustomerRegistration;
import com.maveric.cms.dto.request.GetCustomerPagination;
import com.maveric.cms.dto.request.SearchCustomerRequest;
import com.maveric.cms.dto.response.CustomerResponse;
import com.maveric.cms.dto.response.GetAllCustomers;
import com.maveric.cms.entity.Customer;
import com.maveric.cms.exceptions.CustomerIsPresentException;
import com.maveric.cms.exceptions.CustomerNotFound;
import com.maveric.cms.repo.CustomerRepository;
import com.maveric.cms.utils.CustomerUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CustomerServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private CustomerUtils customerUtils;

    @InjectMocks
    private CustomerService customerService;

    @Test
    void testGetCustomerById() {
        // Arrange
        Long customerId = 1L;
        Customer customer = new Customer();
        customer.setCustomerId(customerId);
        CustomerResponse customerResponse = new CustomerResponse();
        customerResponse.setCustomerId(customerId);

        when(customerRepository.findById(customerId)).thenReturn(Optional.of(customer));
        when(customerUtils.isFrom(customer)).thenReturn(customerResponse);

        // Act
        CustomerResponse result = customerService.getCustomerById(customerId);

        // Assert
        assertNotNull(result);
        assertEquals(customerId, result.getCustomerId());
    }

    @Test
    void testGetCustomerById_CustomerNotFound() {
        // Arrange
        Long customerId = 1L;

        when(customerRepository.findById(customerId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(CustomerNotFound.class, () -> customerService.getCustomerById(customerId));
    }

    @Test
    void testRegister() {
        // Arrange
        CustomerRegistration requestDTO = new CustomerRegistration();
        requestDTO.setEmailId("test@example.com");
        requestDTO.setFirstname("John");
        requestDTO.setLastname("Doe");
        requestDTO.setMobile("1234567890");
        requestDTO.setDesignation("Engineer");
        requestDTO.setNationality("US");

        Customer customer = new Customer();
        customer.setEmailId("test@example.com");
        CustomerResponse customerResponse = new CustomerResponse();
        customerResponse.setEmailId("test@example.com");

        when(customerRepository.findByEmailId(requestDTO.getEmailId())).thenReturn(Optional.empty());
        when(customerUtils.isFrom(requestDTO)).thenReturn(customer);
        when(customerRepository.save(any(Customer.class))).thenReturn(customer);
        when(customerUtils.isFrom(customer)).thenReturn(customerResponse);

        // Act
        CustomerResponse result = customerService.register(requestDTO);

        // Assert
        assertNotNull(result);
        assertEquals(requestDTO.getEmailId(), result.getEmailId());
    }


    @Test
    void testRegister_CustomerIsPresentException() {
        // Arrange
        CustomerRegistration requestDTO = new CustomerRegistration();
        requestDTO.setEmailId("test@example.com");

        when(customerRepository.findByEmailId(requestDTO.getEmailId())).thenReturn(Optional.of(new Customer()));

        // Act & Assert
        assertThrows(CustomerIsPresentException.class, () -> customerService.register(requestDTO));
    }

    @Test
    void testGetCustomersPaged() {
        // Arrange
        GetCustomerPagination request = new GetCustomerPagination();
        request.setCurrentPage(1);
        request.setRecordsPerPage(10);

        List<Customer> customerList = List.of(new Customer());

        Page<Customer> customerPage = new PageImpl<>(customerList);

        CustomerResponse expectedCustomerResponse = new CustomerResponse();
        // Set expected values in the CustomerResponse

        List<CustomerResponse> expectedResponseList = List.of(expectedCustomerResponse);

        GetAllCustomers<CustomerResponse> expectedResponse = new GetAllCustomers<>();
        expectedResponse.setContent(expectedResponseList);
        expectedResponse.setCurrentPage(1);
        expectedResponse.setTotalItems(1);
        expectedResponse.setTotalPages(1);

        when(customerRepository.findAll(any(Pageable.class))).thenReturn(customerPage);
        when(customerUtils.isFrom(any(Customer.class))).thenReturn(expectedCustomerResponse);

        // Act
        GetAllCustomers<CustomerResponse> result = customerService.getCustomersPaged(request);

        // Assert
        assertNotNull(result);
        assertEquals(expectedResponse.getContent(), result.getContent());
        assertEquals(expectedResponse.getCurrentPage(), result.getCurrentPage());
        assertEquals(expectedResponse.getTotalItems(), result.getTotalItems());
        assertEquals(expectedResponse.getTotalPages(), result.getTotalPages());

        // Additional Asserts for method calls
        Mockito.verify(customerRepository, Mockito.times(1)).findAll(any(Pageable.class));
        Mockito.verify(customerUtils, Mockito.times(1)).isFrom(any(Customer.class));
    }

    @Test
    void testFilterCustomers() {
        // Arrange
        SearchCustomerRequest searchRequest = new SearchCustomerRequest();
        searchRequest.setCurrentPage(1);
        searchRequest.setRecordsPerPage(10);
        searchRequest.setCustomerId(1L); // Assuming a valid customer ID for this test

        List<Customer> mockCustomerList = Arrays.asList(new Customer(), new Customer());
        when(customerRepository.findByCustomerIdStartingWith("1")).thenReturn(mockCustomerList);

        when(customerUtils.isFrom(any(Customer.class))).thenReturn(new CustomerResponse());

        // Act
        GetAllCustomers<CustomerResponse> result = customerService.filterCustomers(searchRequest);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getCurrentPage());
        assertEquals(2, result.getTotalItems());
        assertEquals(1, result.getTotalPages());

        // Additional Asserts for method calls
        Mockito.verify(customerRepository, Mockito.times(1)).findByCustomerIdStartingWith("1");
        Mockito.verify(customerUtils, Mockito.times(2)).isFrom(any(Customer.class));
    }

    @Test
    void testRegisterFieldsNull() {
        // Arrange
        CustomerRegistration requestDTO = new CustomerRegistration();
        // Fields are intentionally left null

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            customerService.register(requestDTO);
        });

        assertEquals("Fields should not be null", exception.getMessage());
    }
    @Test
    void testFilterCustomers_NoCustomersFound() {
        // Arrange
        SearchCustomerRequest searchRequest = new SearchCustomerRequest();
        searchRequest.setCurrentPage(1);
        searchRequest.setRecordsPerPage(10);
        searchRequest.setCustomerId(1L); // Assuming a valid customer ID for this test

        // Mock the customer repository to return an empty list
        Mockito.when(customerRepository.findByCustomerIdStartingWith("1")).thenReturn(Collections.emptyList());

        // Act & Assert
        assertThrows(CustomerNotFound.class, () -> {
            customerService.filterCustomers(searchRequest);
        });

        // Additional Asserts for method calls
        Mockito.verify(customerRepository, Mockito.times(1)).findByCustomerIdStartingWith("1");
        // Ensure that customerUtils.isFrom is not called in case of no customers found
        Mockito.verify(customerUtils, Mockito.never()).isFrom(any(Customer.class));
    }

    @Test
    void testFilterCustomers_FindAllCustomers() {
        // Arrange
        SearchCustomerRequest searchRequest = new SearchCustomerRequest();
        searchRequest.setCurrentPage(1);
        searchRequest.setRecordsPerPage(10);

        List<Customer> mockCustomerList = Arrays.asList(new Customer(), new Customer());
        Mockito.when(customerRepository.findAll()).thenReturn(mockCustomerList);

        Mockito.when(customerUtils.isFrom(any(Customer.class))).thenReturn(new CustomerResponse());

        // Act
        GetAllCustomers<CustomerResponse> result = customerService.filterCustomers(searchRequest);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getCurrentPage());
        assertEquals(2, result.getTotalItems());
        assertEquals(1, result.getTotalPages());

        // Additional Asserts for method calls
        Mockito.verify(customerRepository, Mockito.times(1)).findAll();
        Mockito.verify(customerUtils, Mockito.times(2)).isFrom(any(Customer.class));
    }
    @Test
    void testGetCustomersPaged_EmptyPage() {
        // Arrange
        GetCustomerPagination request = new GetCustomerPagination();
        request.setCurrentPage(1);
        request.setRecordsPerPage(10);

        Page<Customer> emptyPage = Mockito.mock(Page.class);
        Mockito.when(emptyPage.isEmpty()).thenReturn(true);
        Mockito.when(customerRepository.findAll(any(Pageable.class))).thenReturn(emptyPage);

        // Act and Assert
        CustomerNotFound exception = assertThrows(CustomerNotFound.class,
                () -> customerService.getCustomersPaged(request));

        assertEquals("No Customer Details Available", exception.getMessage());

        // Additional Asserts for method calls
        Mockito.verify(customerRepository, Mockito.times(1)).findAll(any(Pageable.class));
        Mockito.verifyNoInteractions(customerUtils); // Ensure that customerUtils.isFrom is not called when the page is empty
    }
}
