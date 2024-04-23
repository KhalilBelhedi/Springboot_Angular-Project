package com.example.back.ServiceImp;

import com.example.back.Entities.Convention;
import com.example.back.Entities.Stage;
import com.example.back.Entities.User;
import com.example.back.Repositories.ConventionRepository;
import com.example.back.Repositories.StageRepository;
import com.example.back.Repositories.UserRepository;
import com.example.back.Services.ConventionService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class ConventionServiceImp implements ConventionService {
    public final ConventionRepository conventionRepository;
    public final StageRepository stageRepository;
    public final UserRepository userRepository;
    private  final SmsService smsService;
    @Override
    public List<Convention> retrieveAllConventionsNonArchivedStage() {
        // Use a Set to automatically remove duplicates based on object equality
        Set<Convention> conventionSet = new HashSet<>();
        conventionSet.addAll(conventionRepository.findByIsvalidFalse());
        conventionSet.addAll(conventionRepository.findConventionsWithNonArchivedStage());

        // Convert the Set back to a List for consistency with the method signature
        return new ArrayList<>(conventionSet);
    }

    @Override
    public List<Convention> retrieveAllConventionsArchivedStage() {
        return conventionRepository.findConventionsWithArchivedStage();
    }

    @Override
    public Convention addConvention(Convention convention) {
        return conventionRepository.save(convention);
    }

    @Override
    public void archiveConvention(Long idconvention) {
        Stage stage= stageRepository.findByConvention_IdConvention(idconvention).orElse(null);
        stage.setArchived(true);
        stageRepository.save(stage);
    }

    @Override
    public void unarchiveConvention(Long idconvention) {
        Stage stage= stageRepository.findByConvention_IdConvention(idconvention).orElse(null);
        stage.setArchived(false);
        stageRepository.save(stage);
    }

    @Override
    public Convention retrieveConvention(Long idconvention) {
        return conventionRepository.findById(idconvention).orElse(null);
    }
    @Override
    public Convention updateConvention(Convention convention) {
        return conventionRepository.save(convention);
    }

    @Override
    public List<Convention> retrieveConventionsByUser(Long userId) {
        return conventionRepository.findByUserId(userId);
    }

    @Transactional
    public Convention addConventionAndAssignToUser(Convention convention, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Date range for conventions
        Calendar startPeriod = Calendar.getInstance();
        startPeriod.set(Calendar.MONTH, Calendar.JUNE);
        startPeriod.set(Calendar.DAY_OF_MONTH, 1);
        Calendar endPeriod = Calendar.getInstance();
        endPeriod.set(Calendar.MONTH, Calendar.AUGUST);
        endPeriod.set(Calendar.DAY_OF_MONTH, 30);

        // Check if the convention's dates are within the specified period
        if (convention.getDateDebut().before(startPeriod.getTime()) ||
                convention.getDateFin().after(endPeriod.getTime())) {
            throw new IllegalArgumentException("Convention date must be between June 1st and August 30th.");
        }

        // Check for overlap with existing conventions
        for (Convention existingConvention : user.getConventionSet()) {
            if (!existingConvention.getDateFin().before(convention.getDateDebut()) &&
                    !existingConvention.getDateDebut().after(convention.getDateFin())) {
                throw new IllegalStateException("This convention overlaps with an existing convention.");
            }
        }

        // Save the convention to the database
        convention.setUser(user);
        Convention savedConvention = conventionRepository.save(convention);

        // Assign the saved convention to the user
        user.getConventionSet().add(savedConvention);
        userRepository.save(user); // Save the user with the assigned conventions

        return savedConvention;
    }


//    @Transactional
//    public Convention addConventionAndAssignToUser(Convention convention, Long userId) {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
//        // Prevent creating a new convention if one already exists for the user
//        if (user.getConvention() != null) {
//            throw new IllegalStateException("This user already has a convention.");
//        }
//
//        // Save the convention to the database
//        Convention savedConvention = conventionRepository.save(convention);
//        // Assign the saved convention to the user
//        user.setConvention(savedConvention);
//        userRepository.save(user); // Save the user with the assigned convention
//        return savedConvention; // Return the saved convention
//    }

    @Transactional
    public Convention validateConvention(Long id) {
        Convention convention = conventionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid convention ID: " + id));

        convention.setIsvalid(true);
        conventionRepository.save(convention);

        // Send SMS notification
        String smsMessage = "Your convention has been validated.";
        smsService.sendSms(String.valueOf(convention.getNumTel()), smsMessage);

        return convention;
    }
}
