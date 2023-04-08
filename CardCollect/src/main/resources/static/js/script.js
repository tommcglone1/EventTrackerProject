window.addEventListener('load', function(e){
	console.log('wind he');
	init();
});

function init(){
	console.log('in init')
	loadAllCards();
	document.newCardForm.createButton.addEventListener('click', createCard);
}

function loadAllCards(){
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/cards')
	
		xhr.onreadystatechange = function(){
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					let cardList = JSON.parse(xhr.responseText);
					displayCards(cardList);
				}
			}
		};	
	xhr.send();
}				

function displayCards(cardList){
	let tbody = document.getElementById('cardTableTbody');
	tbody.textContent = '';
	for (let card of cardList){
		let tr = document.createElement('tr');
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
		td = document.createElement('td');
		td.textContent = card.type;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = card.year;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = card.manufacturer;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = card.saleValue;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = card.tradeValue;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = card.spNumber;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = card.parallel;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = card.condition;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = card.grade;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = card.rookie;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = card.autographed;
		tr.appendChild(td);
		td = document.createElement('td');
		if(card.imgURL){
		let img = document.createElement('img');
		img.setAttribute('src', card.imgURL);
		img.classList.add('cardImgThumbnail');
		td.appendChild(img);
		tr.appendChild(td);
		}
	}

}

function createCard(event){
	event.preventDefault();
	let form = event.target.parentElement;
	console.log('heloo');
	console.log(form);
	
	

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
		id: form.condition.value}
		,
	  grade: {
		id: form.grade.value},
	};
	console.log(card);
	form.reset();
	sendCardRequest(card);
  }

function sendCardRequest(card){
	let xhr = new XMLHttpRequest();

  xhr.open('POST','api/cards');

  xhr.setRequestHeader('Content-Type', 'application/json')

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 ) {
      console.log('readyState works')
      if(xhr.status === 200 || xhr.status=== 201){
       
        card = JSON.parse(xhr.responseText);
        console.log(card); 
        // displayCard(card);
      }
      else{
        // displayError('Card not Created. Ensure correct input');
        console.error('POST REQUEST FAILED');
        console.error(xhr.status + ': ' + xhr.responseText);
      }
    }
  };

  card = JSON.stringify(card);

  xhr.send(card);

}