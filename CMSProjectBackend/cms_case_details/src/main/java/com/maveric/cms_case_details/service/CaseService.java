package com.maveric.cms_case_details.service;

import com.maveric.cms_case_details.clients.AgentNoteClient;
import com.maveric.cms_case_details.clients.AuditEventClient;
import com.maveric.cms_case_details.constants.Constants;
import com.maveric.cms_case_details.dto.request.CaseRequest;
import com.maveric.cms_case_details.dto.request.*;
import com.maveric.cms_case_details.dto.response.CaseResponse;
import com.maveric.cms_case_details.dto.response.CasesListResponse;
import com.maveric.cms_case_details.dto.response.CasesSearchResponse;
import com.maveric.cms_case_details.dto.response.GetAllCases;
import com.maveric.cms_case_details.entity.CaseDetails;
import com.maveric.cms_case_details.exception.CaseNotFoundException;
import com.maveric.cms_case_details.repo.CaseRepository;
import com.maveric.cms_case_details.utility.CaseUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class CaseService {
    @Autowired
    private CaseRepository caseRepository;
    @Autowired
    private CaseUtility caseUtils;
    @Autowired
    private AgentNoteClient agentNoteClient;
    @Autowired
    private AuditEventClient auditEventClient;
    private static final List<String> ALL_STATUSES = Arrays.asList(
            "open", "under Review", "in Progress", "on Hold",
            "escalated", "closed", "reopened", "cancelled"
    );

    public CasesSearchResponse findByCaseId(Long caseId) {
        Optional<CaseDetails> caseDetails = caseRepository.findById(caseId);
        if (caseDetails.isEmpty()) {

            throw new CaseNotFoundException( Constants.caseNotFoundMsg);
        }
        return caseUtils.casesListFrom(caseDetails.get());
    }

    public CaseResponse createCase(CreateCaseRequest caseDetails) {
        LocalDate createdOn = LocalDate.now();
        CaseDetails caseDetail = caseUtils.from(caseDetails);
        caseDetail.setCreatedDate(createdOn);
        CaseDetails caseDetailSaved = caseRepository.save(caseDetail);

        AgentNoteRequest agentNote = AgentNoteRequest.builder()
                .caseId(caseDetailSaved.getCaseId())
                .createdBy(caseDetails.getCaseOwner())
                .note(caseDetails.getAgentNote())
                .firstName(caseDetails.getFirstName())
                .lastName(caseDetails.getLastName())
                .build();

        AuditEventRequest audit = AuditEventRequest.builder()
                .caseId(caseDetailSaved.getCaseId())
                .firstName(caseDetails.getFirstName())
                .lastName(caseDetails.getLastName())
                .description("Case created with Case ID "+ caseDetailSaved.getCaseId())
                .createdBy(caseDetails.getCaseOwner())
                .build();


        auditEventClient.register(audit);
        agentNoteClient.registerAgentNote(agentNote);

        return caseUtils.from(caseDetailSaved);
    }

    public CaseResponse updateCase(UpdateCaseRequest updateCase){
        LocalDate createdOn = caseUtils.toLocalDate(updateCase.getCreatedDate());
        CaseDetails caseDetailUpdated = caseUtils.from(updateCase);
        caseDetailUpdated.setCreatedDate(createdOn);
        Optional<CaseDetails> caseDetails = caseRepository.findById(updateCase.getCaseId());
        if (caseDetails.isEmpty()) {

            throw new CaseNotFoundException(Constants.caseNotFoundMsg);
        }

        String message = "";

        if(!updateCase.getCaseType().equals(caseDetails.get().getCaseType())){
            message += "Updated Type from "+caseDetails.get().getCaseType() +" to "+ updateCase.getCaseType()+". ";
        }
        if(!updateCase.getCategory().equals(caseDetails.get().getCategory())){
            message += "Updated Category from "+caseDetails.get().getCategory() +" to "+ updateCase.getCategory()+". ";
        }
        if(!updateCase.getSubCategory().equals(caseDetails.get().getSubCategory())){
            message += "Updated Subcategory from "+caseDetails.get().getSubCategory() +" to "+ updateCase.getSubCategory()+". ";
        }
        if(!updateCase.getStatus().equals(caseDetails.get().getStatus())){
            message += "Updated Status from "+caseDetails.get().getStatus() +" to "+ updateCase.getStatus()+". ";
        }
        if(!updateCase.getCaseOwner().equals(caseDetails.get().getCaseOwner())){
            message += "Updated Owner from "+caseDetails.get().getCaseOwner() +" to "+ updateCase.getCaseOwner()+". ";
        }
        if(!updateCase.getDescription().equals(caseDetails.get().getDescription())){
            message += "Updated Description from "+caseDetails.get().getDescription() +" to "+ updateCase.getDescription()+". ";
        }

        caseRepository.save(caseDetailUpdated);

        AuditEventRequest audit = AuditEventRequest.builder()
                .caseId(updateCase.getCaseId())
                .firstName(updateCase.getFirstName())
                .lastName(updateCase.getLastName())
                .description(message)
                .createdBy(updateCase.getCaseOwner())
                .build();

        try {
            auditEventClient.register(audit);
        } catch (Exception e) {
            throw new RuntimeException("Some error occurred. Please try again...");
        }

        return caseUtils.from(caseDetailUpdated);
    }

    public List<CasesSearchResponse> listOfCasesByCreatedBy(GetByCreatedByRequest requestDTO) {
        List<CaseDetails> caseDetailsList = caseRepository.findByCaseOwner(requestDTO.getCreatedBy());
        if (caseDetailsList.isEmpty()) {

            throw new CaseNotFoundException(Constants.caseNotFoundMsg);
        }
        return caseDetailsList.stream()
                .map(caseUtils::casesListFrom)
                .collect(Collectors.toList());
    }

    public List<CasesSearchResponse> listOfCasesByCaseType(GetByCaseTypeRequest requestDTO) {
        List<CaseDetails> caseDetailsList = caseRepository.findByCaseType(requestDTO.getCaseType());
        if (caseDetailsList.isEmpty()) {

            throw new CaseNotFoundException(Constants.caseNotFoundMsg);
        }
        return caseDetailsList.stream()
                .map(caseUtils::casesListFrom)
                .collect(Collectors.toList());
    }

    public List<CasesSearchResponse> listOfCasesByCategories(GetByCategoryRequest requestDTO) {
        List<CaseDetails> caseDetailsList = caseRepository.findByCategory(requestDTO.getCategory());
        if (caseDetailsList.isEmpty()) {

            throw new CaseNotFoundException(Constants.caseNotFoundMsg);
        }
        return caseDetailsList.stream()
                .map(caseUtils::casesListFrom)
                .collect(Collectors.toList());
    }

    public List<CasesSearchResponse> listOfCasesBySubCategories(GetBySubcategoryRequest requestDTO) {
        List<CaseDetails> caseDetailsList = caseRepository.findBySubCategory(requestDTO.getSubCategory());
        if (caseDetailsList.isEmpty()) {

            throw new CaseNotFoundException(Constants.caseNotFoundMsg);
        }
        return caseDetailsList.stream()
                .map(caseUtils::casesListFrom)
                .collect(Collectors.toList());
    }

    public CasesSearchResponse listOfCasesByCaseId(GetByCaseIdRequest requestDTO) {
        Optional<CaseDetails> caseDetails = caseRepository.findById(requestDTO.getCaseId());
        if (caseDetails.isEmpty()) {

            throw new CaseNotFoundException(Constants.caseNotFoundMsg);
        }
        return caseUtils.casesListFrom(caseDetails.get());
    }

    public GetAllCases<CasesListResponse> getCasesPaged(GetCasesPaginationRequest request) {
        Pageable pageable = PageRequest.of(request.getCurrentPage()-1, request.getRecordsPerPage());

        Page<CaseDetails> casesPage = caseRepository.findAll(pageable);

        if (casesPage.isEmpty()) {
            throw new CaseNotFoundException(Constants.caseNotFoundMsg);
        }

        List<CasesListResponse> list = casesPage.stream()
                .map(caseUtils::listFrom)
                .collect(Collectors.toList());

        GetAllCases<CasesListResponse> response = new GetAllCases<>();
        response.setContent(list);
        response.setCurrentPage(casesPage.getNumber()+1);
        response.setTotalItems(casesPage.getTotalElements());
        response.setTotalPages(casesPage.getTotalPages());

        return response;
    }


    private Map<String, Long> getCaseStatusCount(LocalDate startDate, LocalDate endDate) {
        List<CaseDetails> caseDetailsList = caseRepository.findAllByCreatedDateBetween(startDate, endDate);
        if (caseDetailsList.isEmpty()){
            return ALL_STATUSES.stream()
                    .collect(Collectors.toMap(
                            status -> status,
                            status -> caseDetailsList.stream()
                                    .filter(caseDetails -> status.equalsIgnoreCase(caseDetails.getStatus()))
                                    .count()
                    ));
        }
        return ALL_STATUSES.stream()
                .collect(Collectors.toMap(
                        status -> status,
                        status -> caseDetailsList.stream()
                                .filter(caseDetails -> status.equalsIgnoreCase(caseDetails.getStatus()))
                                .count()
                ));
    }

    public Map<String, Long> getCaseStatusCountForDateRange(CaseRequest request) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate startDate = LocalDate.parse(request.getStartDate(), formatter);
        LocalDate endDate = LocalDate.parse(request.getEndDate(),formatter);
        return getCaseStatusCount(startDate, endDate);
    }

    public Map<String, Long> getAllCaseStatus() {
        List<CaseDetails> caseDetailsList = caseRepository.findAll();
        if (caseDetailsList.isEmpty()){
            return ALL_STATUSES.stream()
                    .collect(Collectors.toMap(
                            status -> status,
                            status -> caseDetailsList.stream()
                                    .filter(caseDetails -> status.equalsIgnoreCase(caseDetails.getStatus()))
                                    .count()
                    ));
        }
        return ALL_STATUSES.stream()
                .collect(Collectors.toMap(
                        status -> status,
                        status -> caseDetailsList.stream()
                                .filter(caseDetails -> status.equalsIgnoreCase(caseDetails.getStatus()))
                                .count()
                ));
    }

    public GetAllCases<CasesSearchResponse> filterCases(FilterCaseRequest filterCase) {
        List<CaseDetails> caseDetailsList = caseRepository.findAll();

        if (filterCase.getCaseId() != null ) {
            caseDetailsList = filterCasesWithCaseId(filterCase.getCaseId());
        }

        if (filterCase.getStatus() != null && !filterCase.getStatus().isEmpty()) {
            caseDetailsList = filterCasesByStatus(filterCase.getStatus(), caseDetailsList);
        }

        if (filterCase.getRequestType() != null && !filterCase.getRequestType().isEmpty()) {
            caseDetailsList = filterCasesByType(filterCase.getRequestType(), caseDetailsList);
        }

        if (filterCase.getCategory() != null && !filterCase.getCategory().isEmpty()) {
            caseDetailsList = filterCasesByCategory(filterCase.getCategory(), caseDetailsList);
        }

        if (filterCase.getSubCategory() != null && !filterCase.getSubCategory().isEmpty()) {
            caseDetailsList = filterCasesBySubCategory(filterCase.getSubCategory(), caseDetailsList);
        }

        if (filterCase.getCaseOwner() != null && !filterCase.getCaseOwner().isEmpty()) {
            caseDetailsList = filterCasesByCaseOwner(filterCase.getCaseOwner(), caseDetailsList);
        }

        if (filterCase.getCreatedOn() != null && !filterCase.getCreatedOn().isEmpty() && !caseDetailsList.isEmpty()) {
            String startDateStr = filterCase.getCreatedOn().get(0);
            String endDateStr = filterCase.getCreatedOn().get(1);
            if (!startDateStr.isEmpty() && !endDateStr.isEmpty()) {
                caseDetailsList = filterCaseByDate(startDateStr, endDateStr, caseDetailsList);
            }
        }

        if (caseDetailsList.isEmpty()) {
            throw new CaseNotFoundException("No cases found!");
        }

        /**** Pagination ****/
        List<CaseDetails> paginatedList;
        int start = (filterCase.getCurrentPage() - 1) * filterCase.getRecordsPerPage();
        int end = Math.min(start + filterCase.getRecordsPerPage(), caseDetailsList.size());
        paginatedList = caseDetailsList.subList(start, end);


        List<CasesSearchResponse> casesSearchResponses = paginatedList.stream()
                .map(caseUtils::casesListFrom)
                .collect(Collectors.toList());

        GetAllCases<CasesSearchResponse> response = new GetAllCases<>();
        response.setContent(casesSearchResponses);
        response.setCurrentPage(filterCase.getCurrentPage());
        response.setTotalItems(caseDetailsList.size());
        response.setTotalPages((int) Math.ceil((double) caseDetailsList.size() / filterCase.getRecordsPerPage()));

        return response;
    }

    private List<CaseDetails> filterCasesWithCaseId(Long caseId) {
        String caseIdAsString = String.valueOf(caseId);
        if(caseIdAsString.isEmpty()||caseIdAsString==null)
            return caseRepository.findAll();
        return caseRepository.findByCaseIdStartingWith(caseIdAsString);
    }

    private List<CaseDetails> filterCasesByType(List<String> caseTypes, List<CaseDetails> caseDetailsList) {
        return caseDetailsList.stream()
                .filter(caseDetails -> caseTypes.contains(caseDetails.getCaseType()))
                .collect(Collectors.toList());
    }

    private List<CaseDetails> filterCasesByCategory(List<String> categories, List<CaseDetails> caseDetailsList) {
        return caseDetailsList.stream()
                .filter(caseDetails -> categories.contains(caseDetails.getCategory()))
                .collect(Collectors.toList());
    }

    private List<CaseDetails> filterCasesBySubCategory(List<String> subCategories, List<CaseDetails> caseDetailsList) {
        return caseDetailsList.stream()
                .filter(caseDetails -> subCategories.contains(caseDetails.getSubCategory()))
                .collect(Collectors.toList());
    }

    private List<CaseDetails> filterCasesByCaseOwner(List<String> caseOwner, List<CaseDetails> caseDetailsList) {
        return caseDetailsList.stream()
                .filter(caseDetails -> caseOwner.contains(caseDetails.getCaseOwner().toLowerCase()))
                .collect(Collectors.toList());
    }

    private List<CaseDetails> filterCasesByStatus(List<String> caseStatus, List<CaseDetails> caseDetailsList) {
        return caseDetailsList.stream()
                .filter(caseDetails -> caseStatus.contains(caseDetails.getStatus()))
                .collect(Collectors.toList());
    }

    private List<CaseDetails> filterCaseByDate(String startDateStr, String endDateStr, List<CaseDetails> caseDetailsList) {
        LocalDate startDate = LocalDate.parse(startDateStr, DateTimeFormatter.ISO_LOCAL_DATE);
        LocalDate endDate = LocalDate.parse(endDateStr, DateTimeFormatter.ISO_LOCAL_DATE);

        return caseDetailsList.stream()
                .filter(caseDetails -> {
                    LocalDate createdDate = caseDetails.getCreatedDate();
                    return createdDate != null && !createdDate.isBefore(startDate) && !createdDate.isAfter(endDate);
                })
                .collect(Collectors.toList());
    }



}