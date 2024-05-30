package com.maveric.cms_agent_note.clients;

import com.maveric.cms_agent_note.dto.response.CaseDetails;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "cms-case-details", url = "http://192.168.97.41:8082")
public interface CaseServiceClient {
    @GetMapping("/case/get/id/{caseId}")
    CaseDetails getCasesByCaseId(@PathVariable("caseId") Long caseId);
}
