
const Hotel = require("../models/hotel");


//Trae los hoteles por categoria y por votos de los usuarios
const GetHotelCategory = async (req=request,res=response)=>{

    const {category=6,score=6} = req.params;

    try {
        const hotel =await Hotel.find({
            $or:[{category:Number(category)},{porcentajeVotos:Number(score)}],
            $and:[{status:true}]
      
            
        })


        return res.status(200).json({
    
            hotel
    
        });
    } catch (error) {

        return res.status(500).json({

            message:'Error en el servidor al guardar los datos',
            error
    
        });

        
    }

}


//Trae los hoteles por precio 
const GetHotelPric = async (req=request,res=response)=>{

    const {order=1} = req.params;

    try {
        const hotel =await Hotel.find({status:true}).sort({price:Number(order)})


        return res.status(200).json({
    
            hotel
    
        });
    } catch (error) {

        return res.status(500).json({

            message:'Error en el servidor al guardar los datos',
            error
    
        });

        
    }

}


//trae todos los hoteles sin filtros
const GetHotel = async(req=request,res=response)=>{

    
    try {
        const [hotel,total] = await Promise.all([
            Hotel.find({status:true}),
            Hotel.countDocuments({estado:true})
        ]);
    
        return res.status(200).json({
    
            message:'hola mundo traer hoteles',
            hotel,
            total
    
        })
    } catch (error) {
        
        return res.status(500).json({

            message:'Error en el servidor al guardar los datos',
            error
    
        });

    }

   

}

module.exports = {

    GetHotel,
    GetHotelCategory,
    GetHotelPric

}