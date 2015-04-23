angular.module('reposta.controllers', ['cb.x2js'])

.controller('BuscaCtrl', function($scope, $http, $ionicLoading, $ionicPopup, x2js) {

  $http.get('http://geoportalgasolineras.es/combustibles.do?tipoBusqueda=0').
    success(function(data, status, headers, config) {
      $scope.combustibles  = x2js.xml_str2json(data).tiposcombustible.tipocombustible;
    }).
    error(function(data, status, headers, config) {
      $ionicPopup.alert({
        title: 'Error',
        template: 'Lo sentimos, ha habido un error al cargar los datos'
      });
  });
  
  $http.get('http://geoportalgasolineras.es/provincias.do').
    success(function(data, status, headers, config) {
      $scope.provincias  = x2js.xml_str2json(data).provincias.provincia;
    }).
    error(function(data, status, headers, config) {
      $ionicPopup.alert({
        title: 'Error',
        template: 'Lo sentimos, ha habido un error al cargar los datos'
      });
  });
  
  $scope.loadCiudades = function(id_provincia) {
    var uri = "http://geoportalgasolineras.es/municipios.do?idProvincia=" + id_provincia + "&tipoBusqueda=0";
    console.log(uri);
    $http.get(uri).
      success(function(data, status, headers, config) {
        $scope.municipios  = x2js.xml_str2json(data).municipios.m;
        console.log($scope.municipios);
      }).
      error(function(data, status, headers, config) {
        $ionicPopup.alert({
          title: 'Error',
          template: 'Lo sentimos, ha habido un error al cargar los datos'
        });
    });
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
