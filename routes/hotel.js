const { Router } = require("express");
const { check } = require("express-validator");
const {  SaveHotel, UpdateHotel, DeleteHotel, NewVotes,GetOneHotel } = require("../controllers/hotel");
const { ExisteHotelPorId } = require("../helpers/db-validetor");
const { ValidarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();



//Ruta para traer un solo hotel
router.get('/:id',GetOneHotel);

//Ruta para guardar  los hoteles
router.post('/',
[

  
    check('hotelname','El nombre  Es Obligatorio').not().isEmpty(),
    check('category','La categoria es obligatoria').not().isEmpty(),
    check('price','El precio es obligatorio').not().isEmpty(),
    ValidarCampos

],SaveHotel);

//Ruta para actualizar un hoteles
router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom  ( ExisteHotelPorId ),
    ValidarCampos

],UpdateHotel);

//Ruta trae borra los hoteles
router.delete('/:id', [
   
    check('id','No es un ID valido').isMongoId(),
    check('id').custom  ( ExisteHotelPorId ),
    ValidarCampos

] ,DeleteHotel);


//Ruta para realizar los votos
router.post('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('score','No es un valor valido').not().isEmpty(),
    check('comentarios','No es un valor valido').not().isEmpty(),

    check('id').custom  ( ExisteHotelPorId ),
    ValidarCampos
],NewVotes)

module.exports = router;


