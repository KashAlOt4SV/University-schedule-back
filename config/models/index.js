// Структура вашего кода в формате ES6 (с использованием import)import fs from 'fs';
import path from 'path';import { Sequelize, DataTypes } from 'sequelize'; 
import process from 'process'; import config from '../config/config.json'; 
const basename = path.basename(__filename); 
const env = process.env.NODE_ENV || 'development'; const db = {}; 
let sequelize; 
const currentConfig = config[env];
if (currentConfig.use_env_variable) {   sequelize = new Sequelize(process.env[currentConfig.use_env_variable], currentConfig); 
} else {   sequelize = new Sequelize(currentConfig.database, currentConfig.username, currentConfig.password, currentConfig); 
}
fs  .readdirSync(__dirname)
  .filter(file => {    return (
      file.indexOf('.') !== 0 &&      file !== basename &&
      file.slice(-3) === '.js' &&      file.indexOf('.test.js') === -1
    );  })
  .forEach(file => {    // Вместо require используем import динамически
    const model = import(path.join(__dirname, file)).then(module => {      const modelInstance = module.default(sequelize, DataTypes); 
      db[modelInstance.name] = modelInstance;     });
  });
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {    db[modelName].associate(db); 
  }});
db.sequelize = sequelize; 
db.Sequelize = Sequelize; 
export default db;