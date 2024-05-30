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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private CustomerUtils customerUtils;

    public CustomerResponse getCustomerById(Long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isEmpty()) {
            throw new CustomerNotFound("customer does not exist");
        }
        return customerUtils.isFrom(customer.get());
    }


    public CustomerResponse register(CustomerRegistration requestDTO) {
        Optional<Customer> isCustomer = customerRepository.findByEmailId(requestDTO.getEmailId());
        if (isCustomer.isPresent()) {
            throw new CustomerIsPresentException("Customer already present");
        }
        if (isEmpty(requestDTO.getEmailId()) || isEmpty(requestDTO.getFirstname()) || isEmpty(requestDTO.getLastname()) || isEmpty(requestDTO.getMobile()) || isEmpty(requestDTO.getDesignation()) || isEmpty(requestDTO.getNationality())) {
            throw new RuntimeException("Fields should not be null");
        }

        Customer customer = customerUtils.isFrom(requestDTO);

        customerRepository.save(customer);
        return customerUtils.isFrom(customer);
    }

    private boolean isEmpty(String value) {
        return value == null || value.isEmpty();
    }

    public GetAllCustomers<CustomerResponse> getCustomersPaged(GetCustomerPagination request) {
        Pageable pageable = PageRequest.of(request.getCurrentPage() - 1, request.getRecordsPerPage());
        Page<Customer> casesPage = customerRepository.findAll(pageable);

        if (casesPage.isEmpty()) {
            throw new CustomerNotFound("No Customer Details Available");
        }

        List<CustomerResponse> list = casesPage.stream().map(customerUtils::isFrom).toList();

        GetAllCustomers<CustomerResponse> response = new GetAllCustomers<>();
        response.setContent(list);
        response.setCurrentPage(casesPage.getNumber() + 1);
        response.setTotalItems(casesPage.getTotalElements());
        response.setTotalPages(casesPage.getTotalPages());

        return response;
    }

    public GetAllCustomers<CustomerResponse> filterCustomers(SearchCustomerRequest searchCustomer) {

        List<Customer> customerList;

        if (searchCustomer == null || searchCustomer.getCustomerId() == null) {
            customerList = customerRepository.findAll();
        } else {
            String customerIdStr = searchCustomer.getCustomerId().toString();
            customerList = customerRepository.findByCustomerIdStartingWith(customerIdStr);
        }

        if (customerList.isEmpty()) {
            throw new CustomerNotFound("No customers found");
        }

        List<Customer> paginatedList;
        int start = (searchCustomer.getCurrentPage() - 1) * searchCustomer.getRecordsPerPage();
        int end = Math.min(start + searchCustomer.getRecordsPerPage(), customerList.size());
        paginatedList = customerList.subList(start, end);

        List<CustomerResponse> casesSearchResponses = paginatedList.stream().map(customerUtils::isFrom).collect(Collectors.toList());

        GetAllCustomers<CustomerResponse> response = new GetAllCustomers<>();
        response.setContent(casesSearchResponses);
        response.setCurrentPage(searchCustomer.getCurrentPage());
        response.setTotalItems(customerList.size());
        response.setTotalPages((int) Math.ceil((double) customerList.size() / searchCustomer.getRecordsPerPage()));

        return response;
    }

}
