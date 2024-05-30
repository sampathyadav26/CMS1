package com.maveric.cms.controller;


import com.maveric.cms.dto.request.CustomerRegistration;
import com.maveric.cms.dto.request.GetCustomerPagination;
import com.maveric.cms.dto.request.SearchCustomerRequest;
import com.maveric.cms.dto.response.CustomerResponse;
import com.maveric.cms.dto.response.GetAllCustomers;
import com.maveric.cms.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;



@RequestMapping("/customer")
@RestController
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @Operation(summary = "Get Customer by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Customer details retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = CustomerResponse.class))),
            @ApiResponse(responseCode = "404", description = "Customer not found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @GetMapping("id/{id}")
    public ResponseEntity<CustomerResponse> getCustomerById(@PathVariable Long id) {
        return new ResponseEntity<>(customerService.getCustomerById(id), HttpStatus.OK);
    }

    @Operation(summary = "Register a new Customer")

    @ApiResponses(value = {

            @ApiResponse(responseCode = "200", description = "Customer registered successfully",

                    content = @Content(mediaType = "application/json",

                            schema = @Schema(implementation = CustomerResponse.class))),

            @ApiResponse(responseCode = "400", description = "Bad Request, Check the Request"),

            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @PostMapping("/register")
    public ResponseEntity<CustomerResponse> register(@Valid @RequestBody CustomerRegistration requestDTO) {
        CustomerResponse responseDTO = customerService.register(requestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @Operation(summary = "Get All Customers with Pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Customers retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = GetAllCustomers.class))),
            @ApiResponse(responseCode = "404", description = "Customers not found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @PostMapping("/all")
    public  ResponseEntity<GetAllCustomers> getAllCases(@RequestBody GetCustomerPagination request) {
        GetAllCustomers<CustomerResponse> customers = customerService.getCustomersPaged(request);
        if (customers == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(customers);

    }

    @PostMapping("/filter")
    public ResponseEntity<GetAllCustomers<CustomerResponse>> filterCases(@RequestBody SearchCustomerRequest filterCase) {
        GetAllCustomers<CustomerResponse> filteredCases = customerService.filterCustomers(filterCase);
        if (filteredCases.getContent().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(filteredCases, HttpStatus.OK);
        }
    }

}
