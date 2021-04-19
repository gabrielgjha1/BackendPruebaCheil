const {Router} = require('express');
const { check } = require("express-validator");
const { ValidarCampos } = require("../middleware/validar-campos");
const { coleccionesPermitidas } = require('../helpers/db-validetor');
const { UploadImages } = require('../controllers/uploads');
const { ValidarArchivo } = require('../middleware/validar-archivo');

const router = Router();


//ruta para guardar las imagenes
router.put('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['hotel'])),
    ValidarCampos
], UploadImages);


module.exports  =  router;