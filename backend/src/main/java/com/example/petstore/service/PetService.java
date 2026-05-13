package com.example.petstore.service;

import com.example.petstore.entity.Pet;
import com.example.petstore.repository.PetRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PetService {

    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public List<Pet> listPets() {
        return petRepository.findAll();
    }

    public Pet getPet(Long id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Pet ID cannot be null");
        }
        return petRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet not found"));
    }

    public Pet createPet(Pet pet) {
        pet.setId(null);
        return petRepository.save(pet);
    }

    public Pet updatePet(Long id, Pet updatedPet) {
        Pet stored = getPet(id);
        stored.setName(updatedPet.getName());
        stored.setSpecies(updatedPet.getSpecies());
        stored.setBreed(updatedPet.getBreed());
        stored.setPrice(updatedPet.getPrice());
        stored.setAge(updatedPet.getAge());
        stored.setDescription(updatedPet.getDescription());
        stored.setImageUrl(updatedPet.getImageUrl());
        stored.setAvailable(updatedPet.getAvailable());
        return petRepository.save(stored);
    }

    public void deletePet(Long id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Pet ID cannot be null");
        }
        petRepository.deleteById(id);
    }
}
