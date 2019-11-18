const _             = require('lodash');
const Exercise      = require('../../models').Exercise;


exports.params = function(req, res, next, id){
    Exercise.findByPk(id)
            .then(exercise => {
                if(!exercise){
                    res.status(400).send({ message: 'No exercise found with that ID' });
                    return;
                }else{
                    req.exercise = exercise;
                    next();
                }
            })
            .catch(error => {
                next(error);
            });
}

// getting all exercises
exports.get = function(req, res, next){
    Exercise.findAll()
            .then(exercises => {
                res.json(exercises.map(exercise => {
                    return exercise;
                }));
            })
            .catch(error =>{
                next(error); 
            });
}

// getting single exercise
exports.getOne = function(req, res, next){
    Exercise.findByPk(req.exercise.id)
            .then(exercise => {
                res.status(200).json(exercise);
            })
            .catch(error => {
                next(error);
            })
}

//update exercise
exports.put = function(req, res, next){
    var exercise = req.exercise;
    var update = req.body;
    
    _.merge(exercise, update);
    exercise.update(update)
            .then(exercise => {
                res.status(200).json(exercise);
            })
            .catch(error=> {
                next(error);
            });
}

//create exercise
exports.create = function(req, res, next){
    var req = req.body;

    Exercise.create(req)
            .then(exercise => {
                res.status(200).json(exercise);
            })
            .catch(error => {
                next(error);
            })
}

