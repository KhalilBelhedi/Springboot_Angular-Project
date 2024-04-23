package com.example.back.Controllers;


import com.example.back.Entities.Enums.Typefile;
import com.example.back.Entities.File;
import com.example.back.Repositories.FileRepository;
import com.example.back.Services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.back.Entities.Res;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@RestController
@RequestMapping(path = "/files")
@CrossOrigin(origins = "http://localhost:4200")


public class FileController {


    @Autowired
    private  FileService fileService;
    @Autowired
    private  FileRepository fileRepository;



    @GetMapping("/all")
    public List<File> getAllFiles() {
        return fileRepository.findAll();
    }

    @PostMapping("/uploadToGoogleDrive/{userId}")
    public Object handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("type") Typefile type, @PathVariable Long userId) throws IOException, GeneralSecurityException {
        if (file.isEmpty()) {
            return "File is empty";
        }
        Res res = fileService.uploadFileToDrive(file, type, userId);
        System.out.println(res);
        return res;
    }


}

    /*
    private static Logger logger = LoggerFactory.getLogger(FileController.class);
     private FileRepository fileRepository ;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadData(@RequestParam("file") MultipartFile file) {
        if (file == null) {
            throw new RuntimeException("You must select a file for uploading");
        }

        try {
            // Read the content of the uploaded file
            byte[] fileBytes = file.getBytes();

            // Create a new File object with metadata and file content
            File fileEntity = new com.example.back.Entities.File();
            fileEntity.setFilename(file.getOriginalFilename());
            // Set other metadata such as file type
            // For demonstration purposes, assuming the file type is PDF
            fileEntity.setFilecontent(fileBytes);

            // Save the File object to the database
            fileRepository.save(fileEntity);

            // Return a success response
            return ResponseEntity.ok("File uploaded successfully!");
        } catch (IOException e) {
            throw new RuntimeException("Error uploading file: " + e.getMessage());
        }
    }



}





    @Autowired
    private MinioFileService minioFileService;

    @PostMapping("/files/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        String bucketName = "filestorage"; // Spécifiez le nom du bucket MinIO
        String objectName = file.getOriginalFilename(); // Utilisez le nom d'origine du fichier pour l'objet MinIO
        String contentType = file.getContentType(); // Obtenez le type de contenu du fichier

        minioFileService.uploadFile(file, bucketName, objectName, contentType);

        return ResponseEntity.ok("file uploaded successfully !");
    }
*/

