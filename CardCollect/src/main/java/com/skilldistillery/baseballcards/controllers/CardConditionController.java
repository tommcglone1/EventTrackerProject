package com.skilldistillery.baseballcards.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.baseballcards.entities.CardCondition;
import com.skilldistillery.baseballcards.services.CardConditionService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost"})
public class CardConditionController {
	
	@Autowired
	private CardConditionService cardConditionService;
	
	@GetMapping("conditions")
	public List<CardCondition> listCardConditions(){
		return cardConditionService.listConditions();
	}

}
