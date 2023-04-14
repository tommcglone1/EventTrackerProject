window.addEventListener('load', function(e) {
	console.log('wind he');
	init();
});

function init() {
	console.log('in init')
	loadAllCards();
	document.newCardForm.createButton.addEventListener('click', createCard);
	let updateDiv = document.getElementById('updateCardDiv');
	updateDiv.style.visibility = 'hidden';
	
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
	 document.getElementById('updateCardDiv').style.visibility = 'hidden';
	let displaySingleCard = document.getElementById('displaySingleCard');
	displaySingleCard.textContent ='';
	let h3 = document.createElement('h3');
	h3.textContent = card.playerName;
	displaySingleCard.appendChild(h3);
	
		if(card.imgURL){
	let image = document.createElement('img')
	image.setAttribute('src', card.imgURL);
	image.classList.add('cardImgThumbNail')
	displaySingleCard.appendChild(image)
	}
	let br =document.createElement('br')
	displaySingleCard.appendChild(br)
	
	let updateButton = document.createElement('button');
	updateButton.addEventListener('click', function(evt){
			evt.preventDefault();
			
			updateCard(card);
	});
	updateButton.textContent = 'Update Card';
	displaySingleCard.appendChild(updateButton);
	let deleteButton = document.createElement('button');
	deleteButton.addEventListener('click', function(evt){
			evt.preventDefault();
			let cardId = card.id;
			deleteCard(cardId);
	});
	deleteButton.textContent = 'Delete Card';
	displaySingleCard.appendChild(deleteButton);
	

	
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
		active: true,
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
		
	};
	if(form.grade.value){
		card.grade ={id: form.grade.value};
		
	}
			
	sendCardRequest(card);
	form.reset();
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
				loadAllCards();
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

function updateCard(card){
	clearCardDisplay();
	console.log('in update')

	
	 document.getElementById('updateCardDiv').style.visibility = 'visible';
	 
	let input = document.getElementById('number')
	input.value = card.number;
	
	input = document.getElementById('playerName')
	input.value = card.playerName;
	
	input = document.getElementById('team')
	input.value = card.team;
	
	input = document.getElementById('boxSet')
	input.value = card.boxSet;
	
	input = document.getElementById('type')
	input.value = card.type;
	
	input = document.getElementById('year')
	input.value = card.year;
	
	input = document.getElementById('manufacturer')
	input.value = card.manufacturer;
	
	input = document.getElementById('spNumber')
	input.value = card.spNumber;
	
	input = document.getElementById('parallel')
	input.value = card.parallel;
	
	input = document.getElementById('saleValue')
	input.value = card.saleValue;
	
	input = document.getElementById('tradeValue')
	input.value = card.tradeValue;
	
	console.log(card.autographed)
	
	if(card.autographed){
		input = document.getElementById('auto')
		input.checked = true;
	}else{
		input = document.getElementById('notAuto')
		input.checked = true;
		
	}
	
	input = document.getElementById('imgURL')
	input.value = card.imgURL;
	
	let select = document.getElementById('condition')
	select.value = card.condition.id;
	
	if(card.grade){
	select = document.getElementById('grade')
	select.value = card.grade.id;
	}
	
	
	
	document.updateCardForm.updateButton.addEventListener('click', function(evt){
	evt.preventDefault();
	let updateForm = evt.target.parentElement;
	
				
		let updateCard = {
		active: true,
		playerName: updateForm.playerName.value,
		number: updateForm.number.value,
		team: updateForm.team.value,
		boxSet: updateForm.boxSet.value,
		type: updateForm.type.value,
		imgURL: updateForm.imgURL.value,
		year: updateForm.year.value,
		rookie: card.rookie,
		autographed: updateForm.autographed.value,
		manufacturer: updateForm.manufacturer.value,
		saleValue: updateForm.saleValue.value,
		tradeValue: updateForm.tradeValue.value,
		spNumber: updateForm.spNumber.value,
		parallel: updateForm.parallel.value,
		condition: {
			id: updateForm.condition.value
		},
		
	};
	if(updateForm.grade.value === ""){
		updateCard.grade = null;
	}else{
		updateCard.grade ={id: updateForm.grade.value};
	}
	console.log('update card')
	console.log(updateCard);

	sendUpdateRequest(updateCard, card.id);
		updateForm.reset();
	 document.getElementById('updateCardDiv').style.visibility = 'hidden';
	});	
}


function sendUpdateRequest(updateCard, updateCardId){
		let xhr = new XMLHttpRequest();

	xhr.open('PUT', 'api/cards/' + updateCardId);

	xhr.setRequestHeader('Content-Type', 'application/json')

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			console.log('readyState works')
			if (xhr.status === 200 || xhr.status === 201) {

				updateCard = JSON.parse(xhr.responseText);
				console.log(updateCard);
				loadAllCards();
			}
			else {
				// displayError('Card not Created. Ensure correct input');
				console.error('PUT REQUEST FAILED');
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};

	updateCard = JSON.stringify(updateCard);

	xhr.send(updateCard);
}


function deleteCard(cardId){
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/cards/' + cardId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState ===4) {
			if (xhr.status === 204) {
				
				loadAllCards();
				clearCardDisplay();
			}else{
				conole.error('Delete Failed');
				console.error(xhr.status + '+:' + xhr.responseText );
			}
		}
	};
	xhr.send();
}
function clearCardDisplay(){
	let displaySingleCard = document.getElementById('displaySingleCard');
	displaySingleCard.textContent = '';
}