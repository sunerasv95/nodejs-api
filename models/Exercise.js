'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  Exercise.associate = function(models) {
    Exercise.belongsToMany(models.Schedule, { through: models.ScheduleExercise, foreignKey: "exerciseId" });
  };

  
  Exercise.prototype.filterExercises = function(){
    var obj = Object.assign({}, this.get());
    return obj;
  }
  
  return Exercise;
};