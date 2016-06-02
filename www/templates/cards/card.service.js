
angular
  .module('app')
    .factory('CardService', CardService);

//GameService.$inject = ['$timeout', 'CardService'];

function CardService(){
    var service = {
        newDeck: newDeck,
        Deck: Deck,
        Card: Card
    };

    function newDeck(){
        var deck = new Deck();
        return deck;
    }

    function Deck(phrases, alt_phrases){
      var deck = this;
      this.cards = [];
      this.dealt = [];
      this.phrases = phrases;
      this.alt_phrases = alt_phrases;

      deck.phrases.forEach(function (phrase) {
        deck.alt_phrases.forEach(function(alt_phrase){
          var card = new Card(phrase, alt_phrase);
          deck.cards.push(card);
        });
      });

      deck.shuffle(deck.cards);

    }

    Deck.prototype.suits = ['C', 'D', 'S', 'H'];

    Deck.prototype.ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

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


    function Card(rank, suit){
        this.rank = rank;
        this.suit = suit;
    }

    Card.prototype.name = function () {
        return this.rank + ' ' + this.suit;
    };

    return service;

    ////////////////

}