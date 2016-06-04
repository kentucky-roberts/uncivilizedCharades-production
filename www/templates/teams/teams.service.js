
angular
  .module('app')
    .factory('TeamsService', TeamsService);
/*
*  @AppController
*/
function TeamsService() {
  var service = {
      newTeams: newTeams
    };
    /**
     * New Player Object
     * @param playerName
     * @param initialScore
     * @constructor
     */
    function Teams(team1, team2) {
      this.team1 = team1;
      this.team2 = team2;
    }

    Teams.prototype.logInfo = function () {
      console.log(
        "team1: " + this.team1,
        "team2: " + this.team2
      );
    };
    /**
     * Creates a new teams object
     * @param team1
     * @param team2
     * @returns {TeamService.Team}
     */
    function newTeams(team1, team2) {
      var teams = new Teams(team1, team2);
      console.log(teams);
      return teams;
    }
    return service;
}