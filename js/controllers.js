angular.module('customerApp.controllers', []).controller('MovieListController', function($scope, $state, popupService, $window, Movie, Address) {

    $scope.movies = Movie.query();

    $scope.deleteMovie = function(movie) {
        if (popupService.showPopup('Really delete this?')) {
            movie.$delete(function() {
                console.log("delete success");
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
}).controller('AddressListController', function($scope, $state, popupService, $window, Address) {

    $scope.addresses = Address.query();

    $scope.deleteAddress = function(address) {
        if (popupService.showPopup('Really delete this?')) {
            address.$delete(function() {
                console.log("delete success");
                $scope.addresses = Address.query();
            });
        }
    }
}).controller('AddressViewController', function($scope, $stateParams, Address) {
    $scope.address = Address.get({
        id: $stateParams.id
    });
}).controller('AddressCreateController', function($scope, $state, $stateParams, Address) {

    $scope.address = new Address();

    $scope.addAddress = function() {
        Address.create($scope.address, function() {
            $state.go('addresses');
        });
    };
}).controller('AddressEditController', function($scope, $state, $stateParams, Address) {

    $scope.updateAddress = function() {
        $scope.address.$update(function() {
            $state.go('addresses');
        });
    };

    $scope.loadAddress = function() {
        $scope.address = Address.get({
            id: $stateParams.id
        });
    };

    $scope.loadAddress();
});