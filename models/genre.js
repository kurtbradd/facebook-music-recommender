"use strict";

module.exports = function(sequelize, DataTypes) {
  var Genre = sequelize.define('Genre', {
    id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    genre:      { type: DataTypes.STRING, unique: true, allowNull: false }
  }, {
    timestamps: false,
    tableName: 'Genres'
  });

  return Genre;
};