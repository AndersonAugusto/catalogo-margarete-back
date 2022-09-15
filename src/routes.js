const router = require('express').Router()

const catalogoController = require('./controller/catalogo-controller.js')
const perfilController = require('./controller/perfil-usuario-controller.js')

router.get('/' , (req, res) => { return res.status(200).send({ Message: 'Bem-vindo' })})

//INFO USUARIO
router.get('/perfil' , perfilController.perfil)
router.post('/perfil' , perfilController.editaPerfil)
router.post('/postCodigo' , perfilController.postCodigo)
router.post('/validaCodigo' , perfilController.validaCodigo)

//CATALOGO
router.post('/catalogo' , catalogoController.editarCatalogo)
router.delete('/catalogo' , catalogoController.deleteCatalogo)




module.exports = router