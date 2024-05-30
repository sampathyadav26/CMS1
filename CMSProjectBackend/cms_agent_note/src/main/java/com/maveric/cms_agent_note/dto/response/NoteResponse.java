package com.maveric.cms_agent_note.dto.response;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NoteResponse {
    private String noteDescription;
    private LocalDateTime createdTime;
    private String lastName;
    private String firstName;
}