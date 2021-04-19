const { Router } = require("express");
const { check } = require("express-validator");
const {usuariosGet,usuariosput,usuariosDelete,usuariosPost} = require('../controllers/usuarios');
const { validarROle,existeUsuarioPorId } = require("../helpers/db-validetor");
const { ValidarCampos } = require("../middleware/validar-campos");
const { EsAdminROle, validarRoles } = require("../middleware/validar-compos");
const { validarJWT } = require("../middleware/validar-jwt");



// TODO Login hecho en el backend, no implementado en el frontend


const router = Router();

//ruta para trae los usuairos
router.get("/", usuariosGet);



//ruta para actuuazliar un usuario
router.put("/:id",[

    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( (rol)=> validarROle(rol)),
    ValidarCampos

], usuariosput);


//ruta para guardar un usuario

router.post("/",
[
    check('correo','El correo no es valido').isEmail(),
    check('password','El password es obligatorio y mas de 6 letras').isLength({min:6}),
    check('nombre','El nombre  Es obligatorio').not().isEmpty(),
    ValidarCampos
],usuariosPost);


//ruta para borrar un usuario

router.delete("/:id", [
    validarJWT,
    validarRoles('VENTAS_ROLE','ADMIN_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    
    ValidarCampos

], usuariosDelete);

module.exports = router;
