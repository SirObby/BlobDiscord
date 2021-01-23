exports.init = (client) => {

const express = require('express');
const Strategy = require("passport-discord").Strategy;
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const session = require("express-session");
const app = express();
const fs =require("fs")
const port = 1159;

app.use(express.static("website"));

app.use(bodyParser.json())

    app.use(bodyParser.urlencoded({
        extended: true
    }));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get("/auth/login", (req, res, next) => {	
next();
}); // Hi

function loggedin(req, res, user) {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BlobDiscord</title>
      <style>
          * {
              font-family: Arial, Helvetica, sans-serif;
          }
      </style>
  </head>
  <body>
      
      <nav style="position: absolute; top: 0px; height: 25px; font-size: 25px;">BlobDiscord <span style="position: fixed; right: 0px;"><img style="height: 25px;" src="https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}" alt="">${req.user.username}</span></nav>
  
  </body>
  </html>
  `)
    
}

  passport.use(new Strategy({
    clientID:  "795196567241883659",
    clientSecret: "VMDkbBQqoO-XdN2LODkb96tiXPjR8gQ-",
    callbackURL: "http://localhost:1159/auth/callback",
    scope: ["identify", "guilds.join"]
  }, 
  (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile)); 
  }));
  app.use(session ({
    secret: "eeee",
    resave: false,
    saveUninitialized: false
  }))
  .use(passport.initialize())
  .use(passport.session())
  
  app.use(passport.initialize());
  app.use(passport.session());
  app.locals.domain = "localhost:1159"; // Here another error
  
  app.get("/auth/login", (req, res, next) => {	
  next(); // I dunno what happens dude
  },

passport.authenticate("discord"));
app.get('/auth/', passport.authenticate('discord'));
app.get('/auth/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {    
if(req.session.backURL) {
    res.redirect(req.session.backURL)
} else { res.redirect("/"); }

});
    
app.post('/settings', (req, res) => {
  
console.log(req.body)

})

app.get("/auth/logout", function(req, res) {
    req.session.destroy(() => {
        req.logout();
        res.redirect("/")
    });
});

    app.get("/test", (req,res) => {
      res.json({user: req.user});
    });

    app.get('/', (req, res) => {
      if (!req.user) return res.redirect('/auth/')//res.send("Not logined!");
      if (req.user) return loggedin(req, res, req.user)//res.send("Hello: " + req.user.username);
    })

  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) 
// CLIENT ID: 795196567241883659
// CLIENT SECRET: VMDkbBQqoO-XdN2LODkb96tiXPjR8gQ-
}