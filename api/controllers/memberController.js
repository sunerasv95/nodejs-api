const _             = require('lodash');
const Member        = require('../../models').Member;
const Membership    = require('../../models').Membership;
const signToken     = require('../auth/auth').signToken;

//get the ID parameter from the url, find user,
//attached to the req.user and
//passing to next middleware
exports.params = function(req, res, next, id){
      Member.findByPk(id)
            .then(member => {
                if(!member){
                    res.status(400).send({ message: 'No user found with that ID' });
                    return;
                }else{
                    req.member = member;
                    next();
                }
            })
            .catch(error => {
                next(error); 
            })

}

//get all users
exports.getAllUsers = function (req, res, next) {
    //console.log('console log from get all user');
    Member.findAll({
        attributes: { exclude: ['password'] },
        include: [Membership]
    })
        .then(members => {
            res.json(members.map(member => {
                return member.toJson();
            }))
        })
        .catch(error => {
            next(error);
        });
}

//get one user (param function pass the relavent user) 
exports.getOneUser = function(req, res, next){
      Member.findByPk(req.member.id)
            .then(member => {
                res.send(member.toJson());
            })
            .catch(error =>{
                next(error);
            });
}

//update user (param function pass the relavent user) 
exports.updateUser = function (req, res, next) {
    var member = req.member;
    var update = req.body;
    _.merge(member, update);

      member.update(update)
            .then(member => {
                res.status(200).json(member.toJson());
            })
            .catch(error=> {
                next(error);
            });
   
};

//create new user
exports.createUser = function(req, res, next){
    let userInfor = req.body;

      Member.create(userInfor)
            .then(member => {
                member.createMembership({
                    "type": "Monthly",
                    "price": "2000",
                    "isdDate": "2019-01-01",
                    "expDate": "2019-02-01",
                    "status": "1"
                })
                .then(response => {
                    res.status(200).json({ message: 'Ok', success: true, response: response });
                })           
            })
            .catch(error => {
                next(error);
            });
}