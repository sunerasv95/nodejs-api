const router            = require('express').Router();
const decodeToken       = require('../auth/auth').decodeToken;
const getFreshUser      = require('../auth/auth').getFreshUser;
const authenticate      = [decodeToken(), getFreshUser()];
const controller        = require('../controllers/membershipController');

router.param('id', controller.params);

router
    .route('/')
    .get(authenticate, controller.getAll)

router
    .route('/:id')
    .get(authenticate, controller.getById)
    .put(authenticate, controller.updateMembership);


module.exports = router;