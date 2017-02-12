var controllers = require('./../controllers/');
var passport = require('passport');

exports.setupRoutes = function() {

	return [
			{	route: {
					path: "/",
					verb: "get",
	                action: new controllers.HomeController().getIndex,
				    views: {
	                    html: "index"
	                }
	            }	        
	    },
        {	route: {
	        	path: "/locations",
	        	verb: "get",
	        	action: new controllers.LocationController().getLocations,
	        	views : {
	        		html: "locations",
	        		json: "json"
	        	}
	        }
        },
        {
        	route: {
        		path: "/login",
        		verb: "get",
        		action: new controllers.LoginController().login,
                        views : {
        			html: "login"
        		}
        	}
        },
        {
        	route : {
        		path: "/login",
        		verb: "post",
        		action: new controllers.LoginController().redirect,
                        auth: passport.authenticate('local', { failureRedirect: '/login' }),
        		views: {
                                html: "login"
        		}
        	}
        },
        {
                route : {
                        path: "/manage",
                        verb: "get",
                        action: new controllers.ManageController().getLocations,
                        auth: checkAuthenticated,
                        views : {
                                html: "manage"
                        }
                }
        }

	];

}

var checkAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}