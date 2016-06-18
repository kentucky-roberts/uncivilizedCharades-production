angular
  .module('app.game')
    .controller('GameController', GameController);

GameController.$inject = ['$ionicPlatform', '$q', '$scope', '$rootScope', '$firebaseAuth', '$window', '$interval', '$timeout', '$ionicModal', '$ionicLoading', '$ionicSideMenuDelegate', '$state', '$ionicSlideBoxDelegate', '$http', '$ionicTabsDelegate', '$firebaseObject', 'ngAudio', 'ionicToast', '$ionicNavBarDelegate', 'PlayerService', 'CardService', 'ModalService', 'CountdownService', 'DealerService', 'TeamService', 'AppService', 'GameService', 'Games', '$log', 'CardType', 'dataservice', 'TeamService', 'TeamsService'];

function GameController($ionicPlatform, $q, $scope, $rootScope, $firebaseAuth, $window, $interval, $timeout, $ionicModal, $ionicLoading, $ionicSideMenuDelegate, $state, $ionicSlideBoxDelegate, $http, $ionicTabsDelegate, $firebaseObject, ngAudio, ionicToast, $ionicNavBarDelegate, PlayerService, CardService, ModalService, CountdownService, DealerService, TeamService, AppService, GameService, Games, $log, CardType, dataservice, TeamService, TeamsService) {

  $scope.hideNavBar = function() {
      document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
  };
  $scope.hideTabBar = function() {
      document.getElementsByClassName('tabs')[0].style.display = 'none';
  };
  $scope.hideNavBar();

  $scope.hideTabBar();

  $scope.showLoading = function() {
    $ionicLoading.show();
  };

  $scope.showLoading();





  //  ... ok now boot this.game
  var game = this;


    ////////////////////////////////////////
    // Game Sound Effects
    ////////////////////////////////////////
    $scope.chaChing = ngAudio.load("sound/cha-ching.mp3"); // returns NgAudioObject
    $scope.awww = ngAudio.load("sound/awww.mp3"); // returns NgAudioObject
    $scope.crickets = ngAudio.load("sound/crickets.mp3"); // returns NgAudioObject
    $scope.snowballSplat = ngAudio.load("sound/snowball-splat.mp3"); // returns NgAudioObject
    $scope.squishFart = ngAudio.load("sound/squish-fart.mp3"); // returns NgAudioObject
    $scope.voiceOn = ngAudio.load("sound/voice_on.mp3"); // returns NgAudioObject
    $scope.voiceOff = ngAudio.load("sound/voice_off.mp3"); // returns NgAudioObject
    $scope.clickOn = ngAudio.load("sound/click-on.mp3"); // returns NgAudioObject
    $scope.clickOff = ngAudio.load("sound/click-off.mp3"); // returns NgAudioObject
    $scope.soundChaChing = function() { $scope.chaChing.play(); };
    $scope.soundAwww = function() { $scope.awww.play(); };
    $scope.soundCrickets = function() { $scope.crickets.play(); };
    $scope.soundSnowballSplat = function() { $scope.snowballSplat.play(); };
    $scope.soundSquishFart = function() { $scope.squishFart.play(); };
    $scope.soundVoiceOn = function() { $scope.voiceOn.play(); };
    $scope.soundVoiceOff = function() { $scope.voiceOff.play(); };
    $scope.soundClickOn = function() { $scope.clickOn.play(); };
    $scope.soundClickOff = function() { $scope.clickOff.play(); };

    $scope.filterFunction = function(element) {
        return element.name.match(/^Ma/) ? true : false;
    };



    game.card_types = [];
    game.phrases = [];
    game.alt_phrases = [];

    activate();

    function activate() {
        return getCards().then(function() {
          console.log("... returning cards", game.card_types);
          //console.log(game.phrases);
          game.init(game.phrases, game.alt_phrases);
        });
    }

    function getCards() {
        return dataservice.getCards()
            .then(function(data) {
                game.card_types = data;
                console.log(game.card_types);

                game.card_types.forEach(function (phrase) {
                  game.phrases.push(phrase);
                  console.log("pushing phrase: " + phrase);
                });

                  game.card_types.forEach(function (alt_phrase) {
                      game.alt_phrases.push(alt_phrase);
                      console.log("pushing alt_phrase: " + alt_phrase);
                  });

                //console.log(game.phrases);

            });


    }

   var phrases = game.phrases;
   var alt_phrases = game.alt_phraes;

    game.init = function (phrases, alt_phrases) {
      console.log("game.init was called: ", phrases, alt_phrases);

      game.phrases = phrases;  // FIX THIS
      game.alt_phrases = alt_phrases;
      game.maxScore = GameService.maxScore();
      game.secondsRemaining = GameService.maxTime();

      game.deck = CardService.newDeck(phrases, alt_phrases);  // create a deck of cards and pass it into the game
      console.log(game.deck);
      //
      //
      /**
       * Game stuff inherited from CardService
       *
       * Methods
       *
       * game.deck.cards;
       * game.deck.dealt;
       * game.deck.card.name();
       * game.deck.shuffle(cards);
       * game.deck.deal();
       * game.deck.reset();
       *
       */

        game.dealer = DealerService.newDealer(game.deck);  //  now create a dealer pass him to game and give the dealer out new game deck of cards
        console.log(game.dealer.deck.cards[0]);

        game.team1 = TeamService.newTeam("Team1", 0);  // make a team
        game.team2 = TeamService.newTeam("Team2", 0);  // make another team
        game.teams = TeamsService.newTeams(game.team1, game.team2);  //  push teams into game to make game.teams
        //game.teams.team1.addPoint();
        //console.log("game.teams " , game.teams.team1.score);
        /**
         * Game stuff inherited from Team object
         *
         * Attributes (we can view this info about them via {{game.teams.team1.score}} )
         * game.teams.team1.score
         * game.teams.team1.teamName
         * game.teams.team1.originalScore
         *
         * Methods
         * game.teams.team1.logInfo();
         * game.teams.team1.addPoint();
         * game.teams.team1.removePoint();
         * game.teams.team1.resetScore();
         * game.teams.team1.changeScore(anountToChange);
         *
         */
        console.log("... created game.teams" + game.teams.team1.teamName + game.teams.team2.teamName);


        $scope.slides = [];

        game.canDeal = false;
        game.cardsVisible = false;

        $scope.gamePreflight= false;
        $scope.gameStarted = false;
        $scope.gameOver = false;

        $scope.gameSlideActive  = true;
        $scope.gameHasPlayers = false;

        game.welcome = true;
        game.quickStart = false;  // KEY TO THE APP START OPTIONS
        game.preflight  = false;
        game.started  = false;
        game.over  = false;
        game.winner = [];
    };


    $scope.gameWithTeams = function() { // game without players
      $scope.gameHasPlayers = false;
      $scope.gameType = true; // we have chosen a gameType no longer need to see the option buttons
      $scope.editTeamNames = true;

      // these control 'www/templates/game.html' each using ngf-if to show and hide outer-shell views
      game.welcome = false;
      game.preflight  = false;
      game.quickStart = true;
      game.started  = false;
      game.over  = false;

      $scope.initQuickStart();
    };

    $scope.initQuickStart = function() {
      // these control 'www/templates/game.html' each using ngf-if to show and hide outer-shell views
      game.welcome = false;
      game.preflight  = false;
      game.started  = false;
      game.over  = false;
      game.quickStart = true; // init

      $scope.gameHasPlayers = false; // displays view to customize team names with ng-click="startQuickStart()" to start game w/out players passing ->  var players = "teamsOnly"; to  ->  $scope.startGame(players)
      $scope.editTeamNames = true; // 2nd condition to show customize team name view
      $scope.gameType = false; //  have not chosen a gameType yet so show option buttons
    };

    $scope.startQuickStart = function() {
      // these control 'www/templates/game.html' each using ngf-if to show and hide outer-shell views
      game.welcome = false;
      game.preflight  = false;
      game.started  = true; /// init
      game.over  = false;
      game.quickStart = false;

      $scope.startGame(game.teams);
    };


      ////////////////////////////////////////
      //  Start Game!!   OFFICIAL
      ////////////////////////////////////////
      $scope.startGame = function(teams) {
        console.log(teams);
        $scope.gameSlideActive = true;  // slide-in-left our first slide
        game.step = 0;
        $scope.selectActiveTeam();
      };

      game.endGame = function(winningTeam) {
        console.log("game.endGame() called here ........" + winningTeam);
        game.started = false;
        game.over = true;
        game.winner = winningTeam;
      };
      //game.endGame("Team1");

      $scope.nextStep = function() {
          console.log("Next Step called ... ");
          game.step += 1;
          $scope.step = game.step;

          game.canDeal = false;
          game.cardsVisible = false;
          game.cardsDealt = false;
          game.cardFaceVisible = false;

         $scope.selectActiveTeam();  //  Also controlling  //  $scope.gameSlideActive = false || true
      };

      $scope.firstStep = function() {
          game.step = 1;
          $scope.step = game.step;
      };

      $scope.lastStep = function() {
            game.step -= 1;
            $scope.step = game.step;
      };

      $scope.resetGame = function() {
          game.step = 0;
          $scope.gameStarted = false;
          $scope.gameOver = false;
          $scope.step = game.step;

          game.welcome = false;
          game.preflight  = false;
          game.quickStart = true;
          game.started  = false;
          game.over  = false;

          game.teams = [];


          $scope.activePhrase = 0;
          $scope.activePlayer = 0;
          $scope.team1Score = 0;
          $scope.team2Score = 0;
          $scope.winningTeam = null;
          $scope.teamColor = null;
          $scope.teamCss = null;
      };


      $scope.addPointToActiveTeam = function() {

          if (game.step % 2 === 0 && game.step != 1) {

              game.teams.team1.addPoint();
              $scope.soundChaChing();
              $scope.teamColor = "positive";

            if (game.teams.team1.score >= game.maxScore ) {
              console.log("team1's score: " + game.teams.team1.score);
                game.endGame(game.teams.team1);
              } return;
            } else {
                game.teams.team2.addPoint();
                $scope.soundChaChing();
                $scope.teamColor = "assertive";

          if (game.teams.team2.score >= game.maxScore ) {
              console.log("team2's score: " + game.teams.team2.score);
              game.endGame(game.teams.team2);
          }
              return;
          }
      };

      ////  THIS IS A PRODUCTION THING-A-MA-BOB  !!!!
      $scope.selectActiveTeam = function() {

          if (game.step % 2 === 0 && game.step !== 1) {

              $scope.swapSlides = function() {
                  $timeout(function() {
                      $scope.teamColor = "positive";
                      $scope.teamCss = "bg-team1";
                      $scope.gameSlideActive = true;
                  }, 500);
              };
              $scope.swapSlides();
              game.activeTeam = game.teams.team1;
              console.log(game.activeTeam);
              $scope.gameSlideActive = false;

              return;
          } else {
              $scope.swapSlides = function() {
                $timeout(function() {
                   $scope.teamColor = "assertive";
                     $scope.teamCss = "bg-team2";
                   $scope.gameSlideActive = true;
                }, 500);
              };
              $scope.swapSlides();
              game.activeTeam = game.teams.team2;
              console.log(game.activeTeam);
              $scope.gameSlideActive = false;
              return;
          } // if/else
      };


      $scope.activateGameSlide = function() {
        $scope.gameSlideActive = true;
      };

      $scope.unActivateGameSlide = function() {
        $scope.gameSlideActive = false;
      };

      $scope.showSecretPhrase = function () {
        $scope.secretPhraseVisible = true;
      };

      $scope.stealPointGuess = function(answer) {
          $scope.secretPhraseVisible = false;
          if (answer === true) {
            console.log("guessedCorrect");
          } else {
            console.log("guessedWrong");
          }
        $scope.closeModal();
      };




      ////////////////////////////////////////
      // ionicSlideBoxDeligate
      ////////////////////////////////////////

      $scope.next = function () {
        $ionicSlideBoxDelegate.next();
      };
      $scope.previous = function () {
        $ionicSlideBoxDelegate.previous();
      };
      // Called each time the slide changes
      $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
        //console.log("slideChanged: " + index);
      };





      ////////////////////////////////////////
      // Game Has Started!!
      ////////////////////////////////////////
      game.startGame = function(players){
            game.players = players;
            console.log("game.startGame was called");

            game.needsPlayers = false;
            game.readyForTeams = false;
            game.readyToStart = false;

            game.started = true;
            $scope.gameStarted = true;
            game.canDeal = false;
            game.showResults = false;

            game.turn = 1;
            game.step = 1;
            game.ap = 0;


            // The two functions above return
            // game.step = 1;
            // game.turn = 0;
            // game.ap = 0;

            // $("#pre-flight").removeClass("show").addClass("hidden");
            // $("#game").removeClass("hidden").addClass("show");
            // game.showDealer();
            $scope.gameOver = false;
            $scope.gameStarted = true;

      };

      game.initLoop = function() {
          $("#dealer").removeClass("hidden").addClass("show");
          $("#dealerDeal").removeClass("hidden").addClass("show");
      };

      game.showDealer = function() {
            game.started = true;
            game.canDeal = false;
            game.showResults = false;
            game.dealerVisible = true;
            game.cardsDealt = false;
            game.cardsVisible = false;
            $("#dealer").removeClass("hidden").addClass("show");
      };

      game.hideDealer = function () {
            $("#dealer").removeClass("show").addClass("hidden");
            $("#dealerDeal").removeClass("show").addClass("hidden");
      };



      game.deal = function () {

            game.dealer.deal();

            game.canDeal = true;
            game.dealerVisible = false;
            game.cardsDealt = true;
            game.cardsVisible = true;

            console.log("GOING BACK TO INIT TO USE CARDSERVICE.  PICK BACK UP HERE");

            $("#dealer").removeClass("show").addClass("hidden");
            $("#dealerDeal").removeClass("show").addClass("hidden");
            $("#showCards").removeClass("hidden").addClass("show");
      };

      game.showCards = function(){
            game.canDeal = true;
            game.cardsVisible = true;
            game.cardsDealt = true;
            game.cardFaceVisible = true;

            $("#showCards").removeClass("show").addClass("hidden");
            $("#activateCard").removeClass("hidden").addClass("show");
      };

      game.activateCard = function(index) {
          game.cardsVisible = false;
          game.canDeal = false;
          game.cardsDealt = false;
          game.cardFaceVisible = false;

          //game.dealer.activateCard(index);  // USING DUMMY INFO FOR NOW
          console.log("ACTIVATING CARD");

          $("#activateCard").removeClass("show").addClass("hidden");
          $("#showCountdown").removeClass("hidden").addClass("show");
         game.showCountdown();
      };

      game.showCountdown = function() {
          game.cardsVisible = false;
          $("#showCountdown").removeClass("show").addClass("hidden");
          $("#countdown").removeClass("hidden").addClass("show");
          $scope.newCountdown();
          $scope.selectTimer(game.secondsRemaining);
          // game.readyNextTurn() will go to: game.awardPoint or game.noPoint, both of which call game.readyNextTurn() which restarts loop
      };

      game.initLoop();


      game.noPoint = function() {
          game.readyNextTurn();
      };

      game.awardPoint = function() {
         // var winner = game.activePlayer;
          //console.log("Winner is:" + winner + "Award him a point");
          game.readyNextTurn();
      };

      game.startBonusRound = function() {
        console.log("start bonus round!");
      };

      game.stealPoint = function(team) {
        alert("game.stealPoint() called from GameController yo!");
      };

      game.showRefreshCards = function() {
          game.started = true;
          game.canDeal = true;
          game.showResults = false;
      };




  ////////////////////////////////////////
  // ModalService
  ////////////////////////////////////////
  $scope.showStealPoint = function() {
    $scope.secretPhraseVisible = false;
      ModalService
          .init('templates/modals/steal-point.html')
          .then(function(modal) {
              modal.show();
          });
  };

  $scope.playerModalShow = function() {
    ModalService
      .init('templates/modals/new-player.html', $scope)
      .then(function(modal) {
        modal.show();
      });
  };

  $scope.gameModalShow = function() {
    ModalService
      .init('templates/modals/new-game.html', $scope)
      .then(function(modal) {
        modal.show();
      });
  };

  $scope.newCountdown = function() {
    ModalService
      .init('templates/modals/countdown-timer.html', $scope)
      .then(function(modal) {
        modal.show();
      });
  };

   $scope.showSuccess = function() {
    ModalService
      .init('templates/modals/success-message.html', $scope)
      .then(function(modal) {
        modal.show();
      });
  };

  $scope.showTimeExpired = function() {
    ModalService
      .init('templates/modals/time-expired-message.html', $scope)
      .then(function(modal) {
        modal.show();
      });
  };

  ////    COUNTDOWN SERVICE    ////  todo....  make CountdownService.tags -> tags more descriptive name
  $scope.CountdownService = CountdownService;

  $scope.setFalseTag = function() {
      CountdownService.setFalseTag();
  };

  $scope.setTrueTag = function() {
      CountdownService.setTrueTag();
  };

  $scope.$watch(function() {
    return CountdownService.tags;
  },

  function(newVal, oldVal) {
      console.log(newVal, oldVal);
      if (newVal.a === false) {
          $scope.newCountdown();
          $scope.selectTimer(game.maxTime);
      }
   }, true);
  /**
  *
  * SVG-Countdown timer
  *
  **/
  var mytimeout = null; // the current timeoutID
  // actual timer method, counts down every second, stops on zero
  $scope.onTimeout = function() {
      if ($scope.timer === 0) {
          $scope.$broadcast('timer-stopped', 0);
          $timeout.cancel(mytimeout);
          return;
      }
      $scope.timer--;
      mytimeout = $timeout($scope.onTimeout, 1000);
  };
  // functions to control the timer
  // starts the timer
  $scope.startTimer = function() {
      mytimeout = $timeout($scope.onTimeout, 1000);
      $scope.started = true;
  };

  // stops and resets the current timer
  $scope.stopTimer = function(closingModal) {
      if (closingModal !== true) {
          $scope.$broadcast('timer-stopped', $scope.timer);
      }
      $scope.timer = $scope.timeForTimer;
      $scope.started = false;
      $scope.paused = false;
      $timeout.cancel(mytimeout);
  };

  // pauses the timer
  $scope.pauseTimer = function() {
      $scope.$broadcast('timer-stopped', $scope.timer);
      $scope.started = false;
      $scope.paused = true;
      $timeout.cancel(mytimeout);
  };

  // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
  $scope.$on('timer-stopped', function(event, remaining) {
      if (remaining === 0) {
          $scope.done = true;
          console.log("out of time!");
          $scope.closeModal();
          $scope.showTimeExpired();
      }
  });

  // UI
  // When you press a timer button this function is called
  $scope.selectTimer = function(val) {
      $scope.timeForTimer = val;
      $scope.timer = val;
      $scope.started = false;
      $scope.paused = false;
      $scope.done = false;
  };

  // This function helps to display the time in a correct way in the center of the timer
  $scope.humanizeDurationTimer = function(input, units) {
      // units is a string with possible values of y, M, w, d, h, m, s, ms
      if (input === 0) {
          return 0;
      } else {
          var duration = moment().startOf('day').add(input, units);
          var format = "";
          if (duration.hour() > 0) {
              format += "H[h] ";
          }
          if (duration.minute() > 0) {
              format += "m[m] ";
          }
          if (duration.second() > 0) {
              format += "s[s] ";
          }
          return duration.format(format);
      }
  };

