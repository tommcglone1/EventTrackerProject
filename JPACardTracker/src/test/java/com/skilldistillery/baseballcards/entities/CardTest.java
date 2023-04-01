package com.skilldistillery.baseballcards.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CardTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Card card;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPACardTracker");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		card = em.find(Card.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		card = null;
	}

	@Test
	void test_card_entity_mapping() {
		assertNotNull(card);
		assertEquals("Ryan Howard", card.getPlayerName());
		assertEquals("BSA-RH", card.getNumber());
		assertEquals("Phillies", card.getTeam());
		assertEquals("Series 1", card.getBoxSet());
		assertEquals("Stars of MLB", card.getType());
		assertEquals("https://i.ebayimg.com/images/g/NY8AAOSwSWpj8QMY/s-l1600.jpg", card.getImgURL());
		assertEquals(2023, card.getYear());
		assertTrue(card.getAutographed());
		assertFalse(card.getRookie());
		assertEquals(16.50, card.getSaleValue());
		assertEquals(25.50, card.getTradeValue());
		assertTrue(card.isActive());
		assertEquals("98/99", card.getSpNumber());
	}
	@Test
	void test_ManyToOne_CardCondition() {
		assertNotNull(card);
		assertNotNull(card.getCondition());
		assertEquals("Excellent", card.getCondition().getName());
	}
	@Test
	void test_ManyToOne_CardGrade() {
		card = em.find(Card.class, 2);
		assertNotNull(card);
		assertNotNull(card.getGrade());
		assertEquals("Near Mint-Mint", card.getGrade().getName());
	}

}
