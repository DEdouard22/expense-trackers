const passport = require('passport')
  , GitHubStrategy = require('passport-github').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , LocalStrategy = require('passport-local').Strategy;
// const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const models = require('./server/models');

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
    callbackURL: `${process.env.APP_URL}/github/auth`
  }, (accessToken, refreshToken, profile, done) => {
    models.User.findOrCreate({
      where: {
        github_id: profile.id
      }
    }).then(result => {
      return done(null, result[0]);
    }).catch(done)
  }));

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.APP_URL}/auth/facebook/callback`
  },
  function(accessToken, refreshToken, profile, done) {
    models.User.findOrCreate({
      where: {
        facebook_id: profile.id
      }
    }).then(result => {
      return done(null, result[0]);
    }).catch(done)
  }));

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
function(email, password, done) {
    models.User.findOrCreate({ 
    where: {
        email: email,
        password: password
    }
}).then(function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    if (!user.verifyPassword(password)) { return done(null, false); }
    return done(null, user);
})}));

  passport.serializeUser(function(user, done) { // #4 call passport.serializeUser // This configures how passport turns a user object into something it can track in a session.
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) { // #5 call passport.serializeUser // This configures how passport checks what's in the session to see if the login is still valid.
    done(null, id);
  });

  app.use(passport.initialize()); // #6 initialize passport middleware and register it with express
  app.use(passport.session()); // #7 start passport's session management middleware and register it with express

  // #8 register our login, logout, and auth routes
  app.get('/login', (req, res) => {
    res.render('login');
  })
  app.get('/login/github', passport.authenticate('github'));
  app.get('/login/facebook', passport.authenticate('facebook'));

  

  app.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
  });

  app.get('/github/auth',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });

  app.get('/facebook-token', 
  passport.authenticate('facebook', { failureRedirect: '/error' }),
  function(req, res){
    res.send('Logged In.');
  });

  app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/'); // should be what Cristian is working on. His page. 
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