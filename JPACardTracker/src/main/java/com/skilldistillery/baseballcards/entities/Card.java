package com.skilldistillery.baseballcards.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class Card {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="player_name")
	private String playerName;
	
	private String number;
	
	private String team;
	
	@Column(name="set")
	private String boxSet;
	
	private String type;
	
	@Column(name="img_url")
	private String  imgURL;
	
	private Integer year;
	
	private Boolean autographed;
	
	private Boolean rookie;
	
	private String manufacturer;
	
	@Column(name="sale_value")
	private Double saleValue;
	
	@Column(name="trade_value")
	private Double tradeValue;
	
	private boolean active;
	
	@CreationTimestamp
	private LocalDateTime created;
	
	@UpdateTimestamp
	private LocalDateTime updated;
	
	@Column(name="sp_number")
	private String spNumber;
	
	private String parallel;
	
	public Card() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPlayerName() {
		return playerName;
	}

	public void setPlayerName(String playerName) {
		this.playerName = playerName;
	}
	
	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getTeam() {
		return team;
	}

	public void setTeam(String team) {
		this.team = team;
	}

	public String getBoxSet() {
		return boxSet;
	}

	public void setBoxSet(String boxSet) {
		this.boxSet = boxSet;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getImgURL() {
		return imgURL;
	}

	public void setImgURL(String imgURL) {
		this.imgURL = imgURL;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Boolean getAutographed() {
		return autographed;
	}

	public void setAutographed(Boolean autographed) {
		this.autographed = autographed;
	}

	public Boolean getRookie() {
		return rookie;
	}

	public void setRookie(Boolean rookie) {
		this.rookie = rookie;
	}

	public String getManufacturer() {
		return manufacturer;
	}

	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

	public Double getSaleValue() {
		return saleValue;
	}

	public void setSaleValue(Double saleValue) {
		this.saleValue = saleValue;
	}

	public Double getTradeValue() {
		return tradeValue;
	}

	public void setTradeValue(Double tradeValue) {
		this.tradeValue = tradeValue;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public LocalDateTime getCreated() {
		return created;
	}

	public void setCreated(LocalDateTime created) {
		this.created = created;
	}

	public LocalDateTime getUpdated() {
		return updated;
	}

	public void setUpdated(LocalDateTime updated) {
		this.updated = updated;
	}

	public String getSpNumber() {
		return spNumber;
	}

	public void setSpNumber(String spNumber) {
		this.spNumber = spNumber;
	}

	public String getParallel() {
		return parallel;
	}

	public void setParallel(String parallel) {
		this.parallel = parallel;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Card other = (Card) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Card [id=" + id + ", playerName=" + playerName + ", number=" + number + ", team=" + team + ", boxSet="
				+ boxSet + ", type=" + type + ", imgURL=" + imgURL + ", year=" + year + ", autographed=" + autographed
				+ ", rookie=" + rookie + ", manufacturer=" + manufacturer + ", saleValue=" + saleValue + ", tradeValue="
				+ tradeValue + ", active=" + active + ", created=" + created + ", updated=" + updated + ", spNumber="
				+ spNumber + ", parallel=" + parallel + "]";
	}
	
}
