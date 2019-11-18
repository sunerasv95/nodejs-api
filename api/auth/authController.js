var signToken = require('./auth').signToken;

exports.signin = function(req, res, next) {
  //token will generate after verified the user
  var token = signToken(req.user.id);
  res.status(200).send({
    success: true,
    message: 'Ok',
    token: token
   
  });
};
