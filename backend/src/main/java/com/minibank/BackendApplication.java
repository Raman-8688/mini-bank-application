package com.minibank;

import com.minibank.entity.Role;
import com.minibank.entity.User;
import com.minibank.repository.RoleRepository;
import com.minibank.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Set;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner initDefaultUser(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder) {
        return args -> {
            // Automatically seed an admin user if it doesn't already exist
            if (!userRepository.existsByUsername("admin")) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(encoder.encode("admin123"));
                admin.setEmail("admin@bank.com");
                admin.setEnabled(true);
                
                roleRepository.findByName("ROLE_ADMIN").ifPresent((Role adminRole) -> {
                    admin.setRoles(Set.of(adminRole));
                    userRepository.save(admin);
                });
            }
        };
    }
}
