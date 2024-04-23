package com.example.back.Entities;

import lombok.Data;

@Data
public class Res {
    private int status;
    private String message;
    private String url;
}