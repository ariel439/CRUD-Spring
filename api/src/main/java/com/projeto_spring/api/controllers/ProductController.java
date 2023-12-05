package com.projeto_spring.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto_spring.api.models.Product;
import com.projeto_spring.api.services.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService ps;
    
    @GetMapping("/")
    public String route(){
        return "This is the products API";
    }

    @GetMapping("/list")
    public Iterable<Product> list(){
        return ps.list();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Product product){
        return ps.register(product);
    }
}
