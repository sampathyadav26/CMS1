package com.maveric.cms_case_details.clients;

import com.maveric.cms_case_details.dto.request.AuditEventRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "cms-audit-event", url = "http://192.168.97.41:8092")
public interface AuditEventClient{
    @GetMapping("/auditevent/register")
    void register(AuditEventRequest audit);
}
