package com.skilldistillery.baseballcards.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.baseballcards.entities.CardCondition;
import com.skilldistillery.baseballcards.repositories.CardConditionRepository;

@Service
public class CardConditionServiceImpl implements CardConditionService {

	@Autowired
	private CardConditionRepository cardConditionRepo;
	@Override
	public List<CardCondition> listConditions() {
		return cardConditionRepo.findAll();
		
	}

}
