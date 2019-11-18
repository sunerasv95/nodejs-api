const router          = require('express').Router();
const validate        = require('../auth/auth').validateUser;
const decodeToken     = require('../auth/auth').decodeToken;
const getFreshUser    = require('../auth/auth').getFreshUser;
const authenticate    = [decodeToken(), getFreshUser()];
const controller      = require('../controllers/memberController');


router.param('id', controller.params);

router.route('/')
      .get(controller.getAllUsers)
      .post(validate(), controller.createUser);

router.route('/:id')
      .get(authenticate, controller.getOneUser)
      .put(authenticate, controller.updateUser);

module.exports = router;