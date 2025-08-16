package com.daffy.controller;

import com.daffy.dto.HashtagDto;
import com.daffy.dto.TrendDto;
import com.daffy.service.TrendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trends")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class TrendController {

    private final TrendService trendService;

    @GetMapping
    public ResponseEntity<List<TrendDto>> getTrendingTopics() {
        log.info("Fetching trending topics");
        List<TrendDto> trends = trendService.getTrendingTopics();
        return ResponseEntity.ok(trends);
    }

    @GetMapping("/hashtags")
    public ResponseEntity<List<HashtagDto>> getTrendingHashtags() {
        log.info("Fetching trending hashtags");
        List<HashtagDto> hashtags = trendService.getTrendingHashtags();
        return ResponseEntity.ok(hashtags);
    }

    @GetMapping("/hashtag/{name}")
    public ResponseEntity<List<TrendDto>> getTrendsByHashtag(@PathVariable String name) {
        log.info("Fetching trends for hashtag: {}", name);
        List<TrendDto> trends = trendService.getTrendsByHashtag(name);
        return ResponseEntity.ok(trends);
    }

    @GetMapping("/search")
    public ResponseEntity<List<TrendDto>> searchTrends(@RequestParam String keyword) {
        log.info("Searching trends with keyword: {}", keyword);
        List<TrendDto> trends = trendService.searchTrends(keyword);
        return ResponseEntity.ok(trends);
    }
}