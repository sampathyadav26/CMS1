package com.maveric.cms_case_details.controller;

import com.maveric.cms_case_details.dto.request.AddCaseCategoryRequest;
import com.maveric.cms_case_details.dto.response.*;
import com.maveric.cms_case_details.service.CaseCategoryLOVService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/case")
@RestController
public class CaseCategoryLOVController {
    private final CaseCategoryLOVService caseCategoryLOVService;

    @Autowired
    public CaseCategoryLOVController(CaseCategoryLOVService caseCategoryLOVService) {
        this.caseCategoryLOVService = caseCategoryLOVService;
    }

    @Operation(summary = "Add Case Category LOV")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Case Category LOV added successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = CaseCategoryLOVResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request, Check the Request",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal Server Error",
                    content = @Content(mediaType = "application/json"))})
    @PostMapping("/LOV/add")
    public ResponseEntity<CaseCategoryLOVResponse> addLOV(@RequestBody AddCaseCategoryRequest request) {
        CaseCategoryLOVResponse responseDTO = caseCategoryLOVService.addCaseCategoryLOV(request);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }


    @Operation(summary = "Get All Case Category LOVs")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "All Case Category LOVs retrieved successfully",

                    content = @Content(mediaType = "application/json",

                            schema = @Schema(implementation = CaseTypeLOVResponse.class))),

            @ApiResponse(responseCode = "500", description = "Internal Server Error",

                    content = @Content(mediaType = "application/json"))})
    @GetMapping("/LOV/all")
    public ResponseEntity<CaseTypeLOVResponse> getAllLOVs() {
        CaseTypeLOVResponse responseDTO = caseCategoryLOVService.getAllCaseCategoryLOVs();
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @Operation(summary = "Fetch Case Types")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Case Types retrieved successfully",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal Server Error",
                    content = @Content(mediaType = "application/json"))})
    @GetMapping("/LOV/caseTypes")
    public ResponseEntity<CaseTypesResponse> fetchCaseTypes() {
        CaseTypesResponse responseDTO = caseCategoryLOVService.getCaseTypes();
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
    @Operation(summary = "Fetch Case Categories by Case Type")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Case Categories retrieved successfully",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal Server Error",
                    content = @Content(mediaType = "application/json"))})
    @GetMapping("/LOV/categories")
    public ResponseEntity<CaseCategoriesResponse> fetchCategories(@RequestParam String caseType) {
        CaseCategoriesResponse responseDTO = caseCategoryLOVService.getCaseCategories(caseType);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }


    @Operation(summary = "Fetch Case Subcategories by Case Type and Category")

    @ApiResponses(value = {

            @ApiResponse(responseCode = "200", description = "Case Subcategories retrieved successfully",

                    content = @Content(mediaType = "application/json")),

            @ApiResponse(responseCode = "500", description = "Internal Server Error",

                    content = @Content(mediaType = "application/json"))})

    @GetMapping("/LOV/subcategories")
    public ResponseEntity<CaseSubcategoriesResponse> fetchSubcategories(@RequestParam String caseType, @RequestParam String category) {
        CaseSubcategoriesResponse responseDTO = caseCategoryLOVService.getCaseSubcategories(caseType, category);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

}