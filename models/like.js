"use strict";

module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    id:     { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user:   { type: DataTypes.INTEGER, allowNull: false, references: 'Users', 
              referencesKey: 'id', onUpdate: 'CASCADE', onDelete: 'SET NULL' },
    artist: { type: DataTypes.INTEGER, allowNull: false, references: 'Artists',
              referencesKey: 'id', onUpdate: 'CASCADE', onDelete: 'SET NULL' }
  }, {
    timestamps: false,
    tableName: 'Likes'
  });

  return Like;
};