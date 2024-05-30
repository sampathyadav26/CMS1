package com.maveric.cms_case_details.controller;

import com.maveric.cms_case_details.dto.request.*;
import com.maveric.cms_case_details.dto.response.CaseResponse;
import com.maveric.cms_case_details.dto.response.CasesListResponse;
import com.maveric.cms_case_details.dto.response.CasesSearchResponse;
import com.maveric.cms_case_details.dto.response.GetAllCases;
import com.maveric.cms_case_details.service.CaseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RequestMapping("/case")
@RestController
public class CaseController {
    @Autowired
    private CaseService caseService;

    @Operation(summary = "Register a new Case")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Case registered successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = CaseResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request, Check the Request",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal Server Error",
                    content = @Content(mediaType = "application/json"))})
    @PostMapping("/register")
    public ResponseEntity<CaseResponse> register(@Valid @RequestBody CreateCaseRequest caseDetails) {
        return new ResponseEntity<>(caseService.createCase(caseDetails), HttpStatus.OK);
    }

    @Operation(summary = "Update an existing Case by Case ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Case updated successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = CaseResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request, Check the Request",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal Server Error",
                    content = @Content(mediaType = "application/json"))})
    @PutMapping("/update/id/{caseId}")
    public ResponseEntity<CaseResponse> updateCase(@Valid @RequestBody UpdateCaseRequest caseDetails) {
        return new ResponseEntity<>(caseService.updateCase(caseDetails), HttpStatus.OK);
    }

    @Operation(summary = "Get Case by Case ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Case details retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = CasesSearchResponse.class))),
            @ApiResponse(responseCode = "404", description = "Case not found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @GetMapping("/get/id/{caseId}")
    public ResponseEntity<CasesSearchResponse> getCaseByCaseId(@PathVariable("caseId") Long caseId) {
        CasesSearchResponse cases = caseService.findByCaseId(caseId);
        System.out.println(cases);
        if (cases == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cases, HttpStatus.OK);
    }

    @Operation(summary = "Get Cases by CreatedBy")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cases retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = CasesSearchResponse.class)))),
            @ApiResponse(responseCode = "404", description = "Cases not found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})

    @GetMapping("/createdBy/{createdBy}")
    public ResponseEntity<List<CasesSearchResponse>> getCasesByCreatedBy(@PathVariable("createdBy") String createdBy) {
        GetByCreatedByRequest requestDTO = GetByCreatedByRequest.builder().createdBy(createdBy).build();
        List<CasesSearchResponse> cases = caseService.listOfCasesByCreatedBy(requestDTO);
        if (cases.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cases, HttpStatus.OK);
    }

    @Operation(summary = "Get Cases by Case Type")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cases retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = CasesSearchResponse.class)))),
            @ApiResponse(responseCode = "404", description = "Cases not found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @GetMapping("/caseType/{caseType}")
    public ResponseEntity<List<CasesSearchResponse>> getCasesByCaseType(@PathVariable("caseType") String caseType) {
        GetByCaseTypeRequest requestDTO = GetByCaseTypeRequest.builder().caseType(caseType).build();
        List<CasesSearchResponse> cases = caseService.listOfCasesByCaseType(requestDTO);
        if (cases.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cases, HttpStatus.OK);
    }

    @Operation(summary = "Get Cases by Category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cases retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = CasesSearchResponse.class)))),
            @ApiResponse(responseCode = "404", description = "Cases not found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})

    @GetMapping("/category/{category}")
    public ResponseEntity<List<CasesSearchResponse>> getCasesByCategories(@PathVariable("category") String categories) {
        GetByCategoryRequest requestDTO = GetByCategoryRequest.builder().category(categories).build();
        List<CasesSearchResponse> cases = caseService.listOfCasesByCategories(requestDTO);
        if (cases.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cases, HttpStatus.OK);
    }

    @Operation(summary = "Get Cases by SubCategory")

    @ApiResponses(value = {

            @ApiResponse(responseCode = "200", description = "Cases retrieved successfully",

                    content = @Content(mediaType = "application/json",

                            array = @ArraySchema(schema = @Schema(implementation = CasesSearchResponse.class)))),

            @ApiResponse(responseCode = "404", description = "Cases not found"),

            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @GetMapping("/subCategory/{subCategory}")
    public ResponseEntity<List<CasesSearchResponse>> getCasesBySubCategory(@PathVariable("subCategory") String subCategory) {
        GetBySubcategoryRequest requestDTO = GetBySubcategoryRequest.builder().subCategory(subCategory).build();
        List<CasesSearchResponse> cases = caseService.listOfCasesBySubCategories(requestDTO);
        if (cases.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cases, HttpStatus.OK);
    }

    @Operation(summary = "Get All Cases with Pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cases retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = GetAllCases.class))),
            @ApiResponse(responseCode = "404", description = "Cases not found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})

    @PostMapping("/all")
    public ResponseEntity<GetAllCases> getAllCases(@RequestBody GetCasesPaginationRequest request) {
        GetAllCases<CasesListResponse> cases = caseService.getCasesPaged(request);
        if (cases == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(cases);
    }

    @Operation(summary = "Get Case Status Count for Date Range")

    @ApiResponses(value = {

            @ApiResponse(responseCode = "200", description = "Case status count retrieved successfully",

                    content = @Content(mediaType = "application/json",

                            schema = @Schema(implementation = Map.class))),

            @ApiResponse(responseCode = "404", description = "Case status count not found"),

            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @PostMapping("/status/count/range")
    public ResponseEntity<Map<String, Long>> getCaseStatusByRange(@RequestBody CaseRequest request) {
        Map<String, Long> statusByRange = caseService.getCaseStatusCountForDateRange(request);

        if (statusByRange.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(statusByRange);
    }

    @Operation(summary = "Get All Case Status")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "All case status retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "404", description = "All case status not found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @GetMapping("/status/count/all")
    public ResponseEntity<Map<String, Long>> getAllCaseStatus() {
        Map<String, Long> statusByRange = caseService.getAllCaseStatus();

        if (statusByRange.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(statusByRange);
    }

    @PostMapping("/filter")
    public ResponseEntity<GetAllCases<CasesSearchResponse>> filterCases(@RequestBody FilterCaseRequest filterCase) {
        GetAllCases<CasesSearchResponse> filteredCases = caseService.filterCases(filterCase);
        if (filteredCases.getContent().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(filteredCases, HttpStatus.OK);
        }
    }

}

