angular.module('customerApp.controllers', []).controller('MovieListController', function($scope, $state, popupService, $window, Movie) {

    $scope.movies = Movie.query();

    $scope.deleteMovie = function(movie) {
        if (popupService.showPopup('Really delete this?')) {
            movie.$delete(function() {
                $window.location.href = '';
            });
        }
    }

}).controller('MovieViewController', function($scope, $stateParams, Movie) {

    $scope.customer = Movie.get({
        id: $stateParams.id
    });

}).controller('MovieCreateController', function($scope, $state, $stateParams, Movie) {

    $scope.customer = new Movie();

    $scope.addCustomer = function() {
        Movie.create($scope.customer, function() {
            $state.go('movies');
        });
        // $scope.customer.$save(function() {
        //     $state.go('movies');
        // });
    }

}).controller('MovieEditController', function($scope, $state, $stateParams, Movie) {

    $scope.updateMovie = function() {
        $scope.customer.$update(function() {
            $state.go('movies');
        });
    };

    $scope.loadMovie = function() {
        $scope.customer = Movie.get({
            id: $stateParams.id
        });
    };

    $scope.loadMovie();
});