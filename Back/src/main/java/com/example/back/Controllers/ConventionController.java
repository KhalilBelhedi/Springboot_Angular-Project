package com.example.back.Controllers;

import com.example.back.Entities.Convention;
import com.example.back.Repositories.ConventionRepository;
import com.example.back.ServiceImp.ConventionServiceImp;
import com.example.back.Services.ConventionService;
import com.example.back.Services.StageService;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import java.io.ByteArrayOutputStream;



import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/services/convention")
@CrossOrigin(origins = "http://localhost:4200")


public class ConventionController {
    private final ConventionService conventionService ;
    private final StageService stageService;
    private final ConventionRepository conventionRepository;
   // private final ConventionRepository conventionRepository;
    @GetMapping("/getConventionsbyuser/{userId}")
    public List<Convention> getConventionsbyuser(@PathVariable Long userId) {
       return conventionService.retrieveConventionsByUser(userId);
    }
    @GetMapping("/getConventions")
    public Collection<Convention> getConventions(){
        return conventionService.retrieveAllConventionsNonArchivedStage();
    }
    @GetMapping("/getArchivedConventions")
    public Collection<Convention> getArchivedConventions(){
        return conventionService.retrieveAllConventionsArchivedStage();
    }

    @PostMapping("/addConvention")
    public Convention addCenvention(@RequestBody Convention convention){
        return conventionService.addConvention(convention);
    }


    @GetMapping("/getConvention/{id}")
    public Convention getConvention(@PathVariable Long id){
        return conventionService.retrieveConvention(id);
    }

    @PutMapping("/updateConvention")
    public Convention updateConvention(@RequestBody Convention convention){
        return conventionService.updateConvention(convention);
    }

    @PutMapping("/validateConvention/{id}")
    public ResponseEntity<?> validateConvention(@PathVariable Long id) {
        try {

            Convention convention = conventionService.validateConvention(id);

            return ResponseEntity.ok(convention); // Return the updated convention object
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error validating convention: " + e.getMessage());
        }
    }
    @PutMapping ("/archiveConvention/{id}")
    public void archiveConvention(@PathVariable Long id){
        conventionService.archiveConvention(id);
    }

    @PutMapping("/unarchiveConvention/{id}")
    public void unarchiveConvention(@PathVariable Long id){
        conventionService.unarchiveConvention(id);
    }

    @PostMapping("/addConventionAndAffectToUser/{userId}")
    public ResponseEntity<Convention> addConventionAndAssignToUser(@RequestBody Convention convention, @PathVariable Long userId) {
        Convention newConvention = conventionService.addConventionAndAssignToUser(convention, userId);
        return new ResponseEntity<>(newConvention, HttpStatus.CREATED);
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long id) throws DocumentException, IOException {
        Convention convention = conventionRepository.findById(id).orElseThrow();
        byte[] pdfContents = generatePdf(convention);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        String filename = "convention_" + id + ".pdf";
        headers.setContentDispositionFormData(filename, filename);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        return new ResponseEntity<>(pdfContents, headers, HttpStatus.OK);
    }

    private byte[] generatePdf(Convention convention) throws DocumentException, IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, outputStream);
        document.open();
        document.add(new Paragraph("Convention Details"));
        document.add(new Paragraph("Company Name: " + convention.getNomEntreprise()));
        document.add(new Paragraph("Start Date: " + convention.getDateDebut()));
        document.add(new Paragraph("End Date: " + convention.getDateFin()));
        document.add(new Paragraph("Address: " + convention.getAdresse()));
        document.add(new Paragraph("Contact Number: " + convention.getNumTel()));
        document.add(new Paragraph("Supervisor Name: " + convention.getNomEncadrant()));
        document.add(new Paragraph("Supervisor Email: " + convention.getEmailEncadrant()));
        document.close();
        return outputStream.toByteArray();
    }
}
