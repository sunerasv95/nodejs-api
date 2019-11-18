const router            = require('express').Router();
const decodeToken       = require('../auth/auth').decodeToken;
const getFreshUser      = require('../auth/auth').getFreshUser;
const authenticate      = [decodeToken(), getFreshUser()];
const controller        = require('../controllers/scheduleController');


router
    .param('id', controller.params);

router
    .route('/')
    .get(authenticate, controller.getAll)
    .post(authenticate, controller.createSchedule);

router
    .route('/:id')
    .get(authenticate, controller.getById)
    .put(authenticate, controller.update);


module.exports = router;