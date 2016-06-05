angular
    .module('app')
    .factory('dataservice', dataservice);

dataservice.$inject = ['$http', '$q'];

function dataservice($http, $q) {
    return {
        getCards: getCards
    };

    function getCards() {
        return $http.get('api/card_types.json')
            .then(getCardsComplete)
            .catch(getCardsFailed);

        function getCardsComplete(response) {
            // console.log(response.data);
            return response.data;
        }

        function getCardsFailed(error) {
            console.log('XHR Failed for getCards.' + error.data);
        }
    }
}