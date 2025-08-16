package com.daffy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HashtagDto {
    private Long id;
    private String name;
    private Long posts;
    private String trending; // "up", "down", "stable"
    private int usageCount;
    private boolean isPopular;
}