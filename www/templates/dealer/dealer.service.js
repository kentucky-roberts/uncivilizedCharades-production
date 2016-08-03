
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
        //dealer.init();
        dealer.dealt =[];
        var crds = dealer.deck.cards;
        dealer.deck.shuffle(crds);
        var dc = dealer.deck.cards.slice(0, 3);
        console.log(dc);
        dealer.dealt.push(dc);
        console.log(dealer.dealt);
        // function pushCards(cards){
        //   dealer.deck.dealt.push(cards);
        //   console.log(dealer.deck.dealt);
        // };

        // pushCards(cards);
        var dealtCards = dealer.dealt;
        return dealtCards;
    };

    dealer.readyNextHand = function() {
      console.log("readyNextHand you dealer!");

      // dealer.deck.cards;
      // dealer.deck.activeCard;
      // dealer.deck.dealt;
      // dealer.deck.discards;
      dealer.dealt = [];
      dealer.activeCard = [];
      //console.log(dealer.deck);
    }

    dealer.activateCard = function (index) {
      var activeIndex = index;
      console.log(activeIndex);

      // console.log(dealer.dealt);
      // var cardToActivate = dealer.dealt[0][activeIndex];
      // console.log(cardToActivate);



      // var cardToActivate = dealer.deck.dealt[index];
      // console.log(cardToActivate);
      //dealer.deck.cards.splice(index, 1);




      var ac = dealer.dealt[0].splice(activeIndex, 1);
      console.log(ac);

      dealer.activeCard.push(ac);
      console.log(dealer.activeCard);

      var dc = dealer.dealt[0];
      //console.log(dc);
      dealer.discards.push(dc);
      //console.log(dealer.discards);

      //dealer.dealt = [];  // clear out for next hand
      console.log(dealer.dealt);

      //dealer.readyNextHand();  // dont do this yet because it kills message used success message
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
