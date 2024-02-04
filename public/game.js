const ws = new WebSocket('ws://localhost:3000');

ws.onopen = function () {
    console.log('Connected to the server');
};

ws.onmessage = function (event) {
};


// Add event listeners to current player's monster zones
document.querySelectorAll('.field .monster-zone img').forEach(zone => {
    zone.addEventListener('click', function () {
        // Only proceed if the zone does not have the default "verso_card.png"
        if (this.src.includes('verso_card.png')) {
            return; // Do nothing if the default card back is clicked
        }
        
        // Display the clicked card in the card display area
        const displayedCard = document.getElementById('displayed-card');
        const cardSpecs = document.querySelector('.card-specs');

        // Remove 'hidden' class to show the card and specs (if they were hidden)
        displayedCard.classList.remove('hidden');
        cardSpecs.classList.remove('hidden');

        // Update the displayed card image and optionally update card specs
        displayedCard.src = this.src;
        cardSpecs.textContent = 'Card Details Here'; // Update with actual details as needed
    });
});

// Function to add click event listeners to hand cards
function addClickEventToHandCards() {
    document.querySelectorAll('.player-hand .hand-card').forEach(card => {
        card.addEventListener('click', function() {
            // Assuming you have an element with ID 'displayed-card' for the card display area
            const displayedCard = document.getElementById('displayed-card');
            const cardSpecs = document.querySelector('.card-specs');

            // Update the displayed card and specs
            displayedCard.src = this.src; // Set src to the clicked card's src
            displayedCard.classList.remove('hidden'); // Ensure it's visible if previously hidden
            cardSpecs.classList.remove('hidden'); // Show the card specs if hidden
            
            // Update card specs (you may need a way to associate cards with their specs)
            cardSpecs.textContent = 'Card Details Here'; // Placeholder, update with actual details
        });
    });
}

// Since cards are dynamically added, ensure to call addClickEventToHandCards() 
// again after new cards are added to the hand to attach event listeners to them


let cards = [
    'assets/cards/card1.png',
    'assets/cards/card2.png',
    'assets/cards/card3.png',
    'assets/cards/card4.png',
    'assets/cards/card5.png',
    'assets/cards/card6.png'
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Shuffle cards initially
shuffle(cards);

// Assuming the initial deck size is known
let deckSize = 30; // Example starting size, adjust based on your game's deck

// Function to update deck size display
function updateDeckCount() {
    // Select the card count element and update its text
    document.querySelectorAll('.deck-count').forEach(countElement => {
        countElement.textContent = deckSize;
    });
}

// Function to start the game
function startGame() {
    const initialCards = cards.slice(0, 5); // Get the top 5 cards
    const playerHand = document.querySelector('.player-hand');
    initialCards.forEach(initialCards => {
        const img = document.createElement('img');
        img.src = initialCards;
        img.classList.add('hand-card'); // Use for styling each card
        playerHand.appendChild(img);
    });
    // When the game starts and cards are drawn
    deckSize -= 5; // Each player draws 5 cards, adjust logic as per your game's rules
    updateDeckCount();
}
startGame();
// Call this function after you've added cards to the hand, e.g., after game initialization
addClickEventToHandCards();

