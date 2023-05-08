package com.skilldistillery.baseballcards.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.baseballcards.services.UserService;

@CrossOrigin({ "*", "http://localhost/" })
@RestController
@RequestMapping("api")
public class UserController {

	@Autowired
	UserService userService;
	
	@DeleteMapping("MyCollection/{cardId}")
	public void removeGroceryFromShoppingList(Principal principal,
			HttpServletRequest req,
			HttpServletResponse res,
			@PathVariable int cardId) {
	
		try {
			if (userService.removeFromCards(principal.getName(), cardId)){
				res.setStatus(204);
			}else {
				res.setStatus(404);
			}
		}catch(Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
	}
}
