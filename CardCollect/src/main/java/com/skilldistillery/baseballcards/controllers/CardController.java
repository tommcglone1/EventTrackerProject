package com.skilldistillery.baseballcards.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
}
