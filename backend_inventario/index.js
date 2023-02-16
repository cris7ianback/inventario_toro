const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./env/.env" })
const session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);

const cors = require("cors");

var sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    mysql_port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    clearExpired: true,
    checkExpirationInterval: 60000
});

app.use(session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: false
    },
})
);

require("./config/conexion");
const bodyParser = require("body-parser");

const corsOptions = {
    origin: "http://localhost:4200"
}

//conexión que permite enviar datos ( se utilizo con POSTMAN)
app.use(express.json({ limit: "1024mb" }));
app.use(cors(corsOptions));

//para poder trabajar con las cookies
app.use(cookieParser());
app.use(bodyParser.json());

//para procesar datos enviados desde forms
app.use(express.urlencoded({ extended: true, limit: "1024mb" }));
app.use(cors(corsOptions));


//incovar rutas

app.use("/", require("./routes/user.routes"));
app.use("/", require("./routes/producto.routes"));
app.use("/", require("./routes/proveedor.routes"));



//sapp.use("/firewall", require("./routes/firewall.routes"));



//Para eliminar la cache
app.use(function (req, res, next) {
    if (!req.user)
      res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    next();
  });

  app.listen(3000, () => {
    console.log("SERVER UP");
  });
  