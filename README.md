
ExpenseTracker | Tracking monthly expenses for money management

This project users the following:

HTML
CSS
JavaScript
Handlebars
Node.JS - Express
PostgreSQL
AWS


const passport = require('passport')
  , GitHubStrategy = require('passport-github').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , GoogleStrategy = require('passport-google').Strategy;
// const GitHubStrategy = require('passport-github').Strategy;
const cookieParser = require('cookie-parser');
const User = require('./server/models/User');

const setupAuth = (app) => {
  app.use(cookieParser());   // #1 sets up the cookie middleware

  app.use(session({  // #2 sets up the session middleware
    secret: 'whatever',
    resave: true,
    saveUninitialized: true
  }));

  passport.use(new GitHubStrategy({ // #3 sets up passport strategy
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/github/auth'
  }, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({
      where: {
        github_id: profile.id
      }
    }).then(result => {
      return done(null, result[0]);
    }).catch(done)
  }));

  passport.use(new FacebookStrategy({
    clientID: '[FBID]',
    clientSecret: '[FBSECRET]',
    callbackURL: 'https://127.0.0.1:'+port+'/facebook-token'
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));


  passport.serializeUser(function(user, done) { // #4 call passport.serializeUser // This configures how passport turns a user object into something it can track in a session.
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) { // #5 call passport.serializeUser // This configures how passport checks what's in the session to see if the login is still valid.
    done(null, id);
  });

  app.use(passport.initialize()); // #6 initialize passport middleware and register it with express
  app.use(passport.session()); // #7 start passport's session management middleware and register it with express

  // #8 register our login, logout, and auth routes
  app.get('/login', passport.authenticate('github'));
  app.get('/login/facebook', passport.authenticate('facebook'));

  app.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
  });

  app.get('/github/auth',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/facebook-token', passport.authenticate('facebook', { failureRedirect: '/error' }),
  function(req, res){
    res.send('Logged In.');
  });
};

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // denied. redirect to login
  res.redirect( '/login');
}


module.exports = setupAuth;
module.exports.ensureAuthenticated = ensureAuthenticated;