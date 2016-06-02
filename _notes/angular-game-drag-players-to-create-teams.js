   /**
       * DragPlayers to make Teams
       *
       *
       **/
      $scope.centerAnchor = true;

      $scope.toggleCenterAnchor = function() {
          $scope.centerAnchor = !$scope.centerAnchor;
      };

      $scope.droppedObjects1 = [];
      $scope.droppedObjects2 = [];

      $scope.onDropComplete1 = function(data, evt) {
          var index = $scope.droppedObjects1.indexOf(data);
          var player = $scope.players.indexOf(data);
          console.log(data);

          game.joinTeam1(player);
          $scope.soundClickOn();

          if (index == -1) {
              $scope.droppedObjects1.push(data);

          }
          if (player > -1) {
              $scope.players.splice(player, 1);
          }

          if ($scope.players.length === 0 ) {
              game.readyToStart  = true;
          }

      };

      $scope.onDragSuccess1 = function(data, evt) {

          var index = $scope.droppedObjects1.indexOf(data);
          console.log(index);

          if (index > -1) {
              $scope.droppedObjects1.splice(index, 1);
          }
      };

      $scope.onDragSuccess2 = function(data, evt) {
          var index = $scope.droppedObjects2.indexOf(data);
          console.log(index);

          if (index > -1) {
              $scope.droppedObjects2.splice(index, 1);
          }
      };

      $scope.onDropComplete2 = function(data, evt) {
          var index = $scope.droppedObjects2.indexOf(data);
          var player = $scope.players.indexOf(data);
          $scope.soundClickOn();

          game.joinTeam2(player);

          if (index == -1) {
              $scope.droppedObjects2.push(data);
          }

          if (player > -1) {
              $scope.players.splice(player, 1);
          }

          if ($scope.players.length === 0 ) {
              game.readyToStart  = true;
          }
      };

      var inArray = function(array, player) {
          var index = array.indexOf(player);
      };

      game.joinTeam1 = function(index) {
        game.players[index].team = "Team 1";
        console.log("newTeam1Player.team: " + game.players[index].team );
      };
      game.joinTeam2 = function(index) {
        var newTeam2Player = game.players[index];
        newTeam2Player.team = "Team 2";
        console.log("newTeam2Player.team: " + newTeam2Player.team);
      };

      game.addPoint = function(index) {  // dev-button built to test player interaction on step 1 -> ng-repeat passes in the $index
        var activePlayer = game.players[index];
        activePlayer.score += 1;
        console.log("Add point to activePlayer.name: " + activePlayer.name + "score: " + activePlayer.score);
      };

      game.addNewPlayer = function(playerName) {
        var newPlayer = PlayerService.newPlayer(playerName);
        console.log(newPlayer);
        game.players.push(angular.extend({}, newPlayer));
                console.log("game.players: " + game.players.length);
        $scope.players = angular.copy(game.players);
        console.log("$scope.players.lenngth: " + $scope.players.length);

                $scope.closeModal();

      };
