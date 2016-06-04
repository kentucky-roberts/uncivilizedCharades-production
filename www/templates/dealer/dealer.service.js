
angular
  .module('app')
    .factory('DealerService', DealerService);

DealerService.$inject = ['$timeout', 'GameService', 'CardService', 'TeamService'];

function DealerService ($timeout, GameService, CardService, TeamService) {

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

    dealer.init = function () {
      dealer.cards = [];
      dealer.isDone = false;
      dealer.busted = false;
      dealer.maxValue = 21;
      dealer.minValue = 17;
    };

    dealer.deal = function () {
        dealer.init();
        dealer.hit();
        dealer.hit();
        dealer.hit();
    };

    dealer.hit = function () {
      var card = dealer.deck.deal();
      dealer.cards.push(card);
      dealer.callback();
    };

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
