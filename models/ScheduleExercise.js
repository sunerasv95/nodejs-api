'use strict';
module.exports = (sequelize, DataTypes) => {
  const ScheduleExercise = sequelize.define('ScheduleExercise', {
    day: DataTypes.INTEGER,
    sets: DataTypes.INTEGER,
    reps: DataTypes.INTEGER,
    rest: DataTypes.INTEGER
  }, {});
  ScheduleExercise.associate = function(models) {
    // associations can be defined here
  };
  return ScheduleExercise;
};