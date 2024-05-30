package com.maveric.cms_case_details.service;

import com.maveric.cms_case_details.clients.AgentNoteClient;
import com.maveric.cms_case_details.clients.AuditEventClient;
import com.maveric.cms_case_details.constants.Constants;
import com.maveric.cms_case_details.dto.request.*;
import com.maveric.cms_case_details.dto.response.*;
import com.maveric.cms_case_details.entity.CaseDetails;
import com.maveric.cms_case_details.exception.CaseNotFoundException;
import com.maveric.cms_case_details.repo.CaseRepository;
import com.maveric.cms_case_details.utility.CaseUtility;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.time.LocalDate;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CaseServiceTest {
    @Mock
    private CaseRepository caseRepository;
    @Mock
    private CaseUtility caseUtility;
    @Mock
    private AgentNoteClient agentNoteClient;
    @Mock
    private AuditEventClient auditEventClient;
    @InjectMocks
    private CaseService caseService;

    private static final List<String> ALL_STATUSES = Arrays.asList(
            "open", "under Review", "in Progress", "on Hold",
            "escalated", "closed", "reopened", "cancelled"
    );

    /*
    Test cases for the method => findByCaseId()
    Input parameter: caseId
    Expected output: CasesSearchResponse
    */
    @Nested
    class FindByCaseIdTests {

        /*
         Scenario: When cases exist
         Expected output: CasesSearchResponse
        */
        @Test
        void testFindByCaseId_Exists() {
            Long caseId = 1L;
            CaseDetails caseDetails = new CaseDetails();
            caseDetails.setCaseId(caseId);
            when(caseRepository.findById(caseId)).thenReturn(Optional.of(caseDetails));
            CasesSearchResponse expectedResponse = new CasesSearchResponse();
            when(caseUtility.casesListFrom(caseDetails)).thenReturn(expectedResponse);
            CasesSearchResponse response = caseService.findByCaseId(caseId);
            assertNotNull(response);
            assertEquals(expectedResponse, response);
        }

        /*
         Scenario: When case id not found
         Expected output: CaseNotFoundException
         */
        @Test
        void testFindByCaseId_NotFound() {
            Long caseId = 1L;
            when(caseRepository.findById(caseId)).thenReturn(Optional.empty());
            assertThrows(CaseNotFoundException.class, () -> caseService.findByCaseId(caseId));
        }
    }

    /*
    Test cases for the method =>  listOfCasesByCreatedBy()
    Input parameter: GetByCreatedByRequest requestDTO
    Expected output: List<CasesSearchResponse>
    */
    @Nested
    class ListOfCasesByCreatedByTests {

        /*
         Scenario: When cases exist
         Expected output: List of CasesSearchResponse
         */
        @Test
        void listOfCasesByCreatedBy_Test1() {
            String createdBy = "user123";
            GetByCreatedByRequest requestDTO = new GetByCreatedByRequest(createdBy);
            List<CaseDetails> caseDetailsList = Collections.singletonList(new CaseDetails());
            when(caseRepository.findByCaseOwner(createdBy)).thenReturn(caseDetailsList);
            List<CasesSearchResponse> response = caseService.listOfCasesByCreatedBy(requestDTO);
            assertNotNull(response);
            assertFalse(response.isEmpty());
            assertEquals(1, response.size());
        }

        /*
        Scenario: When cases not found
        Expected output: Throws CaseNotFoundException
        */
        @Test
        void listOfCasesByCreatedBy_Test2() {
            String createdBy = "user123";
            GetByCreatedByRequest requestDTO = new GetByCreatedByRequest(createdBy);
            when(caseRepository.findByCaseOwner(createdBy)).thenReturn(Collections.emptyList());
            CaseNotFoundException exception = assertThrows(CaseNotFoundException.class, () -> caseService.listOfCasesByCreatedBy(requestDTO));
            assertEquals(Constants.caseNotFoundMsg, exception.getMessage());
        }
    }

    /*
    Test cases for the method =>  listOfCasesByCaseType()
    Input parameter: GetByCaseTypeRequest requestDTO
    Expected output: List<CasesSearchResponse>
    */
    @Nested
    class ListOfCasesByCaseTypeTests {

        /*
        Scenario: When cases exist
        Expected output: Returns ListOfCasesSearchResponse
        */
        @Test
        void listOfCasesByCaseType_Test1() {

            String caseType = "type1";
            GetByCaseTypeRequest requestDTO = new GetByCaseTypeRequest(caseType);
            List<CaseDetails> caseDetailsList = Collections.singletonList(new CaseDetails()); // Assuming CaseDetails has necessary fields

            when(caseRepository.findByCaseType(caseType)).thenReturn(caseDetailsList);

            List<CasesSearchResponse> response = caseService.listOfCasesByCaseType(requestDTO);

            assertNotNull(response);
            assertFalse(response.isEmpty());
        }

        /*
        Scenario: When no cases found
        Expected output: Throws CaseNotFoundException
        */
        @Test
        void listOfCasesByCaseType_Test2() {
            String caseType = "type1";
            GetByCaseTypeRequest requestDTO = new GetByCaseTypeRequest(caseType);
            when(caseRepository.findByCaseType(caseType)).thenReturn(Collections.emptyList());

            CaseNotFoundException exception = assertThrows(CaseNotFoundException.class, () -> caseService.listOfCasesByCaseType(requestDTO));
            assertEquals(Constants.caseNotFoundMsg, exception.getMessage());
        }
    }

    /*
    Test cases for the method =>  listOfCasesByCategories()
    Input parameter: GetByCategoryRequest requestDTO
    Expected output: List<CasesSearchResponse>
    */
    @Nested
    class ListOfCasesByCategoriesTests {

        /*
        Scenario: When cases exist
        Expected output: Returns ListOfCasesSearchResponse
        */
        @Test
        void listOfCasesByCategories_Test1() {
            String category = "category1";
            GetByCategoryRequest requestDTO = new GetByCategoryRequest(category);
            List<CaseDetails> caseDetailsList = Collections.singletonList(new CaseDetails());
            when(caseRepository.findByCategory(category)).thenReturn(caseDetailsList);

            List<CasesSearchResponse> response = caseService.listOfCasesByCategories(requestDTO);

            assertNotNull(response);
            assertFalse(response.isEmpty());
        }

        /*
        Scenario: When no cases found
        Expected output: Throws CaseNotFoundException
        */
        @Test
        void listOfCasesByCategories_Test2() {
            String category = "category1";
            GetByCategoryRequest requestDTO = new GetByCategoryRequest(category);
            when(caseRepository.findByCategory(category)).thenReturn(Collections.emptyList());

            CaseNotFoundException exception = assertThrows(CaseNotFoundException.class, () -> caseService.listOfCasesByCategories(requestDTO));
            assertEquals(Constants.caseNotFoundMsg, exception.getMessage());
        }

    }

    /*
    Test cases for the method =>  listOfCasesBySubCategories()
    Input parameter: GetBySubcategoryRequest requestDTO
    Expected output: List<CasesSearchResponse>
    */
    @Nested
    class ListOfCasesBySubCategoriesTests {

        /*
        Scenario: When cases exist
        Expected output: Returns ListOfCasesSearchResponse
        */
        @Test
        void listOfCasesBySubCategories_Test1() {
            String subCategory = "subCategory1";
            GetBySubcategoryRequest requestDTO = new GetBySubcategoryRequest(subCategory);
            List<CaseDetails> caseDetailsList = Collections.singletonList(new CaseDetails());
            when(caseRepository.findBySubCategory(subCategory)).thenReturn(caseDetailsList);
            // Mock any necessary behavior for caseUtils.casesListFrom()

            List<CasesSearchResponse> response = caseService.listOfCasesBySubCategories(requestDTO);

            assertNotNull(response);
            assertFalse(response.isEmpty());
        }

        /*
        Scenario: When no cases found
        Expected output: Throws CaseNotFoundException
        */
        @Test
        void listOfCasesBySubCategories_Test2() {
            String subCategory = "subCategory1";
            GetBySubcategoryRequest requestDTO = new GetBySubcategoryRequest(subCategory);
            when(caseRepository.findBySubCategory(subCategory)).thenReturn(Collections.emptyList());

            CaseNotFoundException exception = assertThrows(CaseNotFoundException.class, () -> caseService.listOfCasesBySubCategories(requestDTO));
            assertEquals(Constants.caseNotFoundMsg, exception.getMessage());
        }
    }

    /*
    Test cases for the method =>  getCaseStatusCount()
    Input parameter: (LocalDate startDate, LocalDate endDate)
    Expected output: Map<String, Long>
    */
    @Nested
    class StatusCountTests {

        /*
        Scenario: When case details found
        Expected output: Status Count Map for open and closed for a particular date range.
        */
        @Test
        void getCaseStatusCountForDateRange_test1() {
            LocalDate startDate = LocalDate.of(2024, 1, 1);
            LocalDate endDate = LocalDate.of(2024, 1, 31);
            List<CaseDetails> caseDetailsList = Arrays.asList(
                    new CaseDetails(1L, 1001L, "Type", "Category", "Subcategory", "open", startDate, "Owner", "Description"),
                    new CaseDetails(2L, 1002L, "Type", "Category", "Subcategory", "closed", endDate, "Owner", "Description"),
                    new CaseDetails(3L, 1003L, "Type", "Category", "Subcategory", "open", startDate, "Owner", "Description")
            );
            when(caseRepository.findAllByCreatedDateBetween(startDate, endDate)).thenReturn(caseDetailsList);

            Map<String, Long> result = caseService.getCaseStatusCountForDateRange(new CaseRequest("01/01/2024", "31/01/2024"));

            assertEquals(2, result.get("open"));
            assertEquals(1, result.get("closed"));
        }

        /*
        Scenario: When case details found
        Expected output: Status Count Map for different status for a particular date range.
        */
        @Test
        void getAllCaseStatus_test1() {
            List<CaseDetails> caseDetailsList = Arrays.asList(
                    new CaseDetails(1L, 1001L, "Type", "Category", "Subcategory", "open", LocalDate.now(), "johnsmith@gmail.com", "Description1"),
                    new CaseDetails(2L, 1002L, "Type", "Category", "Subcategory", "closed", LocalDate.now(), "johnDoe@gmail.com", "Description2"),
                    new CaseDetails(3L, 1003L, "Type", "Category", "Subcategory", "open", LocalDate.now(), "johnDoe@gmail.com", "Description3"),
                    new CaseDetails(4L, 1003L, "Type", "Category", "Subcategory", "escalated", LocalDate.now(), "johnDoe@gmail.com", "Description3")

            );
            when(caseRepository.findAll()).thenReturn(caseDetailsList);

            Map<String, Long> result = caseService.getAllCaseStatus();
            assertEquals(2, result.get("open"));
            assertEquals(1, result.get("closed"));
            assertEquals(1, result.get("escalated"));
        }

        /*
        Scenario: Get case status for a date range when case details not found
        Expected output: Status Count is 0
        */
        @Test
        void getCaseStatusCountForDateRange_test2() {
            LocalDate startDate = LocalDate.of(2024, 1, 1);
            LocalDate endDate = LocalDate.of(2024, 1, 31);
            when(caseRepository.findAllByCreatedDateBetween(startDate, endDate)).thenReturn(Collections.emptyList());

            Map<String, Long> result = caseService.getCaseStatusCountForDateRange(new CaseRequest("01/01/2024", "31/01/2024"));

           Map<String, Long> expected = new HashMap<>();
            for (String status : ALL_STATUSES) {
                expected.put(status, 0L);
            }
            assertEquals(expected, result);
        }

        /*
        Scenario: Get all case status when no cases found
        Expected output: Status Count is 0
        */
        @Test
        void getAllCaseStatus_test2() {
            when(caseRepository.findAll()).thenReturn(Collections.emptyList());

            Map<String, Long> result = caseService.getAllCaseStatus();

            Map<String, Long> expected = new HashMap<>();
            for (String status : ALL_STATUSES) {
                expected.put(status, 0L);
            }
            assertEquals(expected, result);
        }

        /*
        Scenario: Get all case status when cases exist
        Expected output: Map with for each status
        */
        @Test
        void getAllCaseStatus_test3() {
            List<CaseDetails> caseDetailsList = Arrays.asList(
                    new CaseDetails(1L, 1001L, "Type1", "Category1", "Subcategory1", "open", LocalDate.now(), "johndoe@gmail.com", "Description"),
                    new CaseDetails(2L, 1002L, "Type1", "Category2", "Subcategory1", "closed", LocalDate.now(), "johndoe@gmail.com", "Description"),
                    new CaseDetails(3L, 1003L, "Type2", "Category1", "Subcategory1", "open", LocalDate.now(), "johndoe@gmail.com", "Description"),
                    new CaseDetails(4L, 1004L, "Type2", "Category2", "Subcategory1", "under Review", LocalDate.now(), "johndoe@gmail.com", "Description"),
                    new CaseDetails(5L, 1005L, "Type3", "Category1", "Subcategory1", "escalated", LocalDate.now(), "johndoe@gmail.com", "Description")
            );
            when(caseRepository.findAll()).thenReturn(caseDetailsList);

            Map<String, Long> result = caseService.getAllCaseStatus();

            assertEquals(2, result.get("open"));
            assertEquals(1, result.get("closed"));
            assertEquals(1, result.get("under Review"));
            assertEquals(1, result.get("escalated"));
        }
    }

    /*
    Test cases for the method =>  createCase()
    Input parameter: CreateCaseRequest requestDTO
    Expected output: CaseResponse
    */
    @Nested
    class CreateCaseTests {

        /*
        Scenario: Create a new case
        Expected output: Case created and saved to db.
        */
        @Test
         void createCase_test1() {
            LocalDate currentDate = LocalDate.now();
            LocalDate createdDate = LocalDate.of(2023, 5, 10);
            CreateCaseRequest createCaseRequest = new CreateCaseRequest(123L,"Type1", "Category1","Open","johndoe@gmail.com","SubCategory1","Agent Note: Created case","Description for case","John","Doe");
            CaseDetails caseDetails = new CaseDetails();
            CaseDetails savedCaseDetails = new CaseDetails(100000L, 456L,"Type1", "Category1", "Subcategory1", "Open", currentDate,"johndoe@gmail.com","Description for case");
            CaseResponse expectedResponse = new CaseResponse(100000L,456L,"Type1","Category1","Subcategory1", "Open", currentDate,"johndoe@gmail.com","Description for case");

            when(caseUtility.from(createCaseRequest)).thenReturn(caseDetails);
            when(caseRepository.save(caseDetails)).thenReturn(savedCaseDetails);
            when(caseUtility.from(savedCaseDetails)).thenReturn(expectedResponse);

            CaseResponse actualResponse = caseService.createCase(createCaseRequest);

            assertEquals(expectedResponse, actualResponse);
            assertEquals(currentDate, caseDetails.getCreatedDate());
            verify(caseRepository, times(1)).save(caseDetails);
            verifyNoMoreInteractions(caseRepository);
            verify(caseUtility, times(1)).from(createCaseRequest);
            verify(caseUtility, times(1)).from(savedCaseDetails);
            verifyNoMoreInteractions(caseUtility);
        }

    }

    /*
    Test cases for the method =>  updateCase()
    Input parameter: UpdateCaseRequest requestDTO
    Expected output: CaseResponse
    */
    @Nested
     class UpdateCaseTests{

//        /*
//        Scenario: Update case details
//        Expected output: Case updated and saved to db.
//        */
//        @Test
//         void testUpdateCase_Successful() {
//
//            UpdateCaseRequest updateCaseRequest = UpdateCaseRequest.builder()
//                    .caseId(123L)
//                    .customerId(456L)
//                    .caseType("Type")
//                    .status("Status")
//                    .category("Category")
//                    .caseOwner("janedoe@gmail.com")
//                    .createdOn("2024-02-14")
//                    .subCategory("Subcategory")
//                    .description("Updated Description")
//                    .firstName("John")
//                    .lastName("Doe")
//                    .build();
//            System.out.println(updateCaseRequest);
//
//            CaseDetails caseDetails = CaseDetails.builder()
//                    .caseId(123L)
//                    .customerId(456L)
//                    .caseType("Type")
//                    .category("Category")
//                    .subCategory("Subcategory")
//                    .status("Status")
//                    .createdDate(LocalDate.parse("2024-02-14"))
//                    .caseOwner("janedoe@gmail.com")
//                    .description("Description")
//                    .build();
//            System.out.println(caseDetails);
//
//            LocalDate createdOn = LocalDate.parse("2024-02-14");
//            System.out.println(createdOn);
//
//            when(caseUtility.toLocalDate(updateCaseRequest.getCreatedOn())).thenReturn(createdOn);
//            when(caseUtility.from(updateCaseRequest)).thenReturn(caseDetails);
//            when(caseRepository.findById(eq(updateCaseRequest.getCaseId()))).thenReturn(Optional.ofNullable(caseDetails));
//
//            CaseResponse result = caseService.updateCase(updateCaseRequest);
//            System.out.println(result);
//
//            assertNotNull(result);
//
//        }
//
//        @Test
//        void testUpdateCase_CaseNotFoundException() {
//            UpdateCaseRequest updateCaseRequest = UpdateCaseRequest.builder()
//                    .caseId(123L)
//                    .customerId(456L)
//                    .caseType("Type")
//                    .status("Status")
//                    .category("Category")
//                    .caseOwner("Owner")
//                    .createdOn("2024-02-14")
//                    .subCategory("Subcategory")
//                    .description("Description")
//                    .firstName("John")
//                    .lastName("Doe")
//                    .build();
//            System.out.println(updateCaseRequest);
//
//            when(caseRepository.findById(updateCaseRequest.getCaseId())).thenReturn(Optional.empty());
//
//            assertThrows(CaseNotFoundException.class, () -> caseService.updateCase(updateCaseRequest));
//        }

        @Test
        void testUpdateCase_AuditEventClientError() {
            UpdateCaseRequest updateCaseRequest = UpdateCaseRequest.builder()
                    .caseId(123L)
                    .customerId(456L)
                    .caseType("Type")
                    .status("Status")
                    .category("Category")
                    .caseOwner("Owner")
                    .createdDate("2024-02-14")
                    .subCategory("Subcategory")
                    .description("Description")
                    .firstName("John")
                    .lastName("Doe")
                    .build();

            CaseDetails caseDetails = CaseDetails.builder()
                    .caseId(123L)
                    .customerId(456L)
                    .caseType("Type")
                    .category("Category")
                    .subCategory("Subcategory")
                    .status("Status")
                    .createdDate(LocalDate.parse("2024-02-14"))
                    .caseOwner("Owner")
                    .description("Description")
                    .build();

            LocalDate createdOn = LocalDate.parse("2024-02-14");

            when(caseUtility.toLocalDate(updateCaseRequest.getCreatedDate())).thenReturn(createdOn);
            when(caseUtility.from(updateCaseRequest)).thenReturn(caseDetails);
            when(caseRepository.findById(updateCaseRequest.getCaseId())).thenReturn(Optional.of(caseDetails));
            doThrow(new RuntimeException("Some error occurred. Please try again...")).when(auditEventClient).register(any());

            assertThrows(RuntimeException.class, () -> caseService.updateCase(updateCaseRequest));
        }
    }

    /*
    Test cases for the method =>  getCasesPaged()
    Input parameter: GetCasesPaginationRequest requestDTO
    Expected output: GetAllCases<CasesListResponse>
    */
    @Nested
    class getCasesPagedTest {

        @Test
        public void GetCasesPaged_test1() {
            GetCasesPaginationRequest request = new GetCasesPaginationRequest(10, 1);
            Pageable pageable = PageRequest.of(0, 10);
            List<CaseDetails> caseDetailsList = Collections.singletonList(
                    CaseDetails.builder()
                            .caseId(1L)
                            .customerId(1001L)
                            .caseType("Type1")
                            .category("Category1")
                            .subCategory("Subcategory1")
                            .status("Open")
                            .createdDate(LocalDate.now())
                            .caseOwner("johndoe@gmail.com")
                            .description("Case description")
                            .build()
            );
            Page<CaseDetails> casesPage = new PageImpl<>(caseDetailsList, pageable, 1);

            when(caseRepository.findAll(pageable)).thenReturn(casesPage);
            when(caseUtility.listFrom(any(CaseDetails.class))).thenReturn(new CasesListResponse(/* provide necessary arguments */));

            GetAllCases<CasesListResponse> response = caseService.getCasesPaged(request);

            assertEquals(1, response.getContent().size());
            assertEquals(1, response.getCurrentPage());
            assertEquals(1, response.getTotalItems());
            assertEquals(1, response.getTotalPages());
            verify(caseRepository, times(1)).findAll(pageable);
            verify(caseUtility, times(1)).listFrom(any(CaseDetails.class));
            verifyNoMoreInteractions(caseRepository);
            verifyNoMoreInteractions(caseUtility);
        }



        @Test
        public void testGetCasesPaged_test2() {
            GetCasesPaginationRequest request = new GetCasesPaginationRequest();
            request.setCurrentPage(1);
            request.setRecordsPerPage(10);

            Page<CaseDetails> emptyPage = mock(Page.class);
            when(emptyPage.isEmpty()).thenReturn(true);
            when(caseRepository.findAll(any(Pageable.class))).thenReturn(emptyPage);

            assertThrows(CaseNotFoundException.class, () -> {
                caseService.getCasesPaged(request);
            });
        }

    }

}