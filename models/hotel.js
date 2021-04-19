const {Schema,model} = require('mongoose');

const HotelSchema = Schema({

    hotelname:{type:String,require:[true,'El campo es obligatorio']},

    status: {

        type:Boolean,
        default:true,
        require:true
    },

    category:{type:Number,require:[true,'El campo es obligatorio']},

    price:{type:Number,require:[true,'El campo es obligatorio']},

    score:{type:Number,default:0},

    porcentajeVotos:{type:Number,default:0},

    countVotes:{type:Number,default:0},
    comentarios:{type:Array,default:[]},

    pictureOne:{type:String,require:false,default:''},

    pictureTwo:{type:String,require:false,default:''},

    pictureThree:{type:String,require:false,default:''},

});

module.exports = model("Hotel",HotelSchema)