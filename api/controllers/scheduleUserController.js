const Schedule = require('../../models').Schedule;
const Exercise = require('../../models').Exercise;;


// filter schedules by user
exports.getScheduleByUser = function (req, res, next) {

    let uid = req.user.id;

    Schedule.findAll({ where: { membershipId: uid } })
        .then(schedules => {
            if (!schedules) {
                res.status(200).send({ message: 'No schedules to show!' })
            } else {
                res.json(schedules.map(schedule => {
                    return schedule;
                }));
            }
        })
        .catch(error => {
            next(error);
        })
}