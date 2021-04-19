const hotel = require('../models/hotel');
const Role = require('../models/role');
const Usuario = require('../models/usuario');


//valida si el rol existe en la base de datos

//TODO no implementado en el frontend

const validarROle = async (rol='')=>{

    const ExisteRol = await Role.findOne({rol});
    if (!ExisteRol){

        throw new Error('El rol no es valido')

    } 

}
//valida si existe usuario por id
//TODO no implementado en el frontend
const existeUsuarioPorId = async(id)=>{

    const ExisteId = await Usuario.findById(id)

    if (!ExisteId){

        throw new Error('No existe el usuario');

    }

}

//verifica si existe el hotel
const ExisteHotelPorId = async(id)=>{

    const ExisteId = await hotel.findById(id)

    
    if (!ExisteId){

        throw new Error('No existe el usuario');

    }

    return true;

}

const coleccionesPermitidas = async (c,collecciones = [])=>{



    const incluida = collecciones.includes(c);

    if (!incluida){

        throw new Error(' la coleccion no es permitida');

    }

    return true;
}

module.exports = {

    validarROle,
    existeUsuarioPorId,
    ExisteHotelPorId,
    coleccionesPermitidas
}