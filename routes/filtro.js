const { Router } = require("express");
const { GetHotel, GetHotelPric, GetHotelCategory } = require("../controllers/filtro");

const router = Router();


//Trae todos los hoteles sin fintro 
router.get('/',GetHotel);

//Ruta para traer los hoteles por precio
router.get('/:order',GetHotelPric);

//trae todos los hoteles por categoria
router.get('/:category/:score',GetHotelCategory);



module.exports = router;