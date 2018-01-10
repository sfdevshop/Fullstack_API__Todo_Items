'use strict';
module.exports = (sequelize, DataTypes) => {

  const NoteItem = sequelize.define('NoteItem', {

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    builddate: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  });
  NoteItem.associate = (models) => {
    NoteItem.belongsTo(models.User, {
      foreignKey: 'noteId',
      onDelete: 'CASCADE',
    });
  };
  return NoteItem;
};