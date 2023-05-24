const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},
    secondName: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    birthDay: {type: DataTypes.DATE},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Profession = sequelize.define('profession', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    profession: {type: DataTypes.STRING, unique: true}
})

module.exports = {
    Profession
}