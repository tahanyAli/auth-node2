'use strict';

module.exports = (sequelize, DataTypes) => {
    const News = sequelize.define('news',{
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ownerID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return News;
}