const router                    = require('express').Router();
const memberRoutes              = require('./memberRoutes');
const membershipRoutes          = require('./membershipRoutes');
const exerciseRoutes            = require('./exerciseRoutes');
const scheduleRoutes            = require('./scheduleRoutes');
const scheduleUserRoutes        = require('./scheduleUserRoutes');
const exerciseScheduleRoutes    = require('./exerciseScheduleRoutes');


router.use('/users', memberRoutes);
router.use('/memberships', membershipRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/sch/u/', scheduleUserRoutes);
router.use('/ex/sch/', exerciseScheduleRoutes);

module.exports = router;