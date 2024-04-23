package com.example.back.ServiceImp;

import com.example.back.Entities.User;
import com.example.back.Repositories.UserRepository;
import com.example.back.SecurityConfig.KeycloakConfig;
import com.example.back.Services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    Keycloak keycloak = KeycloakConfig.getInstance();

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> AddUsers(List<User> users) {
        return userRepository.saveAll(users);
    }

    @Override
    public User UpdateUser(User u) {
        return userRepository.save(u);
    }

    @Override
    public void DeleteUserByUserName(String username) {
        Long id = userRepository.findByLogin(username).getId_User();
        userRepository.deleteById(id);
    }


    @Override
    public List<User> GetAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User GetUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User GetUserByUserName(String username) {
        return userRepository.findByLogin(username);
    }

    public void assignRoles(String userId, List<String> roles) {
        List<RoleRepresentation> roleList = rolesToRealmRoleRepresentation(roles);
        keycloak.realm("GestionStageRealm")
                .users()
                .get(userId)
                .roles()
                .realmLevel()
                .add(roleList);
    }


    private List<RoleRepresentation> rolesToRealmRoleRepresentation(List<String> roles) {
        List<RoleRepresentation> existingRoles = keycloak.realm("GestionStageRealm")
                .roles()
                .list();

        List<String> serverRoles = existingRoles
                .stream()
                .map(RoleRepresentation::getName)
                .collect(Collectors.toList());
        List<RoleRepresentation> resultRoles = new ArrayList<>();

        for (String role : roles) {
            int index = serverRoles.indexOf(role);
            if (index != -1) {
                resultRoles.add(existingRoles.get(index));
            } else {
                log.info("Role doesn't exist");
            }
        }
        return resultRoles;
    }

    private final UserRepository userRepos;
    @Override
    public User getmailUserByJournal(Long idJournal) {
      //  User u = userRepos.findByConventionSet_Stage_Journal(idJournal);
        // u.getEmail();
         return userRepos.findByConventionSet_Stage_Journal(idJournal);

    }

    @Override
    public User findById(Long idadmin) {
        return userRepository.findById(idadmin).orElse(null);
    }
}
