"use strict";

let express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  app = express();

require("dotenv").config();

let port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


app.use(express.static(__dirname + "/public/"));


app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");

app.use("/", require("./router/rutas"));
app.use("/pokemon", require("./router/pokemon"));

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.maebliy.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log(e));

app
  .get("/", (req, res) => {
    res.render("index", { titulo: "mi título dinámico" });
    //res.sendFile(ruta + 'index.html')
  })
  .get("/contacto", (req, res) => {
    res.render("contacto", {
      tituloContacto: "Estamos en contacto de manera dinámica!",
    });
  })
  .use((req, res) => {
    res.status(404).render("404", {
      titulo: "Error 404",
      descripcion: "Page not found",
    });
  })
  .listen(port);

console.log("Iniciando Express en el puerto 3000");
