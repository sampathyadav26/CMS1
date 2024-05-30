package com.maveric.cms_agent_note.clients;

import com.maveric.cms_agent_note.dto.request.AuditEventRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "cms-audit-event" ,url = "http://192.168.97.41:8092")
public interface AuditEventClient{
    @PostMapping("/auditevent/register")
    void register(AuditEventRequest audit);
}
