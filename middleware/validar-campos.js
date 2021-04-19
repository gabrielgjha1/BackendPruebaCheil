const { validationResult } = require('express-validator');

//Verifica si el usuario ingreso todos los campos
const ValidarCampos = (req,res,next)=>{

    const errors = validationResult(req);

    if (!errors.isEmpty()){

        return res.status(400).json(errors)

    }


    next();

}



module.exports = {

    ValidarCampos

}