const _            = require('lodash');
const Membership   = require('../../models').Membership;
const Member       = require('../../models').Member;


exports.params = function(req, res, next, id){
    Membership.findByPk(id)
            .then(membership => {
                if(!membership){
                    res.status(400).send({ message: 'No membership found with that ID' });
                    return;
                }else{
                    req.membership = membership;
                    next();
                }
            })
            .catch(error => {
                next(error);
            });
}

// getting all membership
exports.getAll = function(req, res, next){
    Membership.findAll({ include: [Member]})
            .then(memberships => {
                res.json(memberships.map(membership => {
                    return membership;
                }));
            })
            .catch(error =>{
                next(error); 
            });
}

// getting single membership
exports.getById = function(req, res, next){
    Membership.findByPk(req.membership.id)
            .then(membership => {
                res.status(200).json(membership);
            })
            .catch(error => {
                next(error);
            })
}


//update membership
exports.updateMembership = function(req, res, next){
    var membership = req.membership;
    var update = req.body;
    
    _.merge(membership, update);
    membership.update(update)
            .then(membership => {
                res.status(200).json(membership);
            })
            .catch(error=> {
                next(error);
            });
}

