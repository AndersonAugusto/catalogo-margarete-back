const catalogos = require('../models/catalogo')
const perfilUsuario = require('../models/perfil-usuario')
const Vonage = require('@vonage/server-sdk');


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

const postCodigo = async (req, res) => {
    try {
        const data = req.body
        const perfil = await perfilUsuario.findByPk(data.idUsuario);

        perfil.codigoEditar = data.codigo
        await perfil.save()

        //SEND SMS
        const vonage = new Vonage({
            apiKey: '6ab6c823',
            apiSecret: '4PccCbjN2yIZavBn'
        })
        
        vonage.message.sendSms(
            'Vonage',
            '5519987793121' ,
            `Seu codigo de verificacao é ${data.codigo} \n\n`,

            (err , responseData) => {
                if(err) {
                    console.log('Message failed with error: ', err)
                } else {
                    console.log(`Message sucesso! `, responseData)
                }
            }
        )

        const perfilAtualizado = await perfilUsuario.findByPk(data.idUsuario);

        return res.status(200).send({ 
            perfilAtualizado
        })

    } catch(error){
        return res.status(500).send({ Message: error.Message })
    }
}

const validaCodigo = async (req, res) => {
    try {
        const {codigo , idUsuario} = req.query

        const perfil = await perfilUsuario.findByPk(idUsuario);

        if(!codigo) {
            return res.status(400).send({ Message: 'Código não informado!' })
        }

        if(codigo === perfil.codigoEditar) {
            return res.status(200).send({
                Message: 'Código validado! você tem permissão para editar a página.'
            }) 
        } else {
            return res.status(403).send({
                Message: 'O código inválido.'
            }) 
        }

    } catch(error){
        return res.status(500).send({ Message: error.Message })
    }
}

module.exports = {
    perfil,
    editaPerfil,
    postCodigo,
    validaCodigo
}