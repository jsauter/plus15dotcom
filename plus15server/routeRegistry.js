var passport = require('passport');

/*
Registry for routes into the application
*/

var routes = require('./routes');

var RouteRegistry = function(app) {
	this.app = app;  
};
 

RouteRegistry.prototype = {
	setupRoutes : function(){

		var mappedRoutes = routes.setupRoutes();
		
		for(var i in mappedRoutes)
		{
			console.log(mappedRoutes[i]);
			if(mappedRoutes[i].route.verb == 'get')
			{
				if(mappedRoutes[i].route.auth == undefined)
				{
					this.app.get(mappedRoutes[i].route.path, mappedRoutes[i].route.action);	
				}
				else
				{
					this.app.get(mappedRoutes[i].route.path, mappedRoutes[i].route.auth, mappedRoutes[i].route.action);	 
				}
			}
			else if(mappedRoutes[i].route.verb == 'post')
			{
				if(mappedRoutes[i].route.auth == undefined)
				{
					this.app.post(mappedRoutes[i].route.path, mappedRoutes[i].route.action);	
				}
				else
				{	
					this.app.post(mappedRoutes[i].route.path, mappedRoutes[i].route.auth, mappedRoutes[i].route.action);						
				}
			}
		}
	}	
};



module.exports = RouteRegistry;