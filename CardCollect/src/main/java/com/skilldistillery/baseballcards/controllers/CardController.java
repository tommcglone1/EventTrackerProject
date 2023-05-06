package com.skilldistillery.baseballcards.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

@CrossOrigin({ "*", "http://localhost/" })

@RestController
@RequestMapping("api")
public class CardController {

	@Autowired
	private CardService cardService;

	@GetMapping("cards")
	public List<Card> getCardList(Principal principal) {
		return cardService.listAllCards(principal.getName());
	}

	@GetMapping("cards/{cardId}")
	public Card getCard(@PathVariable int cardId, HttpServletResponse response) {
		Card card = cardService.getCard(cardId);
		if (card == null) {
			response.setStatus(404);
		}
		return card;
	}

	@PostMapping("cards")
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
			created = null;
		}
		return created;
	}

	@PutMapping("cards/{cardId}")
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
			
		}
		return updated;
	}

	@DeleteMapping("cards/{cardId}")
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

	@GetMapping("cards/search/playerName/{playerName}")
	public List<Card> findCardsByPlayerName(@PathVariable String playerName) {
		return cardService.findByPlayerNameLikeIgnoreCase(playerName);
	}

	@GetMapping("cards/search/nameCardCount/{playerName}")
	public long cardCountByPlayerName(@PathVariable String playerName) {
		return cardService.countByPlayerNameLikeIgnoreCase(playerName);
	}

	@GetMapping("cards/search/teamName/{teamName}")
	public List<Card> findCardsByTeam(@PathVariable String teamName) {
		return cardService.findByTeamIgnoreCase(teamName);
	}

	@GetMapping("cards/search/teamCardCount/{teamName}")
	public long cardCountByTeamName(@PathVariable String teamName) {
		return cardService.countByTeamIgnoreCase(teamName);
	}

	@GetMapping("cards/search/boxSetAndYear/{boxSet}/{year}")
	public List<Card> findCardsByBoxSetAndYear(@PathVariable String boxSet, @PathVariable int year) {
		return cardService.findByBoxSetAndYear(boxSet, year);
	}

	@GetMapping("cards/search/boxSetAndYearCardCount/{boxSet}/{year}")
	public long cardCountByBoxSetAndYear(@PathVariable String boxSet, @PathVariable int year) {
		return cardService.countByBoxSetAndYear(boxSet, year);
	}
	@GetMapping("cards/search/autographed")
	public List<Card> findCardsByAutographed(){
		return cardService.findByAutographedTrue();
	}
	@GetMapping("cards/search/autographedCount")
	public long cardCountByAutographed(){
		return cardService.countByAutographedTrue();
	}
	@GetMapping("cards/search/nonAutographed")
	public List<Card> findCardsByNonAutographed(){
		return cardService.findByAutographedFalse();
	}
	@GetMapping("cards/search/nonAutographedCount")
	public long cardCountByNonAutographed(){
		return cardService.countByAutographedFalse();
	}
	@GetMapping("cards/search/isRookieCard")
	public List<Card> findCardsByRookie(){
		return cardService.findByRookieTrue();
	}
	@GetMapping("cards/search/RookieCardCount")
	public long cardCountByRookie(){
		return cardService.countByRookieTrue();
	}
	@GetMapping("cards/search/isNotRookieCard")
	public List<Card> findCardsByNonRookie(){
		return cardService.findByRookieFalse();
	}
	@GetMapping("cards/search/isNotRookieCardCount")
	public long cardCountByNonRookie() {
		return cardService.countByRookieFalse();
	}
	@GetMapping("cards/search/manufacturer/{manufacturer}")
	public List<Card> findCardsByManufacturer(@PathVariable String manufacturer){
		return cardService.findByManufacturerIgnoreCase(manufacturer);
	}
	@GetMapping("cards/search/manufacturerCount/{manufacturer}")
	public long cardCountByManufacturer(@PathVariable String manufacturer) {
		return cardService.countByManufacturerIgnoreCase(manufacturer);
	}
	@GetMapping("grades/search/cardGrade/{gradeId}/cards")
	public List<Card> findCardsByGrade(@PathVariable Integer gradeId, HttpServletResponse response){
		List <Card> gradedCards = cardService.findByGrade_IdOrderByPlayerName(gradeId);
		if (gradeId > 10 || gradeId < 1) {
			response.setStatus(404);
		}
		return gradedCards;
	}
	@GetMapping("grades/search/cardGradeCount/{gradeId}/cards")
	public long cardCountByGrade(@PathVariable Integer gradeId, HttpServletResponse response) {
		if (gradeId > 10 || gradeId < 1) {
			response.setStatus(404);
		}
		return cardService.countByGrade_Id(gradeId);
	}
	@GetMapping("grades/search/cardGradeNull/cards")
	public List<Card> findCardsByNullGrade() {
		return cardService.findByGradeIsNullOrderByPlayerName();
	}
	@GetMapping("grades/search/cardGradeCountNull/cards")
	public long cardCountByNullGrade() {
		return cardService.countByGradeIsNull();
	}
	@GetMapping("cards/search/saleValueRange/{low}/{high}")
	public List<Card> findCardsBetweenSaleValues(@PathVariable double low, @PathVariable double high){
		return cardService.findBySaleValueBetween(low, high);
	}
	@GetMapping("cards/search/tradeValueRange/{low}/{high}")
	public List<Card> findCardsBetweenTradeValues(@PathVariable double low, @PathVariable double high){
		return cardService.findByTradeValueBetween(low, high);
	}
	@GetMapping("conditions/search/cardCondition/{conditionId}/cards")
	public List<Card> findCardsByCondition(@PathVariable int conditionId){
		return cardService.findByCondition_IdOrderByPlayerName(conditionId);
	}
	@GetMapping("conditions/search/cardConditionCount/{conditionId}/cards")
	public long cardCountByCondition(@PathVariable int conditionId) {
		return cardService.countByCondition_Id(conditionId);
	}
}
