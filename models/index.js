const User = require('./User')
const Projects = require('./Projects');



User.belongsTo(Projects, {
    foreignKey: `id`,
    onDelete: 'CASCADE',
});


Projects.belongsTo(User, {
    foreignKey: `id`,
    onDelete: 'CASCADE',
});











module.exports = { Contractor, Homeowner, Projects }