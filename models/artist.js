"use strict";

module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define('Artist', {
    id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:       { type: DataTypes.STRING, unique: true, allowNull: false },
    picture:    { type: DataTypes.STRING, unique: true, isUrl: true },
    genre:      { type: DataTypes.INTEGER },
    facebookId: { type: DataTypes.BIGINT, unique: true, allowNull: false }
  }, {
    timestamps: false,
    tableName: 'Artists'
  });

  return Artist;
};