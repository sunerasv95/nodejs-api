'use strict';
module.exports = (sequelize, DataTypes) => {
  const Membership = sequelize.define('Membership', {
    type: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    isdDate: DataTypes.DATE,
    expDate: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {});
  Membership.associate = function(models) {
    Membership.belongsTo(models.Member);
    Membership.hasMany(models.Schedule, { foreignKey: 'membershipId'});
  };
  return Membership;
};