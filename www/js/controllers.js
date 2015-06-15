angular.module('garagedoor.controllers', [])

.controller('HomeCtrl', function($scope, ConfigService) {
  $scope.test = function() {
    console.log(JSON.stringify(ConfigService.getConfig()));
  }
})

.controller('TempCtrl', function($scope, ConfigService,$window,$sce) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change. 
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
    alert("View Enter")
  });
  $scope.config=ConfigService.getConfig();
  $scope.width=$window.screen.width;
  $scope.link=$sce.trustAsResourceUrl("http://api.thingspeak.com/channels/"+$scope.config.minChan+"/charts/1?width="+$window.screen.width+"&height=260&results=1000&dynamic=true&title=Per%20Minute%20Temp");

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
