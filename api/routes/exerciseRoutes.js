const router            = require('express').Router();
const decodeToken       = require('../auth/auth').decodeToken;
const getFreshUser      = require('../auth/auth').getFreshUser;
const authenticate      = [decodeToken(), getFreshUser()];
const controller        = require('../controllers/exerciseController');

router.param('id', controller.params);

router
    .route('/')
    .get(authenticate, controller.get)
    .post(authenticate, controller.create);

router
    .route('/:id')
    .get(authenticate, controller.getOne)
    .put(authenticate, controller.put);


module.exports = router;