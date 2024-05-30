package com.maveric.cms_case_details.service;

import static org.junit.jupiter.api.Assertions.*;

import com.maveric.cms_case_details.dto.request.AddCaseCategoryRequest;
import com.maveric.cms_case_details.dto.response.CaseCategoryLOVResponse;
import com.maveric.cms_case_details.dto.response.CaseCategoriesResponse;
import com.maveric.cms_case_details.dto.response.CaseSubcategoriesResponse;
import com.maveric.cms_case_details.dto.response.CaseTypeLOVResponse;
import com.maveric.cms_case_details.dto.response.CaseTypesResponse;
import com.maveric.cms_case_details.entity.CaseCategoryLOV;
import com.maveric.cms_case_details.repo.CaseCategoryLOVRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CaseCategoryLOVServiceTest {

    @Mock
    private CaseCategoryLOVRepository repository;

    @InjectMocks
    private CaseCategoryLOVService service;

    @Test
    void testAddCaseCategoryLOV() {
        AddCaseCategoryRequest request = new AddCaseCategoryRequest();
        request.setCaseType("Inbox");
        request.setCaseCategories(new HashMap<>());

        CaseCategoryLOV savedEntity = CaseCategoryLOV.builder()
                .caseType(request.getCaseType())
                .caseCategories(request.getCaseCategories())
                .build();

        when(repository.save(any())).thenReturn(savedEntity);

        CaseCategoryLOVResponse response = service.addCaseCategoryLOV(request);

        assertNotNull(response);
        assertEquals("Inbox", response.getCaseType());
        assertEquals(0, response.getCaseCategories().size());
    }

    @Test
    void testGetAllCaseCategoryLOVs() {
        List<CaseCategoryLOV> entities = new ArrayList<>();
        CaseCategoryLOV entity = new CaseCategoryLOV();
        entity.setCaseType("Inbox");
        entity.setCaseCategories(new HashMap<>());
        entities.add(entity);

        when(repository.findAll()).thenReturn(entities);

        CaseTypeLOVResponse response = service.getAllCaseCategoryLOVs();

        assertNotNull(response);
        assertEquals(1, response.getCaseTypeLOV().size());
        assertTrue(response.getCaseTypeLOV().containsKey("Inbox"));
    }

    @Test
    public void testGetCaseTypes() {
        List<CaseCategoryLOV> caseCategoryLOVs = Arrays.asList(
                new CaseCategoryLOV(1L, "CaseType1", Collections.emptyMap()),
                new CaseCategoryLOV(2L, "CaseType2", Collections.emptyMap())
        );
        when(repository.findAll()).thenReturn(caseCategoryLOVs);

        List<String> expectedCaseTypes = Arrays.asList("CaseType1", "CaseType2");
        CaseTypesResponse actualCaseTypes = service.getCaseTypes();

        assertEquals(expectedCaseTypes, actualCaseTypes.getCaseTypes());
    }

    @Test
    public void testGetCaseCategories() {
        String caseType = "CaseType1";
        Map<String, String[]> categoriesMap = new HashMap<>();
        categoriesMap.put("Category1", new String[]{"SubCategory1", "SubCategory2"});
        CaseCategoryLOV caseCategoryLOV = new CaseCategoryLOV(1L, caseType, categoriesMap);
        Optional<CaseCategoryLOV> optionalCaseCategoryLOV = Optional.of(caseCategoryLOV);
        when(repository.findByCaseType(caseType)).thenReturn(optionalCaseCategoryLOV);

        List<String> expectedCategories = Collections.singletonList("Category1");
        CaseCategoriesResponse actualCategories = service.getCaseCategories(caseType);

        assertEquals(expectedCategories, actualCategories.getCategories());
    }

    @Test
    public void testGetCaseSubcategories() {
        String caseType = "CaseType1";
        String category = "Category1";
        Map<String, String[]> categoriesMap = new HashMap<>();
        categoriesMap.put(category, new String[]{"SubCategory1", "SubCategory2"});
        CaseCategoryLOV caseCategoryLOV = new CaseCategoryLOV(1L, caseType, categoriesMap);
        Optional<CaseCategoryLOV> optionalCaseCategoryLOV = Optional.of(caseCategoryLOV);
        when(repository.findByCaseType(caseType)).thenReturn(optionalCaseCategoryLOV);

        List<String> expectedSubcategories = Arrays.asList("SubCategory1", "SubCategory2");
        CaseSubcategoriesResponse actualSubcategories = service.getCaseSubcategories(caseType, category);

        assertEquals(expectedSubcategories, actualSubcategories.getSubcategories());
    }

}
