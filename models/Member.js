'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    bloodGroup: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});

  Member.associate = function (models) {
    Member.hasMany(models.Membership);
  };

  Member.beforeCreate(async (member, options, next) => {
    let salt, hashed;
    if (!member.changed('password')) return next();

    salt = await bcrypt.genSaltSync(10);
    hashed = await bcrypt.hashSync(member.password, salt);

    member.password = hashed;
  });

  Member.prototype.authenticate = function (plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  }
  
  Member.prototype.encryptPassword = async function(plainTextPassword){
      let salt , hashed;
      if(!plainTextPassword){
          return '';
      }else{
          salt = await bcrypt.genSaltSync(10);
          hashed = await bcrypt.hashSync(plainTextPassword, salt);
          return hashed;
      }
  }

  Member.prototype.toJson = function () {
    var obj = Object.assign({}, this.get());
    delete obj.password;
    return obj;

  }
  return Member;
};