package com.example.petstore;

import com.example.petstore.entity.Pet;
import com.example.petstore.repository.PetRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PetstoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(PetstoreApplication.class, args);
    }

    @Bean
    CommandLineRunner seedData(PetRepository petRepository) {
        return args -> {
            if (petRepository.count() == 0) {
                petRepository.save(new Pet("Buddy", "Dog", "Golden Retriever", 850.00, 2, "Friendly family dog", "https://images.unsplash.com/photo-1518717758536-85ae29035b6d", true));
                petRepository.save(new Pet("Whiskers", "Cat", "Siamese", 550.00, 1, "Curious and cuddly", "https://images.unsplash.com/photo-1518791841217-8f162f1e1131", true));
                petRepository.save(new Pet("Goldie", "Fish", "Goldfish", 15.00, 1, "Easy-care aquarium pet", "https://images.unsplash.com/photo-1525253086316-d0c936c814f8", true));
                petRepository.save(new Pet("Bella", "Rabbit", "Holland Lop", 120.00, 1, "Soft and gentle companion", "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a", true));
            }
        };
    }
}
