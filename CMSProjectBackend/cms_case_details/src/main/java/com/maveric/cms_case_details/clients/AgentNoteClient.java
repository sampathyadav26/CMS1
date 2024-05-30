package com.maveric.cms_case_details.clients;

import com.maveric.cms_case_details.dto.request.AgentNoteRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "cms-agent-note", url = "http://192.168.97.41:8083")
public interface AgentNoteClient {
    @PostMapping("/agentnote/register")
    void registerAgentNote(AgentNoteRequest agentNote);
}
