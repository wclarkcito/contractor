const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Project extends Model { }

Project.init(
    {

        title: {
            type: DataTypes.STRING,
        },

        body: {
            type: DataTypes.STRING,
        },

        quote: {
            type: DataTypes.INTEGER,
        },

    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'projects',
    }


);

module.exports = Project;