package com.example.back.Services;

import com.example.back.Entities.Res;
import org.springframework.web.multipart.MultipartFile;
import com.example.back.Entities.Enums.Typefile;
import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

public interface FileService {

  //  Res uploadFileToDrive(MultipartFile file) throws GeneralSecurityException, IOException;





    Res uploadFileToDrive(MultipartFile file, Typefile type , Long userId) throws GeneralSecurityException, IOException;

    //  void uploadFile(MultipartFile file, String bucketName, String objectName, String contentType);
}
