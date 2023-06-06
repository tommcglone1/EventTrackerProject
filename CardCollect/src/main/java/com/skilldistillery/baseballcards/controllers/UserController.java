package com.skilldistillery.baseballcards.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.baseballcards.entities.Card;
import com.skilldistillery.baseballcards.services.UserService;

@CrossOrigin({ "*", "http://localhost/" })
@RestController
@RequestMapping("api")
public class UserController {

	@Autowired
	UserService userService;
	
	
	@PostMapping("myCollection/addCard")
	public void addCardToCollection(Principal principal,
			HttpServletRequest req,
			HttpServletResponse res,
			@RequestBody Card card) {
		
		
		try {
			if (userService.addCardToCollection(principal.getName(), card)) {
				res.setStatus(200);
			}else {
				res.setStatus(404);
			}

		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			
		}
	
	}
	
	@DeleteMapping("myCollection/{cardId}")
	public void removeCardFromCollection(Principal principal,
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
