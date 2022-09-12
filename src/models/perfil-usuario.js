const Sequelize = require('sequelize')
const database = require('../database')

const perfilusuario = database.define('perfilUsuario' , {
    idusuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(25),
        allowNull: false
    },
    sobremim: {
        type: Sequelize.STRING(150),
        allowNull: true
    },
    whatsapp: {
        type: Sequelize.STRING(150),
        allowNull: true
    },
    bitAtivo: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 1
    }
})

module.exports = perfilusuario