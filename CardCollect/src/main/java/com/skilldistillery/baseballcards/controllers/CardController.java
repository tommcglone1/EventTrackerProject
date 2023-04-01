package com.skilldistillery.baseballcards.controllers;



import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.baseballcards.entities.Card;
import com.skilldistillery.baseballcards.services.CardService;

@RestController
@RequestMapping("api")
public class CardController {

	@Autowired
	private CardService cardService;
	
	@GetMapping("baseballcards")
	public List<Card> getCardList(){
		return cardService.listAllCards();
	}
	
	@GetMapping("baseballcards/{cardId}")
	public Card getCard(@PathVariable int cardId, HttpServletResponse response){
		Card card = cardService.getCard(cardId);
		if (card == null) {
			response.setStatus(404);
		}
		return card;
	}
	
	@PostMapping("baseballcards")
	public Card createCard(@RequestBody Card card, HttpServletResponse response, HttpServletRequest request) {
		Card created = null;
		try {
			created = cardService.create(card);
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(card.getId());
			response.setHeader("Location", url.toString());
		}catch(Exception e) {
			e.printStackTrace();
			response.setStatus(400);
		}
		return created;
	}
	
	@PutMapping("baseballcards/{cardId}")
	public Card updateCard(@RequestBody Card card, @PathVariable int cardId, HttpServletResponse response) {
		Card updated = null;
		try {
			updated = cardService.update(cardId, card);
			if (updated ==null) {
				response.setStatus(404);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			updated = null;
		}
		return updated;
	}
	@DeleteMapping("baseballcards/{cardId}")
	public void deleteCard(@PathVariable int cardId, HttpServletResponse response) {
		try {
			if(cardService.deleteById(cardId)) {
				response.setStatus(204);
			}else {
				response.setStatus(404);
			}
		}catch(Exception e) {
			e.printStackTrace();
			response.setStatus(400);
		}
	}
}
