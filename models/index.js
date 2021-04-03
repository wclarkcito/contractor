const User = require('./User')
const Projects = require('./Projects');

User.hasMany(Projects, {
    foreignKey: `homeowner_id`,
});

User.hasMany(Projects, {
    foreignKey: `contractor_id`,
});

Projects.belongsTo(User, {
    foreignKey: `homeowner_id`,

});
Projects.belongsTo(User, {
    foreignKey: `contractor_id`,

});

module.exports = { User, Projects }