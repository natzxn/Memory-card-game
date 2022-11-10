const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard(e) {
    let clickedCard = e.target; //geting user clicked card
    if(clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
        return cardOne = clickedCard; //return the cardOne value to clickedCard
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector("img").src,
    cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) { //if cards are matching
        matchedCard++; //increment matched value by 1
        //if matched value is 9 that means user has matched all the cards (8 * 2 = 16 cards)
        if(matchedCard == 8) {
           setTimeout(() => {
                return shuffleCard();
           }, 1000); //calling shufffleCard function after 1 second
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; //setting both cards value to blank
        return disableDeck = false;
    }
    
    //if two cards are not matched
    setTimeout(() => {
        //adding shake class to both of cards after 400ms
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);
   
    setTimeout(() => {
        //removing both shake and flip classes from the both of cards after 1.2 seconds
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = ""; //setting both cards value to blank
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    //creating array of 16 items, each items is repeated twice
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    //sorting array item randomly
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    disableDeck = false;

    //removing flip class from all cards and assing random image to each of the cards
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

//adding click event to all cards
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
