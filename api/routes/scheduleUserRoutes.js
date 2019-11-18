const router            = require('express').Router();
const decodeToken       = require('../auth/auth').decodeToken;
const getFreshUser      = require('../auth/auth').getFreshUser;
const authenticate      = [decodeToken(), getFreshUser()];
const controller        = require('../controllers/scheduleUserController');

router
    .route('/')
    .get(authenticate, controller.getScheduleByUser);

module.exports = router;