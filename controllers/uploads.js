const cloudinary = require("cloudinary").v2;
const { response } = require("express");
const Hotel = require("../models/hotel");

cloudinary.config(process.env.CLOUDINARY_URL);


//elimina las imagenes si ya existen en cloudinary, esto se llama en el metodo de guardar imagen
const EliminarImagenes = (picture1,picture2,picture3)=>{

  if (picture1) {
      
    // hay que borrar la imagen del servidor
    const nombreArr = picture1.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    cloudinary.uploader.destroy(public_id);

  }


  if (picture2) {
      
    // hay que borrar la imagen del servidor
    const nombreArr = picture2.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    cloudinary.uploader.destroy(public_id);

  }



  if (picture3) {
      
    // hay que borrar la imagen del servidor
    const nombreArr = picture3.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    cloudinary.uploader.destroy(public_id);

  }



}

//Subir Imagenes
const UploadImages = async (req, res) => {
  const { id, coleccion } = req.params;

  //recibe la coleccion para guardar y crea el modelo
  switch (coleccion) {
    case "hotel":
      modelo = await Hotel.findById(id);

      if (!modelo) {
        return res.status(400).json({
          msg: "No existe un hotel con el id",
        });
      }

      break;

    default:
      
      return res.status(500).json({ msg: "Validacion no hecha" });

  }

  try {

    //elimina las imagenes si existen
    EliminarImagenes(modelo.pictureOne,modelo.pictureTwo,modelo.pictureThree)

    
    //se extraen el archivo que contienes las imagenes
    const pictureOne = req.files.pictureOne;
    const pictureTwo = req.files.pictureTwo;
    const pictureThree = req.files.pictureThree;

    //se almacenan en cloudinary
    const [picture1,picture2,picture3] = await Promise.all([

      cloudinary.uploader.upload(pictureOne.tempFilePath),
      cloudinary.uploader.upload(pictureTwo.tempFilePath),
      cloudinary.uploader.upload(pictureThree.tempFilePath)

    ]);

    
    modelo.pictureOne = picture1.secure_url;
    modelo.pictureTwo = picture2.secure_url;
    modelo.pictureThree = picture3.secure_url;

    const hotel = await modelo.save();

    return res.status(200).json({
      hotel,
    });

    
  } catch (error) {
    return res.status(200).json({
      msg: "Error al guardar la imagen",
    });
  }


 
};

module.exports = {
  UploadImages,
};
