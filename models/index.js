// models/index.js
import User from './User.js';
import Student from './Student.js';
import Teacher from './Teacher.js';
import Schedule from './Schedule.js';
import Group from './Group.js';
import Discipline from './Discipline.js';
import ClassType from './ClassType.js';


Teacher.belongsToMany(Discipline, { through: 'TeacherDisciplines' });
Discipline.belongsToMany(Teacher, { through: 'TeacherDisciplines' });

export { User, Student, Teacher, Schedule, Group, Discipline, ClassType };
