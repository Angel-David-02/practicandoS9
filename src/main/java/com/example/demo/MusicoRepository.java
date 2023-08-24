package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "musico", path = "musico")
public interface MusicoRepository extends CrudRepository<Musico, Long> {
    
}