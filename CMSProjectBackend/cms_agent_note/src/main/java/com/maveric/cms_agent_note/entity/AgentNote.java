package com.maveric.cms_agent_note.entity;

import com.maveric.cms_agent_note.dto.response.CaseDetails;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Agent_Notes")
public class AgentNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noteId;
    @NotNull(message = "caseId not null")
    private Long caseId;
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @NotNull
    private String noteDescription;
    private LocalDateTime createdTime;
    @NotNull
    @Email
    private String noteCreatedBy;
}
