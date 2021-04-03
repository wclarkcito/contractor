const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Projects extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Projects.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quote: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        homeowner_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        contractor_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
    },


    {

        // hooks: {
        //     beforeCreate: async (newProjectsData) => {
        //         newProjectsData.password = await bcrypt.hash(newProjectsData.password, 10);
        //         return newProjectsData;
        //     },
        //     beforeUpdate: async (updatedData) => {
        //         updatedData.password = await bcrypt.hash(updatedData.password, 10);
        //         return updatedData;
        //     },
        // },


        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'projects',
    }
);

module.exports = Projects;