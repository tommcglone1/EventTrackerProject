package com.skilldistillery.baseballcards.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.baseballcards.entities.CardCondition;
import com.skilldistillery.baseballcards.services.CardConditionService;

@RestController
@RequestMapping("api")
public class CardConditionController {
	
	@Autowired
	private CardConditionService cardConditionService;
	
	@GetMapping("cardconditions")
	public List<CardCondition> listCardConditions(){
		return cardConditionService.listConditions();
	}

}
