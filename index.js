/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
	// loop over each item in the data
	for (let i = 0; i < games.length; i++) {
		// create a new div element, which will become the game card
		const gameCard = document.createElement("div");

		// add the class game-card to the list
		gameCard.classList.add("game-card");

		// set the inner HTML using a template literal to display some info
		// about each game
		gameCard.innerHTML = `
        <img src="${games[i].img}" alt="${games[i].name}" />
        <h2><b>${games[i].name}</b></h2>
        <p class="game-card-description">${games[i].description}</p>
        <p>Backers: ${games[i].backers}</p>
        <p>Goal: $${games[i].goal.toLocaleString()}</p>
        <p>Pledged: $${games[i].pledged.toLocaleString()}</p>`;
		gamesContainer.appendChild(gameCard);
	}

	// TIP: if your images are not displaying, make sure there is space
	// between the end of the src attribute and the end of the tag ("/>")

	// append the game to the games-container
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce(
	(total, game) => total + game.backers,
	0
);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<b>$${totalContributions.toLocaleString()}</b>`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `<b>$${totalRaised.toLocaleString()}</b>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const numGames = GAMES_JSON.length;
gamesCard.innerHTML = `<b>${numGames}</b>`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
	deleteChildElements(gamesContainer);

	// use filter() to get a list of games that have not yet met their goal
	const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);

	// use the function we previously created to add the unfunded games to the DOM
	addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
	deleteChildElements(gamesContainer);

	// use filter() to get a list of games that have met or exceeded their goal
	const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);

	// use the function we previously created to add unfunded games to the DOM
	addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
	deleteChildElements(gamesContainer);

	// add all games from the JSON data to the DOM
	addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
const filterFunctions = [filterUnfundedOnly, filterFundedOnly, showAllGames];

unfundedBtn.addEventListener("click", filterFunctions[0]);
fundedBtn.addEventListener("click", filterFunctions[1]);
allBtn.addEventListener("click", filterFunctions[2]);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.reduce(
	(total, game) => (game.pledged < game.goal ? total + 1 : total),
	0
);

// create a string that explains the number of unfunded games using the ternary operator
const aboutUsText = document.createElement("div");
aboutUsText.innerHTML = `Currently, we have ${unfundedGames} ${
	unfundedGames === 1 ? "game" : "games"
} unfunded${
	unfundedGames > 0
		? " — but don't worry. <b>We're working to reduce that number.</b>"
		: ". <b>All of our games have met their goals!</b>"
}`; // I do not know why Prettier made it look so messy

// create a new DOM element containing the template string and append it to the description container
descriptionContainer.appendChild(aboutUsText);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
	return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...otherGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameCard = document.createElement("h3");
firstGameCard.innerHTML = `${firstGame.name}`;
firstGameContainer.appendChild(firstGameCard);

// do the same for the runner up item
const secondGameCard = document.createElement("h3");
secondGameCard.innerHTML = `${secondGame.name}`;
secondGameContainer.appendChild(secondGameCard);
