package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;


    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public String getUserList(Model model, @AuthenticationPrincipal User user) {
        model.addAttribute("currentUser", user);
//        model.addAttribute("users", userService.getAll());
        model.addAttribute("newUser", new User());
        model.addAttribute("allRoles", roleService.getAll());
        return "admin";
    }
//
//    @PostMapping ("/save")
//    public String saveUser(@ModelAttribute("user") User user) {
//        userService.add(user);
//        return "redirect:/admin/users";
//    }
//
//    @PatchMapping("/edit/{id}")
//    public String editUserPost(@PathVariable Long id,
//                               @ModelAttribute("user") User user) {
//        userService.update(id, user);
//        return "redirect:/admin/users";
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public String deleteUser(@PathVariable Long id) {
//        userService.delete(id);
//        return "redirect:/admin/users";
//    }
}
