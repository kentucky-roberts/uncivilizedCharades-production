
angular
  .module('app')
    .factory('DealerService', DealerService);

DealerService.$inject = ['$timeout', '$q', 'GameService', 'CardService', 'TeamService'];

function DealerService ($timeout, $q, GameService, CardService, TeamService) {

  var service = {
      newDealer: newDealer,
      Dealer: Dealer
  };

  function newDealer (deck) {
      var dealer = new Dealer(deck);
      return dealer;
  }

  function Dealer(deck) {
    var dealer = this;
    this.deck = deck;
    this.dealt = [];
    this.discards = [];
    this.activeCard = [];
    console.log(this.deck);


    dealer.init = function () {
      // dealer.deck.cards = deck;
      // dealer.deck.dealt = [];
      // dealer.deck.discards = [];
      // dealer.deck.activeCard = [];
    };

    dealer.deal = function () {
      console.log("dealer.deal() happening now");
        dealer.init();
        var cards = dealer.deck.cards.slice(0, 3);
        console.log(cards);
        dealer.dealt.push(cards);
        console.log(dealer.dealt);
        // function pushCards(cards){
        //   dealer.deck.dealt.push(cards);
        //   console.log(dealer.deck.dealt);
        // };

        // pushCards(cards);

    };

    dealer.getDealtCards = function(){
      var dealtCards = dealer.dealt;
      return dealtCards;
    }

    dealer.activateCard = function (index) {
      var cardToActivate = dealer.deck.cards[index];
      console.log(cardToActivate);
      dealer.deck.cards.splice(index, 1);
      dealer.deck.activeCard.push(cardToActivate)
    };

    // dealer.hit = function () {
    //   var card = dealer.deck.deal();
    //   console.log(card);
    //   dealer.deck.dealt.push(card);
    //   dealer.callback();
    // };


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



    dealer.callback = function () {
      console.log("callback()");
    };

    dealer.getHandValue = function () {
      console.log("getHandValue");
    };

    dealer.init();
  } // function Dealer(deck)
  return service;
}  // DealerService
