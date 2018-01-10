'use strict';

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  User.associate = (models) => {
    User.hasMany(models.NoteItem, {
      foreignKey: 'noteId',
      as: 'noteItems',
    });
  };
  return User;
};