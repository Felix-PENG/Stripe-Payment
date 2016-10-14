angular.module('customerApp', ['ui.router', 'ngResource', 'customerApp.controllers', 'customerApp.services']);

angular.module('customerApp').config(function($stateProvider, $httpProvider) {
  $stateProvider.state('movies', {
    url: '/movies',
    templateUrl: 'partials/movies.html',
    controller: 'MovieListController'
  }).state('viewMovie', {
    url: '/movies/:id/view',
    templateUrl: 'partials/movie-view.html',
    controller: 'MovieViewController'
  }).state('newMovie', {
    url: '/movies/new',
    templateUrl: 'partials/movie-add.html',
    controller: 'MovieCreateController'
  }).state('editMovie', {
    url: '/movies/:id/edit',
    templateUrl: 'partials/movie-edit.html',
    controller: 'MovieEditController'
  }).state('addresses', {
    url: '/addresses',
    templateUrl: 'partials/addresses.html',
    controller: 'AddressListController'
  }).state('viewAddress', {
    url: '/addresses/:id/view',
    templateUrl: 'partials/address-view.html',
    controller: 'AddressViewController'
  }).state('newAddress', {
    url: '/address/new',
    templateUrl: 'partials/address-add.html',
    controller: 'AddressCreateController'
  }).state('editAddress', {
    url: '/addresses/:id/edit',
    templateUrl: 'partials/address-edit.html',
    controller: 'AddressEditController'
  });
}).run(function($state) {
  $state.go('movies');
});