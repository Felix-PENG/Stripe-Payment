angular.module('customerApp.services', []).factory('Movie', function($resource) {
  //return $resource('http://movieapp-sitepointdemos.rhcloud.com/api/movies/:id',
  return $resource('https://r6am5z4kml.execute-api.us-east-1.amazonaws.com/prod/customers/:id', 
  {
    id: '@email'
  }, {
    create: {
      method: 'POST',
      url: 'https://r6am5z4kml.execute-api.us-east-1.amazonaws.com/prod/customers',
    },
    update: {
      method: 'PUT'
    }
  });
}).service('popupService', function($window) {
  this.showPopup = function(message) {
    return $window.confirm(message);
  }
});