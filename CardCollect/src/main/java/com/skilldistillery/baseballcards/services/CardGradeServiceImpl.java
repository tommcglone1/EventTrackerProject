package com.skilldistillery.baseballcards.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.baseballcards.entities.CardGrade;
import com.skilldistillery.baseballcards.repositories.CardGradeRepository;

@Service
public class CardGradeServiceImpl implements CardGradeService {

	@Autowired
	private CardGradeRepository cgRepo;
	@Override
	public List<CardGrade> listGrades() {
		return cgRepo.findAll();
		
	}

}
