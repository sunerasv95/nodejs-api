'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    days: DataTypes.INTEGER
  }, {});
  Schedule.associate = function(models) {
    Schedule.belongsTo(models.Membership);
    Schedule.belongsToMany(models.Exercise, { through: models.ScheduleExercise, foreignKey: "scheduleId" });
  };
  return Schedule;
};