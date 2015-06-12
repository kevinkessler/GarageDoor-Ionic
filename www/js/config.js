angular.module("config.service",[])
.service('ConfigService',['$window', function($window){
	//$window.localStorage['config']='{}'
	var config=JSON.parse($window.localStorage['config'] || '{}')
	
	console.log("config.service")

	return {
		getConfig: function() {
			console.log("getConfig "+JSON.stringify(config))
			return config;
		},
		setConfig: function(newConfig) {
			console.log("Set "+JSON.stringify(newConfig));
			this.config=newConfig;
			$window.localStorage['config']=JSON.stringify(this.config)
		},
 		reloadConfig: function() {
 			config=JSON.parse($window.localStorage['config'] || '{}');
 			console.log("Reload "+JSON.stringify(config));
 			return config;
 		}
	}
}])