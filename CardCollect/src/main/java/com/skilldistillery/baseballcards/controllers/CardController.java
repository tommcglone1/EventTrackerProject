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
	public List<Card> getCardList() {
		return cardService.listAllCards();
	}

	@GetMapping("baseballcards/{cardId}")
	public Card getCard(@PathVariable int cardId, HttpServletResponse response) {
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
		} catch (Exception e) {
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
			if (updated == null) {
				response.setStatus(404);
			}

		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			updated = null;
		}
		return updated;
	}

	@DeleteMapping("baseballcards/{cardId}")
	public void deleteCard(@PathVariable int cardId, HttpServletResponse response) {
		try {
			if (cardService.deleteById(cardId)) {
				response.setStatus(204);
			} else {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
		}
	}

	@GetMapping("baseballcards/search/playerName/{playerName}")
	public List<Card> findCardsByPlayerName(@PathVariable String playerName) {
		return cardService.findByPlayerNameLikeIgnoreCase(playerName);
	}

	@GetMapping("baseballcards/search/nameCardCount/{playerName}")
	public long cardCountByPlayerName(@PathVariable String playerName) {
		return cardService.countByPlayerNameLikeIgnoreCase(playerName);
	}

	@GetMapping("baseballcards/search/teamName/{teamName}")
	public List<Card> findCardsByTeam(@PathVariable String teamName) {
		return cardService.findByTeamIgnoreCase(teamName);
	}

	@GetMapping("baseballcards/search/teamCardCount/{teamName}")
	public long cardCountByTeamName(@PathVariable String teamName) {
		return cardService.countByTeamIgnoreCase(teamName);
	}

	@GetMapping("baseballcards/search/boxSetAndYear/{boxSet}/{year}")
	public List<Card> findCardsByBoxSetAndYear(@PathVariable String boxSet, @PathVariable int year) {
		return cardService.findByBoxSetAndYear(boxSet, year);
	}

	@GetMapping("baseballcards/search/boxSetAndYearCardCount/{boxSet}/{year}")
	public long cardCountByBoxSetAndYear(@PathVariable String boxSet, @PathVariable int year) {
		return cardService.countByBoxSetAndYear(boxSet, year);
	}
	@GetMapping("baseballcards/search/autographed")
	public List<Card> findCardsByAutographed(){
		return cardService.findByAutographedTrue();
	}
	@GetMapping("baseballcards/search/autographedCount")
	public long cardCountByAutographed(){
		return cardService.countByAutographedTrue();
	}
	@GetMapping("baseballcards/search/nonAutographed")
	public List<Card> findCardsByNonAutographed(){
		return cardService.findByAutographedFalse();
	}
	@GetMapping("baseballcards/search/nonAutographedCount")
	public long cardCountByNonAutographed(){
		return cardService.countByAutographedFalse();
	}
	@GetMapping("baseballcards/search/isRookieCard")
	public List<Card> findCardsByRookie(){
		return cardService.findByRookieTrue();
	}
	@GetMapping("baseballcards/search/RookieCardCount")
	public long cardCountByRookie(){
		return cardService.countByRookieTrue();
	}
	@GetMapping("baseballcards/search/isNotRookieCard")
	public List<Card> findCardsByNonRookie(){
		return cardService.findByRookieFalse();
	}
	@GetMapping("baseballcards/search/isNotRookieCardCount")
	public long cardCountByNonRookie() {
		return cardService.countByRookieFalse();
	}
	@GetMapping("baseballcards/search/manufacturer/{manufacturer}")
	public List<Card> findCardsByManufacturer(@PathVariable String manufacturer){
		return cardService.findByManufacturerIgnoreCase(manufacturer);
	}
	@GetMapping("baseballcards/search/manufacturerCount/{manufacturer}")
	public long cardCountByManufacturer(@PathVariable String manufacturer) {
		return cardService.countByManufacturerIgnoreCase(manufacturer);
	}
	@GetMapping("grades/search/cardGrade/{gradeId}/baseballcards")
	public List<Card> findCardsByGrade(@PathVariable Integer gradeId, HttpServletResponse response){
		List <Card> gradedCards = cardService.findByGrade_IdOrderByPlayerName(gradeId);
		if (gradeId > 10 || gradeId < 1) {
			response.setStatus(404);
		}
		return gradedCards;
	}
	@GetMapping("grades/search/cardGradeCount/{gradeId}/baseballcards")
	public long cardCountByGrade(@PathVariable Integer gradeId, HttpServletResponse response) {
		if (gradeId > 10 || gradeId < 1) {
			response.setStatus(404);
		}
		return cardService.countByGrade_Id(gradeId);
	}
	@GetMapping("grades/search/cardGradeNull/baseballcards")
	public List<Card> findCardsByNullGrade() {
		return cardService.findByGradeIsNullOrderByPlayerName();
	}
	@GetMapping("grades/search/cardGradeCountNull/baseballcards")
	public long cardCountByNullGrade() {
		return cardService.countByGradeIsNull();
	}
	@GetMapping("baseballcards/search/saleValueRange/{low}/{high}")
	public List<Card> findCardsBetweenSaleValues(@PathVariable double low, @PathVariable double high){
		return cardService.findBySaleValueBetween(low, high);
	}
	@GetMapping("baseballcards/search/tradeValueRange/{low}/{high}")
	public List<Card> findCardsBetweenTradeValues(@PathVariable double low, @PathVariable double high){
		return cardService.findByTradeValueBetween(low, high);
	}
	@GetMapping("conditions/search/cardCondition/{conditionId}/baseballcards")
	public List<Card> findCardsByCondition(@PathVariable int conditionId){
		return cardService.findByCondition_IdOrderByPlayerName(conditionId);
	}
	@GetMapping("conditions/search/cardConditionCount/{conditionId}/baseballcards")
	public long cardCountByCondition(@PathVariable int conditionId) {
		return cardService.countByCondition_Id(conditionId);
	}
}
