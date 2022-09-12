const catalogos = require('../models/catalogo')
const perfilUsuario = require('../models/perfil-usuario')

const perfil = async (req, res) => {
    try {
        const catalogo = await catalogos.findAll();
        const perfil = await perfilUsuario.findAll();

        return res.status(200).send({ 
            perfil,
            catalogo
         })

    } catch(error){
        return res.status(500).send({ Message: error.Message })
    }
}

const editaPerfil = async (req, res) => {
    try {
        const data = req.body
        
        const perfilDb = await perfilUsuario.findByPk(data.idusuario);

        if (!perfilDb) {
            const perfilData = {
                nome: data.nome,
                sobremim: data.sobremim,
                whatsapp: data.whatsapp
            }
           await perfilUsuario.create(perfilData);

        } else {
            perfilDb.nome = data.nome,
            perfilDb.sobremim = data.sobremim,
            perfilDb.whatsapp = data.whatsapp
    
            await perfilDb.save()
        }

        const perfilDbNew = await perfilUsuario.findByPk(data.idusuario);

        return res.status(200).send({ 
            perfilDbNew
         })

    } catch(error){
        return res.status(500).send({ Message: error.Message })
    }
}


module.exports = {
    perfil,
    editaPerfil
}