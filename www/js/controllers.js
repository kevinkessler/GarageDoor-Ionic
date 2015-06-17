angular.module('garagedoor.controllers', [])

.controller('HomeCtrl', function($scope, ConfigService, $cordovaToast,$http) {

  $scope.config=ConfigService.getConfig();

  $scope.light = function() {
    var url="https://api.particle.io/v1/devices/"+$scope.config.deviceID+"/command";
    var params={
      "args":"light"
    };
    var headers= {
      "Authorization": "Bearer "+$scope.config.apiKey
    };
    var config={
      "headers":headers
    };

    $http.post(url,params,config)
      .success(function(data,status){
        if(data.return_value==0)
        {
          $cordovaToast.show('Light Successful', 'long', 'bottom')
        }
        else {
          $cordovaToast.show('Light Failed', 'long', 'bottom')
        }
        console.log("Particle Call Success "+JSON.stringify(data))
      })
      .error(function(data,status){
        $cordovaToast.show('Light Failed', 'long', 'bottom');
        console.log("Particle Call Error "+JSON.stringify(data)+" "+status)
      }) 
  }
})
.controller('TempCtrl', function($scope, ConfigService,$window,$sce,$ionicSlideBoxDelegate) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change. 
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
    $scope.width=$window.screen.width;
    $scope.height=$window.screen.height / 3;
    $scope.minlink=$sce.trustAsResourceUrl("http://api.thingspeak.com/channels/"+
      $scope.config.minChan+"/charts/1?api_key="+
      $scope.config.minChanKey+
      "&width="+$window.screen.width+"&height="+
      $scope.height+"&results=1000&dynamic=true&title=");
    $scope.hourlink=$sce.trustAsResourceUrl("http://api.thingspeak.com/channels/"+
      $scope.config.hourChan+"/charts/1?api_key="+
      $scope.config.hourChanKey+
      "&width="+$window.screen.width+"&height="+
      $scope.height+"&results=1000&dynamic=true&title=");

  });

  $scope.config=ConfigService.getConfig();
  $scope.prevSlide=function() {
    $ionicSlideBoxDelegate.previous();
  }
  $scope.nextSlide=function() {
    $ionicSlideBoxDelegate.next();
  }

})

.controller('ConfigCtrl', function($scope,$ionicModal,ConfigService) {
  $scope.newConfig=ConfigService.getConfig();

  $scope.save = function() {
    console.log("Before Set "+JSON.stringify($scope.newConfig))
    ConfigService.setConfig($scope.newConfig);
    $scope.modal.hide();
  }

  $scope.cancel=function() {
    $scope.newConfig=ConfigService.reloadConfig();
    $scope.modal.hide();
  }

  $ionicModal.fromTemplateUrl('templates/modal-config.html',{
    scope:$scope
  }).then(function(modal){
    $scope.modal=modal;
  });
});
