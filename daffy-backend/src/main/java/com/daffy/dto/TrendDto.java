package com.daffy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TrendDto {
    private Long id;
    private String title;
    private String description;
    private String category;
    private Long posts;
    private Long views;
    private String time;
    private boolean trending;
}