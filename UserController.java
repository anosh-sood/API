package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:4200")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    
    @GetMapping
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    
    @PostMapping
    public User createUser(@RequestBody User user) {
        System.out.println("Creating user: " + user.getEmailid() + ", " + user.getName());
        return userRepository.save(user);
        
    }

    
    @GetMapping("/{emailid}")
    public User getUserById(@PathVariable String emailid) {
        return userRepository.findById(emailid).orElse(null);
    }
}


