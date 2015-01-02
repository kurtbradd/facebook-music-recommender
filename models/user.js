"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id:            { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    facebookId:    { type: DataTypes.BIGINT, unique: true, allowNull: false },
    v1AccessToken: { type: DataTypes.STRING, unique: true },
    v2AccessToken: { type: DataTypes.STRING, unique: true },
    signupDate:    { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
    lastActive:    { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false }
  }, {
    timestamps: false,
    tableName: 'Users'
  });

  return User;
};