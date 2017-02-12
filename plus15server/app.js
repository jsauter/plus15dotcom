
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , RoutesRegistry = require('./routeRegistry.js')
  , Config = require('./config.js')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , AuthenticationService = require('./services/').AuthenticationService;

//TODO: store user sessions in the database so we can distrubute this later
var users = [];

function findById(id, fn) {
  var idx = id;

  for(var user in users)
  {
    if(users[user]._id == id)
    {
      fn(null, users[user]);
      return;
    }
  }

  fn(new Error('User ' + id + ' does not existt'));
}

passport.serializeUser(function(user, done) {
  console.log("adding user to session store");
  users.push(user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("trying to find user of id : " + id);
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {

      var authenticationService = new AuthenticationService();

      authenticationService.findByUsername(username, function(err, user) {
        if (err)
        {
          console.log(err);
          return done(err);
        }
        if (!user)
        {
          return done(null, false, { message: 'Unknown user ' + username });
        }
        if (user.password != password)
        {
          return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
      });
  }
));


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  Config.shaw.cacheData = false;
});

app.configure('production', function() {
  Config.shaw.cacheData = true;
  config.shaw.cacheTimeout = 1800000;
});

var registry = new RoutesRegistry(app);

registry.setupRoutes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
