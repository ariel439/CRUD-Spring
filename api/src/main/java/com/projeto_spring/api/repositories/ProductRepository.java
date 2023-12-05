package com.projeto_spring.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto_spring.api.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
    
}
