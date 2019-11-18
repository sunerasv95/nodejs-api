const Schedule          = require('../../models').Schedule;
const Exercise          = require('../../models').Exercise;
const ScheduleExercise  = require('../../models').ScheduleExercise;


exports.params = function(req, res, next, id){
    Schedule.findByPk(id)
          .then(schedule => {
              if(!schedule){
                  res.status(400).send({ message: 'No schedule found with that ID' });
                  return;
              }else{
                  req.schedule = schedule;
                  next();
              }
          })
          .catch(error => {
              next(error); 
          })
}


// filter schedules by user
exports.getExercisesBySchedule = function (req, res, next) {

    let schedule = req.schedule;
    
    schedule.getExercises()
            .then(exercise => {
                res.status(200).json({ message: 'Ok', success: true, data: exercise });
            })
            .catch(error => {
                console.log(error);
            })
}