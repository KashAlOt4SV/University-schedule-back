import { DataTypes } from 'sequelize'; // Импортируем DataTypes из sequelize

export default (sequelize) => {
  const Group = sequelize.define('Group', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // другие поля модели...
  });

  return Group;
};
