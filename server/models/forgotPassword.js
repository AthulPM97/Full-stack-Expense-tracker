const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ForgotPassword = sequelize.define('forgot password', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    uuid: Sequelize.STRING,
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    }
});

module.exports = ForgotPassword;