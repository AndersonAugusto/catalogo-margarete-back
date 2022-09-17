const catalogos = require('../models/catalogo')


const editarCatalogo = async (req , res) => {
    try {
        const data = req.body
        
        const catalogo = await catalogos.findByPk(data.idCatalogo);
  
        if (!catalogo) {
            const catalogoData = {
                titulo: data.titulo,
                descricao: data.descricao,
                urlImagem: data.urlImagem,
                urlCatalogo: data.urlCatalogo
            }
           await catalogos.create(catalogoData);

        } else {
            catalogo.titulo = data.titulo,
            catalogo.descricao = data.descricao,
            catalogo.urlImagem = data.urlImagem
            catalogo.urlCatalogo = data.urlCatalogo
    
            await catalogo.save()
        }

        const catalogoNew = await catalogos.findByPk(data.idCatalogo);

        return res.status(200).send({ 
            catalogoNew
         })

    } catch (error){
        res.status(500).send()
    }
}

const deleteCatalogo = async (req , res) => {
    try {
        const idCatalogo = req.query.idCatalogo

        const catalogo = await catalogos.findByPk(idCatalogo);
        await catalogo.destroy()

        return res.status(200).send({ 
            Message: 'Deletado',
            catalogo
         })

    } catch (error){
        return res.status(500).send({ Message: error.Message })
    }
}


module.exports = {
    deleteCatalogo,
    editarCatalogo
}