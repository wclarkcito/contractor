const Contractor = require('./Contractor')
const Homeowner = require('./Homeowner')
const Projects = require('./Projects')



// Contractor.belongsTo(Homeowner, {
//     foreignKey: `id`,
//     onDelete: 'CASCADE',
// });

Contractor.belongsTo(Projects, {
    foreignKey: `id`,
    onDelete: 'CASCADE',
});

// Homeowner.belongsTo(Contractor, {
//     foreignKey: `id`,
//     onDelete: 'CASCADE',
// });
Homeowner.belongsTo(Projects, {
    foreignKey: `id`,
    onDelete: 'CASCADE',
});











module.exports = { Contractor, Homeowner, Projects }