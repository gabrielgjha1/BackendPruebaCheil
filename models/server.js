express = require("express");
var cors = require("cors");
const path = require("path");
const { dbConnection } = require("../database/config");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosRouterPath = "/api/usuarios";
    this.authPath = "/api/auth";
    this.hotelPath = "/api/hotel";
    this.uploadsPath = "/api/uploads";
    this.filtro = "/api/busqueda";

    //conectar a base de datos
    this.conectarDB();

    //middlewares

    this.middlewares();

    //Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //lectura y parseo del body
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.usuariosRouterPath, require("../routes/user"));
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.hotelPath, require("../routes/hotel"));
    this.app.use(this.uploadsPath, require("../routes/uploads"));
    this.app.use(this.filtro, require("../routes/filtro"));

    this.app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "public/index.html"));
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log("Servidor Corriendo En El Puerto", this.port);
    });
  }
}

module.exports = Server;
