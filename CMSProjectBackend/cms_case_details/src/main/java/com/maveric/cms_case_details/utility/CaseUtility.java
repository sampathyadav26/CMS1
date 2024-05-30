package com.maveric.cms_case_details.utility;

import com.maveric.cms_case_details.dto.request.CreateCaseRequest;
import com.maveric.cms_case_details.dto.request.UpdateCaseRequest;
import com.maveric.cms_case_details.dto.response.CaseCategoryLOVResponse;
import com.maveric.cms_case_details.dto.response.CaseResponse;
import com.maveric.cms_case_details.dto.response.CasesListResponse;
import com.maveric.cms_case_details.dto.response.CasesSearchResponse;
import com.maveric.cms_case_details.entity.CaseCategoryLOV;
import com.maveric.cms_case_details.entity.CaseDetails;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

@Component
public class CaseUtility {
    private static final DateTimeFormatter DateFormatter=DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public CasesSearchResponse casesListFrom(CaseDetails caseDetails) {
        CasesSearchResponse responseDTO = new CasesSearchResponse();
        BeanUtils.copyProperties(caseDetails, responseDTO);
        return responseDTO;
    }

    public CaseDetails from(CreateCaseRequest createCaseDTO) {
        CaseDetails caseDetails = new CaseDetails();
        BeanUtils.copyProperties(createCaseDTO, caseDetails);
        return caseDetails;
    }

    public CaseResponse from(CaseDetails caseDetails) {
        CaseResponse caseResponse = new CaseResponse();
        BeanUtils.copyProperties(caseDetails, caseResponse);
        return caseResponse;
    }

    public CaseDetails from (UpdateCaseRequest updateCase){
        CaseDetails caseDetails= new CaseDetails();
        BeanUtils.copyProperties(updateCase,caseDetails);
        return caseDetails;
    }

    public CasesListResponse listFrom(CaseDetails caseDetails) {
        CasesListResponse responseDTO = new CasesListResponse();
        BeanUtils.copyProperties(caseDetails, responseDTO);
        return responseDTO;
    }

    public LocalDate toLocalDate(String text){
        LocalDate date=LocalDate.parse(text,DateFormatter);
        return date;
    }

}
