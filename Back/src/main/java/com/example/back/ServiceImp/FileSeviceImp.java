package com.example.back.ServiceImp;

import com.example.back.Entities.*;
import com.example.back.Entities.Enums.Typefile;
import com.example.back.Repositories.*;
import com.example.back.Services.*;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

@Service
public class FileSeviceImp implements FileService {

    @Autowired
    private
    FileRepository fileRepository;

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String SERVICE_ACOUNT_KEY_PATH = getPathToGoogleCredentials();
    @Autowired
    private UserRepository userRepository;




    private static String getPathToGoogleCredentials() {
        String currentDirectory = System.getProperty("user.dir");
        Path filePath = Paths.get(currentDirectory, "cred.json");
        return filePath.toString();
    }

    @Override
    public Res uploadFileToDrive(MultipartFile file, Typefile type , Long userId) throws GeneralSecurityException, IOException {
        Res res = new Res();

        try {
            String folderId = "1cLKshx8ru7eXFxR7YJIe-ukOhlkVO2WP";
            Drive drive = createDriveService();
            com.google.api.services.drive.model.File fileMetaData = new com.google.api.services.drive.model.File();
            fileMetaData.setName(file.getOriginalFilename());
            fileMetaData.setParents(Collections.singletonList(folderId));
            FileContent mediaContent = new FileContent(file.getContentType(), convertMultipartFileToFile(file));
            com.google.api.services.drive.model.File uploadedFile = drive.files().create(fileMetaData, mediaContent)
                    .setFields("id").execute();
            String fileUrl = "https://drive.google.com/uc?export=view&id=" + uploadedFile.getId();
            System.out.println("File URL: " + fileUrl);
            res.setStatus(200);
            res.setMessage("File Successfully Uploaded To Drive");
            res.setUrl(fileUrl);

            User user = userRepository.findById(userId).orElse(null);
            //  store file URL and type in the database
            com.example.back.Entities.File fileEntity = new com.example.back.Entities.File();
            fileEntity.setFileurl(fileUrl);
            fileEntity.setUser(user);
            fileEntity.setType(type);
            // Save fileEntity to the database
             fileRepository.save(fileEntity); // Uncomment this line after injecting fileRepository

        } catch (Exception e) {
            System.out.println(e.getMessage());
            res.setStatus(500);
            res.setMessage(e.getMessage());
        }
        return res;
    }

    private File convertMultipartFileToFile(MultipartFile file) throws IOException {
        File convertedFile = new File(System.getProperty("java.io.tmpdir") + "/" + file.getOriginalFilename());
        file.transferTo(convertedFile);
        return convertedFile;
    }

    private Drive createDriveService() throws GeneralSecurityException, IOException {
        GoogleCredential credential = GoogleCredential.fromStream(new FileInputStream(SERVICE_ACOUNT_KEY_PATH))
                .createScoped(Collections.singleton(DriveScopes.DRIVE));
        return new Drive.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                credential)
                .build();
    }
}
