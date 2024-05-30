package com.maveric.cms_case_details.service;

import com.maveric.cms_case_details.dto.request.AddCaseCategoryRequest;
import com.maveric.cms_case_details.dto.response.*;
import com.maveric.cms_case_details.entity.CaseCategoryLOV;
import com.maveric.cms_case_details.entity.CaseTypeOption;
import com.maveric.cms_case_details.repo.CaseCategoryLOVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;


@Service
public class CaseCategoryLOVService {
    private final CaseCategoryLOVRepository caseCategoryLOVRepository;

    @Autowired
    public CaseCategoryLOVService(CaseCategoryLOVRepository caseCategoryLOVRepository) {
        this.caseCategoryLOVRepository = caseCategoryLOVRepository;
    }
    public CaseCategoryLOVResponse addCaseCategoryLOV(AddCaseCategoryRequest request) {
        CaseCategoryLOV entity = CaseCategoryLOV.builder()
                .caseType(request.getCaseType())
                .caseCategories(request.getCaseCategories())
                .build();
        CaseCategoryLOV savedEntity = caseCategoryLOVRepository.save(entity);
        return convertToResponse(savedEntity);
    }


    public CaseTypeLOVResponse getAllCaseCategoryLOVs() {
        List<CaseCategoryLOV> allEntities = caseCategoryLOVRepository.findAll();
        Map<String, CaseTypeOption> caseTypeLOV = new HashMap<>();
        for (CaseCategoryLOV entity : allEntities) {
            CaseTypeOption option = new CaseTypeOption();
            option.setCaseCategories(Arrays.asList(entity.getCaseCategories().keySet().toArray(new String[0])));
            option.setSubCategoryOptions(entity.getCaseCategories());
            caseTypeLOV.put(entity.getCaseType(), option);
        }
        return new CaseTypeLOVResponse(caseTypeLOV);
    }

    public CaseTypesResponse getCaseTypes() {
        List<CaseCategoryLOV> allEntities = caseCategoryLOVRepository.findAll();
        List<String> caseTypes = new ArrayList<>();
        for (CaseCategoryLOV entity : allEntities) {
            caseTypes.add(entity.getCaseType());
        }
        return new CaseTypesResponse(caseTypes);
    }

    public CaseCategoriesResponse getCaseCategories(String caseType) {
        Optional<CaseCategoryLOV> caseCategoryLOVOptional = caseCategoryLOVRepository.findByCaseType(caseType);
        List<String> categories = new ArrayList<>();
        if (caseCategoryLOVOptional.isPresent()) {
            CaseCategoryLOV cclov = caseCategoryLOVOptional.get();
            categories.addAll(cclov.getCaseCategories().keySet());
        }
        return new CaseCategoriesResponse(categories);
    }

    public CaseSubcategoriesResponse getCaseSubcategories(String caseType, String category) {
        Optional<CaseCategoryLOV> caseCategoryLOVOptional = caseCategoryLOVRepository.findByCaseType(caseType);
        List<String> subcategories = new ArrayList<>();
        if (caseCategoryLOVOptional.isPresent()) {
            CaseCategoryLOV cclov = caseCategoryLOVOptional.get();
            String[] subcategoryArray = cclov.getCaseCategories().get(category);
            if (subcategoryArray != null) {
                subcategories.addAll(Arrays.asList(subcategoryArray));
            }
        }
        return new CaseSubcategoriesResponse(subcategories);
    }

    private CaseCategoryLOVResponse convertToResponse(CaseCategoryLOV entity) {
        CaseCategoryLOVResponse response = new CaseCategoryLOVResponse();
        response.setCaseType(entity.getCaseType());
        response.setCaseCategories(Arrays.asList(entity.getCaseCategories().keySet().toArray(new String[0])));
        return response;
    }
}