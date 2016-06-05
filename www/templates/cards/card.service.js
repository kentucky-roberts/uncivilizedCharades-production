
angular
  .module('app')
    .factory('CardService', CardService);

CardService.$inject = ['$timeout', '$http'];
function CardService($timeout, $http){

    var service = {
        newDeck: newDeck,
        Deck: Deck,
        Card: Card
    };

    function newDeck(card_types){
        var deck = new Deck(card_types);
        return deck;
    }



    // var card_types = $http.get('api/card_types.json').then(function (cardData) {
    //       var newCards = cardData.data;
    //       var newTotalCards = newCards.length;
    //     });


    // var phrases = ["Run fast", "Eat snails", "Talk to turtles", "Scuba dive"];
    // var alt_phrases = ["Eat Pizza", "Find Waldo", "Carpet cleaning", "Do jumpingjacks" ];


    function Deck(card_types) {
      var deck = this;
      this.cards = [];
      this.dealt = [];
      this.card_types = card_types;
      this.phrases = [];
      this.alt_phrase = [];
      //this.phrases = ["Run fast", "Eat snails", "Talk to turtles", "Scuba dive"];
      //this.alt_phrases = ["Eat Pizza", "Find Waldo", "Carpet cleaning", "Do jumpingjacks" ];
      console.log("card_types" + card_types[0].phrase);

      deck.card_types.phrases.forEach(function (phrase) {
        deck.card_types.alt_phrases.forEach(function (alt_phrase){
          deck.phrases.push(phrase);
          deck.alt_phrases.push(alt_phrase);
        });
      });



      deck.phrases.forEach(function (phrase) {
        deck.alt_phrases.forEach(function(alt_phrase){
          var card = new Card(phrase, alt_phrase);
          deck.cards.push(card);
        });
      });

      deck.shuffle(deck.cards);

    }

    Deck.prototype.phrases = function(phrases) {
      this.phrases = phrases;
    };

     Deck.prototype.alt_phrases = function(alt_phrases) {
      this.alt_phrases = alt_phrases;
    };

    Deck.prototype.deal = function(){
        var card = this.cards.shift();
        if(angular.isDefined(card)){
            this.dealt.push(card);
            return card;
        }
        else {
            return false;
        }
    };

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
      this.shuffle();
    };

    Deck.prototype.deal = function(){
      var card = this.cards.shift();
      this.dealt.push(card);
      console.log(this.dealt);
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
// game.deck.reset();