package com.example.back.Services;

import com.example.back.Entities.Convention;

import java.util.List;

public interface ConventionService {
    List<Convention> retrieveAllConventionsNonArchivedStage();
    List<Convention> retrieveAllConventionsArchivedStage();

    Convention  addConvention(Convention convention);

    void archiveConvention (Long idconvention);
    void unarchiveConvention (Long idconvention);
    Convention retrieveConvention (Long idconvention);

    Convention validateConvention (Long idconvention);
     Convention updateConvention(Convention convention);
    List<Convention> retrieveConventionsByUser(Long idUser);
    Convention addConventionAndAssignToUser(Convention convention, Long userId);


}
