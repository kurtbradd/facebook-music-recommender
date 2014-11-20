"use strict";

module.exports = function(sequelize, DataTypes) {
  var Friend = sequelize.define('Friend', {
    id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstUser:  { type: DataTypes.INTEGER, allowNull: false, references: 'Users',
                  referencesKey: 'id', onUpdate: 'CASCADE', onDelete: 'SET NULL' },
    secondUser: { type: DataTypes.INTEGER, allowNull: false, references: 'Users',
                  referencesKey: 'id', onUpdate: 'CASCADE', onDelete: 'SET NULL' }
  }, {
    validates: {
      notSame: function() {
        if (this.firstUser === this.secondUser) {
          throw new Error('Cannot be friends with yourself!')
        }
      }
    },
    timestamps: false,
    tableName: 'Friends'
  });

  return Friend;
};