angular.module('reposta.controllers', ['cb.x2js'])

.controller('BuscaCtrl', function($scope, $http, x2js) {
  $scope.options = [
    { label: 'one', value: 1 },
    { label: 'two', value: 2 }
  ];
  
  $http.get('data/provincias.do').
    success(function(data, status, headers, config) {
      $scope.provincias  = x2js.xml_str2json(data).provincias.provincia;
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
  });
  
  $scope.loadCiudades = function() {
    // Aquí va la lógica para cargar las ciudades de la provincia
    console.log("Cargar ciudades");  
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