////   GAME CONTROLLER FOOTER    ////
  //game.init(card_types);
  //game.demoMakePlayers();

////  /* angular-svg-round-progressbar@0.3.8 2015-10-21 */
  "use strict";!function(){for(var a=0,b=["webkit","moz"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){var c=(new Date).getTime(),d=Math.max(0,16-(c-a)),e=window.setTimeout(function(){b(c+d)},d);return a=c+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){window.clearTimeout(a)})}(),angular.module("angular-svg-round-progress",[]),angular.module("angular-svg-round-progress").constant("roundProgressConfig",{max:50,semi:!1,rounded:!1,responsive:!1,clockwise:!0,radius:100,color:"#45ccce",bgcolor:"#eaeaea",stroke:15,duration:800,animation:"easeOutCubic",offset:0}),angular.module("angular-svg-round-progress").service("roundProgressService",[function(){var a={},b=angular.isNumber,c=document.head.querySelector("base");a.resolveColor=c&&c.href?function(a){var b=a.indexOf("#");return b>-1&&a.indexOf("url")>-1?a.slice(0,b)+window.location.href+a.slice(b):a}:function(a){return a},a.isSupported=!(!document.createElementNS||!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var d=function(a,b,c,d){var e=(d-90)*Math.PI/180;return{x:a+c*Math.cos(e),y:b+c*Math.sin(e)}};return a.toNumber=function(a){return b(a)?a:parseFloat((a+"").replace(",","."))},a.getOffset=function(b,c){var d=+c.offset||0;if("inherit"===c.offset)for(var e,f=b;!f.hasClass("round-progress-wrapper");)a.isDirective(f)&&(e=f.scope().$parent.getOptions(),d+=(+e.offset||0)+(+e.stroke||0)),f=f.parent();return d},a.updateState=function(a,b,c,e,f,g){if(!f)return e;var h=a>0?Math.min(a,b):0,i=g?180:359.9999,j=0===b?0:h/b*i,k=f/2,l=d(k,k,c,j),m=d(k,k,c,0),n=180>=j?"0":"1",o=["M",l.x,l.y,"A",c,c,0,n,0,m.x,m.y].join(" ");return e.attr("d",o)},a.isDirective=function(a){return a&&a.length?"undefined"!=typeof a.attr("round-progress")||"round-progress"===a[0].nodeName.toLowerCase():!1},a.animations={linearEase:function(a,b,c,d){return c*a/d+b},easeInQuad:function(a,b,c,d){return c*(a/=d)*a+b},easeOutQuad:function(a,b,c,d){return-c*(a/=d)*(a-2)+b},easeInOutQuad:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a+b:-c/2*(--a*(a-2)-1)+b},easeInCubic:function(a,b,c,d){return c*(a/=d)*a*a+b},easeOutCubic:function(a,b,c,d){return c*((a=a/d-1)*a*a+1)+b},easeInOutCubic:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a+b:c/2*((a-=2)*a*a+2)+b},easeInQuart:function(a,b,c,d){return c*(a/=d)*a*a*a+b},easeOutQuart:function(a,b,c,d){return-c*((a=a/d-1)*a*a*a-1)+b},easeInOutQuart:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a*a+b:-c/2*((a-=2)*a*a*a-2)+b},easeInQuint:function(a,b,c,d){return c*(a/=d)*a*a*a*a+b},easeOutQuint:function(a,b,c,d){return c*((a=a/d-1)*a*a*a*a+1)+b},easeInOutQuint:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a*a*a+b:c/2*((a-=2)*a*a*a*a+2)+b},easeInSine:function(a,b,c,d){return-c*Math.cos(a/d*(Math.PI/2))+c+b},easeOutSine:function(a,b,c,d){return c*Math.sin(a/d*(Math.PI/2))+b},easeInOutSine:function(a,b,c,d){return-c/2*(Math.cos(Math.PI*a/d)-1)+b},easeInExpo:function(a,b,c,d){return 0==a?b:c*Math.pow(2,10*(a/d-1))+b},easeOutExpo:function(a,b,c,d){return a==d?b+c:c*(-Math.pow(2,-10*a/d)+1)+b},easeInOutExpo:function(a,b,c,d){return 0==a?b:a==d?b+c:(a/=d/2)<1?c/2*Math.pow(2,10*(a-1))+b:c/2*(-Math.pow(2,-10*--a)+2)+b},easeInCirc:function(a,b,c,d){return-c*(Math.sqrt(1-(a/=d)*a)-1)+b},easeOutCirc:function(a,b,c,d){return c*Math.sqrt(1-(a=a/d-1)*a)+b},easeInOutCirc:function(a,b,c,d){return(a/=d/2)<1?-c/2*(Math.sqrt(1-a*a)-1)+b:c/2*(Math.sqrt(1-(a-=2)*a)+1)+b},easeInElastic:function(a,b,c,d){var e=1.70158,f=0,g=c;return 0==a?b:1==(a/=d)?b+c:(f||(f=.3*d),g<Math.abs(c)?(g=c,e=f/4):e=f/(2*Math.PI)*Math.asin(c/g),-(g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*(2*Math.PI)/f))+b)},easeOutElastic:function(a,b,c,d){var e=1.70158,f=0,g=c;return 0==a?b:1==(a/=d)?b+c:(f||(f=.3*d),g<Math.abs(c)?(g=c,e=f/4):e=f/(2*Math.PI)*Math.asin(c/g),g*Math.pow(2,-10*a)*Math.sin((a*d-e)*(2*Math.PI)/f)+c+b)},easeInOutElastic:function(a,b,c,d){var e=1.70158,f=0,g=c;return 0==a?b:2==(a/=d/2)?b+c:(f||(f=d*(.3*1.5)),g<Math.abs(c)?(g=c,e=f/4):e=f/(2*Math.PI)*Math.asin(c/g),1>a?-.5*(g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*(2*Math.PI)/f))+b:g*Math.pow(2,-10*(a-=1))*Math.sin((a*d-e)*(2*Math.PI)/f)*.5+c+b)},easeInBack:function(a,b,c,d,e){return void 0==e&&(e=1.70158),c*(a/=d)*a*((e+1)*a-e)+b},easeOutBack:function(a,b,c,d,e){return void 0==e&&(e=1.70158),c*((a=a/d-1)*a*((e+1)*a+e)+1)+b},easeInOutBack:function(a,b,c,d,e){return void 0==e&&(e=1.70158),(a/=d/2)<1?c/2*(a*a*(((e*=1.525)+1)*a-e))+b:c/2*((a-=2)*a*(((e*=1.525)+1)*a+e)+2)+b},easeInBounce:function(b,c,d,e){return d-a.animations.easeOutBounce(e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d){return(a/=d)<1/2.75?c*(7.5625*a*a)+b:2/2.75>a?c*(7.5625*(a-=1.5/2.75)*a+.75)+b:2.5/2.75>a?c*(7.5625*(a-=2.25/2.75)*a+.9375)+b:c*(7.5625*(a-=2.625/2.75)*a+.984375)+b},easeInOutBounce:function(b,c,d,e){return e/2>b?.5*a.animations.easeInBounce(2*b,0,d,e)+c:.5*a.animations.easeOutBounce(2*b-e,0,d,e)+.5*d+c}},a}]),angular.module("angular-svg-round-progress").directive("roundProgress",["$window","roundProgressService","roundProgressConfig",function(a,b,c){var d={restrict:"EA",replace:!0,transclude:!0,scope:{current:"=",max:"=",semi:"=",rounded:"=",clockwise:"=",responsive:"=",radius:"@",color:"@",bgcolor:"@",stroke:"@",duration:"@",animation:"@",offset:"@"}};return b.isSupported?angular.extend(d,{link:function(e,f){var g,h,i=!f.hasClass("round-progress-wrapper"),j=i?f:f.find("svg").eq(0),k=j.find("path").eq(0),l=j.find("circle").eq(0),m=angular.copy(c);e.getOptions=function(){return m};var n=function(){var a=m.semi,c=m.responsive,d=+m.radius||0,e=+m.stroke,g=2*d,h=d-e/2-b.getOffset(f,m);j.css({top:0,left:0,position:c?"absolute":"static",width:c?"100%":g+"px",height:c?"100%":(a?d:g)+"px",overflow:"hidden"}),i||(j[0].setAttribute("viewBox","0 0 "+g+" "+(a?d:g)),f.css({width:c?"100%":"auto",position:"relative","padding-bottom":c?a?"50%":"100%":0})),f.css({width:c?"100%":"auto",position:"relative","padding-bottom":c?a?"50%":"100%":0}),k.css({stroke:b.resolveColor(m.color),"stroke-width":e,"stroke-linecap":m.rounded?"round":"butt"}),a?k.attr("transform",m.clockwise?"translate(0,"+g+") rotate(-90)":"translate("+g+", "+g+") rotate(90) scale(-1, 1)"):k.attr("transform",m.clockwise?"":"scale(-1, 1) translate("+-g+" 0)"),l.attr({cx:d,cy:d,r:h>=0?h:0}).css({stroke:b.resolveColor(m.bgcolor),"stroke-width":e})},o=function(c,d,e){var h=b.toNumber(m.max||0),i=c>0?a.Math.min(c,h):0,j=d===i||0>d?0:d||0,l=i-j,n=b.animations[m.animation],o=new a.Date,p=+m.duration||0,q=e||c>h&&d>h||0>c&&0>d||25>p,r=m.radius,s=r-m.stroke/2-b.getOffset(f,m),t=2*r,u=m.semi;q?b.updateState(i,h,s,k,t,u):(a.cancelAnimationFrame(g),function v(){var c=a.Math.min(new Date-o,p);b.updateState(n(c,j,l,p),h,s,k,t,u),p>c&&(g=a.requestAnimationFrame(v))}())},p=Object.keys(d.scope).filter(function(a){return"current"!==a});e.$watchGroup(p,function(a){for(var b=0;b<a.length;b++)"undefined"!=typeof a[b]&&(m[p[b]]=a[b]);n(),e.$broadcast("$parentOffsetChanged"),"inherit"!==m.offset||h?"inherit"!==m.offset&&h&&h():h=e.$on("$parentOffsetChanged",function(){o(e.current,e.current,!0),n()})}),e.$watchGroup(["current","max","animation","duration","radius","stroke","semi","offset"],function(a,c){o(b.toNumber(a[0]),b.toNumber(c[0]))})},template:function(a){for(var c=a.parent(),d="round-progress",e=['<svg class="'+d+'" xmlns="http://www.w3.org/2000/svg">','<circle fill="none"/>','<path fill="none"/>',"<g ng-transclude></g>","</svg>"];c.length&&!b.isDirective(c);)c=c.parent();return c&&c.length||(e.unshift('<div class="round-progress-wrapper">'),e.push("</div>")),e.join("\n")}}):angular.extend(d,{template:'<div class="round-progress" ng-transclude></div>'})}])
////


  $scope.hideLoading = function() {
      $timeout(function() {
          $ionicLoading.hide();
      }, 100);
  };
  $scope.hideLoading();



};  ////     END GAME CONTROLLER     ////
///////      END GAME CONTROLLER     ////

