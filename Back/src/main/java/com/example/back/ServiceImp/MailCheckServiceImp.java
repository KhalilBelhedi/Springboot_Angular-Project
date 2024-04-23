package com.example.back.ServiceImp;

import com.example.back.Services.MailCheckService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.mail.SimpleMailMessage;

@Service
@RequiredArgsConstructor
public class MailCheckServiceImp implements MailCheckService {


    private final JavaMailSender mailSender;

    @Override
    public void sendMail(String toEmail, String subject, String body) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("indila205@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);
        mailSender.send(message);
        System.out.println("Mail envoyé avec succées...");


    }
}
