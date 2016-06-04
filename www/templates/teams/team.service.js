
angular
  .module('app')
    .factory('TeamService', TeamService);
/*
*  @GameController
*/
function TeamService() {
  var service = {
      newTeam: newTeam
    };
    /**
     * New Player Object
     * @param playerName
     * @param initialScore
     * @constructor
     */
    function Team(teamName, originalScore) {
      this.teamName = teamName;
      this.originalScore = 0;
      this.score = this.originalScore;
    }

    Team.prototype.logInfo = function () {
      console.log(
        "teamName: " + this.teamName,
        "originalScore: " + this.originalScore,
        "score: " + this.score
      );
    };

    Team.prototype.changeScore = function(amountToChange){
        if(!angular.isDefined(this.score)){
            this.score = this.originalScore;
        }
        this.score += amountToChange;
    };

    Team.prototype.addPoint = function () {
      this.score ++;
      console.log(this.teamName, this.score);
    };

    Team.prototype.removePoint = function(){
      this.score --;
      console.log(this.score);
    };

    Team.prototype.resetScore = function () {
      this.score = originalScore;
      console.log(this.score);
    };



    /**
     * Creates a new team object
     * @param teamName
     * @param originalScore
     * @returns {TeamService.Team}
     */
    function newTeam(teamName, originalScore) {
      var team = new Team(teamName, originalScore);
      console.log(team);
      return team;
    }
    return service;
}