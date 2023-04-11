window.addEventListener('load', function(e) {
	console.log('wind he');
	init();
});

function init() {
	console.log('in init')
	loadAllCards();
	document.newCardForm.createButton.addEventListener('click', createCard);
}

function loadAllCards() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/cards')

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let cardList = JSON.parse(xhr.responseText);
				displayCards(cardList);
			}
		}
	};
	xhr.send();
}



function displayCards(cardList) {
	let tbody = document.getElementById('cardTableTbody');
	tbody.textContent = '';
	for (let card of cardList) {
		let tr = document.createElement('tr');
		tr.addEventListener('click', function(evt){
			evt.preventDefault();
			let cardId =  card.id;
			console.log(cardId);
			getSingleCard(cardId);
		});
		tbody.appendChild(tr);
		let td = document.createElement('td')
		td.textContent = card.number;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = card.playerName;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = card.team;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = card.boxSet;
		tr.appendChild(td);
		
	}

}

function getSingleCard(cardId){
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/cards/' + cardId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState ===4) {
			if (xhr.status === 200) {
				let card = JSON.parse(xhr.responseText);
				displayCard(card);
			}
		}
	};
	xhr.send();
}

function displayCard(card){
	let displaySingleCard = document.getElementById('displaySingleCard');
	displaySingleCard.textContent ='';
	let h3 = document.createElement('h3');
	h3.textContent = card.playerName;
	displaySingleCard.appendChild(h3);
	let cardDetailsList = document.createElement('ul');
	displaySingleCard.appendChild(cardDetailsList);
	
	let li = document.createElement('li');
	li.textContent = `Card Number: ${card.number}`;
	cardDetailsList.appendChild(li);
	
	 li = document.createElement('li');
	 li.textContent =`Team: ${card.team}`;
	cardDetailsList.appendChild(li);
	
	 li = document.createElement('li');
	 li.textContent =`BoxSet: ${card.boxSet}`;
	cardDetailsList.appendChild(li);
	
	 li = document.createElement('li');
	 li.textContent =`Type/Variation: ${card.type}`;
	cardDetailsList.appendChild(li);
	
	 li = document.createElement('li');
	 li.textContent =`Year: ${card.year}`;
	cardDetailsList.appendChild(li);
	
	 li = document.createElement('li');
	 li.textContent =`Manufacturer: ${card.manufacturer}`;
	cardDetailsList.appendChild(li);
	
	 li = document.createElement('li');
	 li.textContent =`Sale Value: $${card.saleValue}`;
	cardDetailsList.appendChild(li);
	
	 li = document.createElement('li');
	 li.textContent =`Trade Value: $${card.tradeValue}`;
	cardDetailsList.appendChild(li);
	
	if(card.spNumber){
	 li = document.createElement('li');
	 li.textContent =`SP Number: ${card.spNumber}`;
	cardDetailsList.appendChild(li);
	}
	 li = document.createElement('li');
	 li.textContent =`Parallel: ${card.parallel}`;
	cardDetailsList.appendChild(li);
	
	 li = document.createElement('li');
	 li.textContent =`Condition: ${card.condition.name}`;
	cardDetailsList.appendChild(li);
	
	 
	 if(card.grade){
	 li = document.createElement('li');
	 li.textContent =`Grade: ${card.grade.id} - ${card.grade.name}`;
	 }
	cardDetailsList.appendChild(li);

	 if(card.rookie){
	 li = document.createElement('li');
	 li.textContent = 'RookieCard';
	 cardDetailsList.appendChild(li);
	 }
	
	
	 
	 if (card.autographed){
	 li = document.createElement('li');
	 li.textContent = 'Autographed';
	 cardDetailsList.appendChild(li);
	 }
		
}

function createCard(event) {
	event.preventDefault();
	let form = event.target.parentElement;




	let card = {
		playerName: form.playerName.value,
		number: form.number.value,
		team: form.team.value,
		boxSet: form.boxSet.value,
		type: form.type.value,
		imgURL: form.imgURL.value,
		year: form.year.value,
		autographed: form.autographed.value,
		rookie: form.rookie.value,
		manufacturer: form.manufacturer.value,
		saleValue: form.saleValue.value,
		tradeValue: form.tradeValue.value,
		spNumber: form.spNumber.value,
		parallel: form.parallel.value,
		condition: {
			id: form.condition.value
		}
		,
		grade: {
			id: form.grade.value
		},
	};
	console.log(card);
	form.reset();
	sendCardRequest(card);
}

function sendCardRequest(card) {
	let xhr = new XMLHttpRequest();

	xhr.open('POST', 'api/cards');

	xhr.setRequestHeader('Content-Type', 'application/json')

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			console.log('readyState works')
			if (xhr.status === 200 || xhr.status === 201) {

				card = JSON.parse(xhr.responseText);
				console.log(card);
				// displayCard(card);
			}
			else {
				// displayError('Card not Created. Ensure correct input');
				console.error('POST REQUEST FAILED');
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};

	card = JSON.stringify(card);

	xhr.send(card);

}

function updateCard(event){
	let createForm = document.getElementById('newCardForm')
	let input = document.createElement('input');
	
	
}

function deleteCard(event){
	console.log('In delete')
}