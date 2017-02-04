angular.module('customerApp', ['ui.router', 'ngResource', 'customerApp.controllers', 'customerApp.services']);

angular.module('customerApp').config(function($stateProvider, $httpProvider) {
  $stateProvider.state('customers', {
    url: '/customers',
    templateUrl: 'partials/customers.html',
    controller: 'CustomerListController'
  }).state('viewCustomer', {
    url: '/customers/:id/view',
    templateUrl: 'partials/customer-view.html',
    controller: 'CustomerViewController'
  }).state('newCustomer', {
    url: '/customers/new',
    templateUrl: 'partials/customer-add.html',
    controller: 'CustomerCreateController'
  }).state('editCustomer', {
    url: '/customers/:id/edit',
    templateUrl: 'partials/customer-edit.html',
    controller: 'CustomerEditController'
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
  $state.go('customers');
});