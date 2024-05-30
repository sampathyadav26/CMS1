package com.maveric.cms_case_details.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.maveric.cms_case_details.dto.request.CreateCaseRequest;
import com.maveric.cms_case_details.dto.request.UpdateCaseRequest;
import com.maveric.cms_case_details.dto.response.CaseResponse;
import com.maveric.cms_case_details.dto.response.CasesSearchResponse;
import com.maveric.cms_case_details.service.CaseService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@ExtendWith(MockitoExtension.class)
public class CaseControllerTest {

    @InjectMocks
    private CaseController caseController;

    @Mock
    private CaseService caseService;

    @Test
    public void testRegisterCase_Success() {
        // Arrange
        CreateCaseRequest createCaseRequest = new CreateCaseRequest(); // Provide valid request

        when(caseService.createCase(any())).thenReturn(new CaseResponse()); // Mock service response

        // Act
        ResponseEntity<CaseResponse> response = caseController.register(createCaseRequest);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        // Add more assertions as needed
    }

    @Test
    public void testUpdateCase_Success() {
        // Arrange
        UpdateCaseRequest updateCaseRequest = new UpdateCaseRequest(); // Provide valid request

        when(caseService.updateCase(any())).thenReturn(new CaseResponse()); // Mock service response

        // Act
        ResponseEntity<CaseResponse> response = caseController.updateCase(updateCaseRequest);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        // Add more assertions as needed
    }

    @Test
    public void testGetCaseByCaseId_Success() {
        // Arrange
        Long caseId = 1L; // Provide a valid case ID

        when(caseService.findByCaseId(any())).thenReturn(new CasesSearchResponse()); // Mock service response

        // Act
        ResponseEntity<CasesSearchResponse> response = caseController.getCaseByCaseId(caseId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        // Add more assertions as needed
    }

    @Test
    public void testGetCaseByCaseId_NotFound() {
        // Arrange
        Long caseId = 1L; // Provide a case ID that does not exist

        when(caseService.findByCaseId(any())).thenReturn(null); // Mock service response for case not found

        // Act
        ResponseEntity<CasesSearchResponse> response = caseController.getCaseByCaseId(caseId);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
