package com.example.back.ServiceImp;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@Service
public class PerspectiveService {

    @Value("${perspective.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String analyzeText(String text) {
        String url = "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=" + apiKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestBody = String.format(
                "{" +
                        "  \"comment\": { \"text\": \"%s\" }," +
                        "  \"languages\": [\"en\", \"fr\", \"ar\"]," + // Include English, French, and Arabic
                        "  \"requestedAttributes\": {" +
                        "    \"TOXICITY\": {}," +
                        "    \"INSULT\": {}," +
                        "    \"PROFANITY\": {}" + // Add two additional attributes
                        "  }" +
                        "}", text);

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        return restTemplate.postForObject(url, request, String.class);
    }
}