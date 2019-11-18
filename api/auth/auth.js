const jwt           = require('jsonwebtoken');
const expressJwt    = require('express-jwt');
const validator     = require('validator');
const Member        = require('../../models').Member;
const appConfig     = require('../../config/appConfig');
const checkToken    = expressJwt({ secret: appConfig.passport.jwt_encryption });


exports.decodeToken = function () {
  return function (req, res, next) {
    
    //extract jwt token from query string/header 
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }

    // this will call next if token is valid
    // and send error if its not. It will attached
    // the decoded token to req.user
    checkToken(req, res, next);
  };
};


//after token decoded successfully
//get a fresh user object
exports.getFreshUser = function () {
  return function (req, res, next) {
    Member.findByPk(req.user.id)
        .then(user => {
          if (!user) {
            res.status(401).send({ message: 'Unauthorized!' });
          } else {
            req.user = user;
            next();
          }
        })
        .catch(error => {
          next(error);
        });
    // res.status(200).send('CONSOLE LOG FROM FRESH USER: '+req.user.id);
  }
};


//user validation in sign in
exports.verifyUser = function () {
  return function (req, res, next) {
    var username = req.body.email;
    var password = req.body.password;

    // if no username or password then send
    if (validator.isEmpty(username)) {
      res.status(400).send({ message: 'You need an email address' });
      return;
    } else if (validator.isEmpty(password)) {
      res.status(400).send({ message: 'You need a password' });
      return;
    }
    //

    // look user up in the DB so we can check
    // if the passwords match for the username
    Member.findOne({ where: { email: username } })
        .then(user => {
          if (!user) {
            res.status(401).send({ message: 'Wrong email is provided' });
          } else {
            // checking the passowords here
            if (!user.authenticate(password)) {
              res.status(401).send({ message: 'Wrong password' });
            } else {
              // if everything is good,
              // then attach to req.user
              // and call next so the controller
              // can sign a token from the req.user._id
              req.user = user;
              next();
            }
          }
        })
        .catch(error => {
          next(error);
        });
  };
};


//user validation in sign up
exports.validateUser = function () {
  return function (req, res, next) {
    var username = req.body.email;
    var password = req.body.password;

    // if no username or password then send
    if (username === undefined || username === "") {
      res.status(400).send({ message: 'You need an email address!' });
      return;
    } else if (password === undefined || password === "") {
      res.status(400).send({ message: 'You need a password!' });
      return;
    } else if (!validator.isEmail(username)) {
      res.status(400).send({ message: 'Invalid email address format' });
      return;
    } else {
      Member.findOne({ where: { email: username } })
          .then(user => {
            if (user) {
              res.status(400).send({ message: 'Email address already used!' });
              return;
            } else {
              next();
            }
          })
          .catch(error => {
            next(error);
          })
    }
  }
}

// util method to sign tokens on signup
exports.signToken = function (id) {
  return jwt.sign(
    { id: id },
    appConfig.passport.jwt_encryption,
    { expiresIn: appConfig.passport.jwt_expiration }
  );
};