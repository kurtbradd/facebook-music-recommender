"use strict";

module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define('Artist', {
    id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    facebookId: { type: DataTypes.INTEGER, unique: true, allowNull: false }
  }, {
  	timestamps: false,
  	tableName: 'Artists'
  });

  return Artist;
};