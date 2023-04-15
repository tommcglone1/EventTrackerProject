package com.skilldistillery.baseballcards.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.baseballcards.entities.CardGrade;
import com.skilldistillery.baseballcards.services.CardGradeService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost"})
public class GradeController {
	
	@Autowired
	private CardGradeService cgService;
	
	@GetMapping("grades")
	public List<CardGrade> listCardGrades(){
		return cgService.listGrades();
	}
}
