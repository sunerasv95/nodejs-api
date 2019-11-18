const router            = require('express').Router();
const decodeToken       = require('../auth/auth').decodeToken;
const getFreshUser      = require('../auth/auth').getFreshUser;
const authenticate      = [decodeToken(), getFreshUser()];
const controller        = require('../controllers/exerciseScheduleController');

router
    .param('sid', controller.params);

router
    .route('/:sid')
    .get(controller.getExercisesBySchedule);

module.exports = router;