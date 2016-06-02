
angular
  .module('app')
    .factory('DealerService', DealerService);

DealerService.$inject = ['$timeout', 'GameService'];

function DealerService ($timeout, GameService) {

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
      dealer.handValue = 0;
      dealer.isDone = false;
      dealer.busted = false;
      dealer.maxValue = 21;
      dealer.minValue = 17;
    };

    dealer.deal = function () {
        dealer.init();
        dealer.hit(true, false, dealer.getHandValue);
        dealer.hit(false, false, dealer.getHandValue);
    };

    dealer.hit = function (hideCard, animate, callback) {
      var card = dealer.deck.deal();
      card.hideValue = hideCard;
      dealer.cards.push(card);
      //callback();
    };




    dealer.init();
  } // function Dealer(deck)
  return service;
}  // DealerService
