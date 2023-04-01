package com.skilldistillery.baseballcards.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	public Card createCard(@RequestBody Card card, HttpServletResponse response) {
		Card created = null;
		try {
			created = cardService.create(card);
			response.setStatus(201);
		}catch(Exception e) {
			e.printStackTrace();
			response.setStatus(400);
		}
		return created;
	}
}
