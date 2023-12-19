package com.projeto_spring.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto_spring.api.models.Product;
import com.projeto_spring.api.models.ResponseModel;
import com.projeto_spring.api.services.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService ps;

    @DeleteMapping("/remover/{id}")
    public ResponseEntity<ResponseModel> remove(@PathVariable long id){
        return ps.remove(id);
    }
    
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
        return ps.registerOrChange(product, "register");
    }

    @PutMapping("/change")
        public ResponseEntity<?> change(@RequestBody Product product){
        return ps.registerOrChange(product, "change");
    }
}
