const _ = require('lodash')
const Schedule = require('../../models').Schedule;
const Exercise = require('../../models').Exercise;;


exports.params = function (req, res, next, id) {
    Schedule.findByPk(id)
        .then(schedule => {
            if (!schedule) {
                res.status(400).send({ message: 'No schedule found with that ID' });
                return;
            } else {
                req.schedule = schedule;
                next();
            }
        })
        .catch(error => {
            next(error);
        });
}


//get all schedules
exports.getAll = function (req, res, next) {
    Schedule.findAll()
        .then(schedules => {
            res.json(schedules.map(schedule => {
                return schedule;
            }));
        })
        .catch(error => {
            next(error);
        });
}

//getting single schedule 
exports.getById = function (req, res, next) {
    Schedule.findByPk(req.schedule.id)
        .then(schedule => {
            res.status(200).json(schedule);
        })
        .catch(error => {
            next(error);
        })
}


//update schedule
exports.update = function (req, res, next) {
    var schedule = req.schedule;
    var update = req.body;
    _.merge(schedule, update);

    schedule.update(update)
        .then(schedule => {
            res.status(200).json(schedule);
        })
        .catch(error => {
            next(error);
        });
}


//create schedule
exports.createSchedule = function (req, res, next) {
    let exInfor = {};
    let reqData = req.body;
    let exercises = reqData.exerciseId;

    Schedule.create(reqData)
        .then(schedule => {
            schedule.addExercises(exercises, {
                through: { "day": "1", "sets": '3', "reps": '8', "rest": '5' }
            })
                .then(exercises => {
                    res.send([schedule, exercises]);
                })
                .catch(error => {
                    res.status(401).send(error);
                })
        })
        .catch(error => {
            next(error);
        })


}

