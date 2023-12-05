package com.projeto_spring.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.projeto_spring.api.models.Product;
import com.projeto_spring.api.models.ResponseModel;
import com.projeto_spring.api.repositories.ProductRepository;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository pr;

    @Autowired
    private ResponseModel rm;

    public Iterable<Product> list(){
        return pr.findAll();
    }

    public ResponseEntity<?> register(Product product){
        if(product.getName().equals("")){
            rm.setMsg("Name is mandatory.");
            return new ResponseEntity<ResponseModel>(rm, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<Product>(pr.save(product), HttpStatus.CREATED);
        }
    }
}
