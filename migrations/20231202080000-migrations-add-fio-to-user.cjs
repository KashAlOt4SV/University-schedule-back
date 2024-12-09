'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Создание таблицы Users
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fio: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Добавлено ограничение уникальности
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Email также должен быть уникальным
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable('Groups', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      groupName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable('Disciplines', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      classTypes: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable('ClassTypes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.ENUM('Лекция', 'Практическая работа', 'Лабораторная работа'),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Создание таблицы Students
    await queryInterface.createTable('Students', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id', // Ссылка на первичный ключ
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      group: {
        type: Sequelize.STRING,
        references: {
          model: 'Groups',
          key: 'groupName',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        allowNull: true,
      },
      fio: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'fio', // Ссылка на уникальный fio
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Остальные таблицы создаются аналогично
    await queryInterface.createTable('Teachers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      specialties: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      disciplines: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable('Schedules', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dayOfWeek: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      timeSlot: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      groupId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Groups',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      disciplineId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Disciplines',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      teacherId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Teachers',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Schedules');
    await queryInterface.dropTable('ClassTypes');
    await queryInterface.dropTable('Disciplines');
    await queryInterface.dropTable('Groups');
    await queryInterface.dropTable('Teachers');
    await queryInterface.dropTable('Students');
    await queryInterface.dropTable('Users');
  },
};
