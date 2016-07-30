
angular
  .module('app')
  .factory('CardService', CardService);

CardService.$inject = ['$timeout', '$http'];

function CardService($timeout, $http) {
    var service = {
        newDeck: newDeck,
        Deck: Deck,
        Card: Card
    };

    function newDeck (cards){
      var deck = new Deck(cards);
      return deck;
    }

    function Deck(cards) {
      var deck = this;
      this.cards = cards;
      console.log(this.cards);

      // deck.cards.phrases.forEach(function(phrase) {
      //   deck.cards.alt_phrases.forEach(function(alt_phrase){
      //     var card = new Card(phrase, alt_phrase);
      //       deck.cards.push(card);
      //   });
      // });

      //deck.shuffle(deck.cards);
      //console.log(deck.cards);
      var cards = this.cards;
      deck.init(cards);

    }



    Deck.prototype.init = function (cards) {
      this.cards = cards;
      this.shuffle(cards);
      console.log("cards: ", this.cards);
    };



    Deck.prototype.activateCard = function (index) {

      var cardToActivate = this.dealt.slice(1, index);

      if(angular.isDefined(cardToActivate)){
            this.activeCard.push(cardToActivate);
            console.log(this.activeCard);
            return cardToActivate;
        }
        else {
            return false;
        }

    };

    // Deck.prototype.deal = function(){
    //   var card = this.cards.shift();
    //   this.dealt.push(card);
    //   console.log(this.card);
    // };

    // Deck.prototype.clearCards = function(){
    //   var card = this.cards.shift();
    //   this.dealt.push(card);
    //   console.log(this.card);
    // };


    // Deck.prototype.deal = function(){

    //     var cards = this.cards.slice(0, 3);

    //     if(angular.isDefined(cards)){
    //         this.dealt.push(cards);
    //         console.log(this.dealt);
    //         return cards;
    //     }
    //     else {
    //         return false;
    //     }
    // };

    Deck.prototype.shuffle = function(cards){
      this.cards = cards;
      var currentIndex = this.cards.length;
      var temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = this.cards[currentIndex];
        this.cards[currentIndex] = this.cards[randomIndex];
        this.cards[randomIndex] = temporaryValue;
      }
    };

    //  collect all cards from both
    Deck.prototype.reset = function () {
      this.cards = this.cards.concat(this.dealt);
      this.dealt = [];
      this.discards = [];
      this.shuffle();
    };




    function Card (phrase, alt_phrase){
        this.phrase = phrase;
        this.alt_phrase = alt_phrase;
    }

    Card.prototype.name = function () {
        return this.phrase + ' ' + this.alt_phrase;
    };

    return service;

    ////////////////

}

// game.deck.cards;
// game.deck.dealt;

// game.deck.card.name();
// game.deck.shuffle(cards);
// game.deck.deal();
// game.deck.clearCards();
// game.deck.activateCard(index);
// game.deck.reset();