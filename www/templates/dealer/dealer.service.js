
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

    dealer.init = function () {
      dealer.cards = [];
      dealer.dealt = [];
      dealer.activeCard = [];
    };

    dealer.deal = function () {
        dealer.init();
        dealer.hit();
        dealer.hit();
        dealer.hit();
    };

    dealer.activateCard = function (index) {
      var cardToActivate = dealer.deck.cards[index];
      console.log(cardToActivate);
      dealer.deck.cards.splice(index, 1);
      dealer.deck.activeCard.push(cardToActivate)
    };

    dealer.hit = function () {

      var card = dealer.deck.deal();
      console.log(card);
      dealer.deck.dealt.push(card);
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
