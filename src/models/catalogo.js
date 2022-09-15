const Sequelize = require('sequelize')
const database = require('../database')

const catalogos = database.define('catalogo' , {
    idCatalogo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    urlCatalogo: {
        type: Sequelize.STRING(150),
        allowNull: true
    },
    urlImagem: {
        type: Sequelize.STRING(150),
        allowNull: true
    },
    bitAtivo: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 1
    }
})

module.exports = catalogos