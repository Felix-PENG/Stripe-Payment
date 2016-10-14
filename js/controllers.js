angular.module('customerApp.controllers', []).controller('CustomerListController', function($scope, $state, popupService, $window, Customer, Address) {

    $scope.customers = Customer.query();

    $scope.deleteCustomer = function(customer) {
        if (popupService.showPopup('Really delete this?')) {
            customer.$delete(function() {
                console.log("delete success");
                $window.location.href = '';
            });
        }
    }

}).controller('CustomerViewController', function($scope, $stateParams, Customer) {

    $scope.customer = Customer.get({
        id: $stateParams.id
    });

}).controller('CustomerCreateController', function($scope, $state, $stateParams, Customer) {

    $scope.customer = new Customer();

    $scope.addCustomer = function() {
        Customer.create($scope.customer, function() {
            $state.go('customers');
        });
        // $scope.customer.$save(function() {
        //     $state.go('customers');
        // });
    }

}).controller('CustomerEditController', function($scope, $state, $stateParams, Customer) {

    $scope.updateCustomer = function() {
        $scope.customer.$update(function() {
            $state.go('customers');
        });
    };

    $scope.loadCustomer = function() {
        $scope.customer = Customer.get({
            id: $stateParams.id
        });
    };

    $scope.loadCustomer();
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