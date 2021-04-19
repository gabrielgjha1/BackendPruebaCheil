const { response, request } = require("express");
const { populate, findByIdAndUpdate } = require("../models/hotel");
const Hotel = require("../models/hotel")




//Trae un solo hotel
const GetOneHotel = async(req=request,res=response)=>{

    const {id} =  req.params ;
    try {
       

        const hotel = await Hotel.findById(id);

    
        return res.status(200).json({
    
            message:'hola mundo traer hoteles',
            hotel
          
    
        })
    } catch (error) {
        
        return res.status(500).json({

            message:'Error en el servidor al traer los datos',
            error
    
        });

    }

   

}



//guarda los hoteles
const SaveHotel = async (req=request,res=response)=>{

   
    //los datos que no se quiren guardar  como hotel categoria y precio se aparta y se guarda el resto
    const {  hotelname, category, price, ...resto } = req.body;

    data = { hotelname,category,price };
    const hotel = new Hotel({...data});

    try {


        const HotelSave = await hotel.save();
        
    
        return res.status(200).json({

            message:'Datos guardados',
            HotelSave
    
        })
    

        
    } catch (error) {
        

        return res.status(500).json({

            message:'Error en el servidor al guardar los datos',
            error
    
        });

    }


}

//metodo para actualizar los hoteles
const UpdateHotel = async (req=request,res=response)=>{


    const { id } =   req.params;
    
    const {  pictureOne, pictureTwo,pictureThree,countVotes,score,usuario,status, ...resto } = req.body;

    try {
        const hotel = await Hotel.findByIdAndUpdate(id,{...resto})
    
        res.status(200).json({
    
            message:'hola mundo Actualizar Hoteles',
            hotel
        });

    } catch (error) {

        return res.status(500).json({

            message:'Error en el servidor al actualizar  el hotel',
            error
    
        });

        
    }
    
}

//metodo para borrar los hoteles
const DeleteHotel = async (req=request,res=response)=>{
    const { id } =   req.params;

    try {
        

        const hotel = await  Hotel.findByIdAndUpdate(id,{status:false});


        return res.status(200).json({

            message:'Hotel eliminado',
            hotel

        });


    } catch (error) {
        
        return res.status(500).json({

            message:'Error en el servidor al eliminar  el hotel',
            error
    
        });


    }

}


//metodo para realiar la votacion
const NewVotes = async (req=request,res=response)=>{

    const {id} = req.params;

    //se recibe el voto de los usuarios y los comentarios
    const {score,comentarios} = req.body;


    try {
        
        //se incrementa la cantidad de votos hechos 
        const hotelUpdate = await Hotel.findByIdAndUpdate(id, {$inc:{score:score, countVotes : 1}},{new:true});

        //se redondea a un numero entero el porcentaje de votos
        const porcentajeVotos = Math.round ( ( hotelUpdate.score/ (hotelUpdate.countVotes*5)) *5 );

        //Se guarda el comentario y el porcentaje de votos
        const hotel = await Hotel.findByIdAndUpdate(id,{porcentajeVotos,$push:{'comentarios':comentarios}},{new:true}); 


        return res.status(200).json({

            message:'Voto hecho',
            hotel

        });

    } catch (error) {

        return res.status(500).json({

            message:'Error en el servidor al eliminar  el hotel',
            error
    
        });
    }

}


module.exports = {

   
    SaveHotel,
    UpdateHotel,
    DeleteHotel,
    NewVotes,
    GetOneHotel

}