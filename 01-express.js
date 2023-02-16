"use strict";

let express = require("express"),
  app = express();
app.use(express.static(__dirname + "/public/"));
//ruta = app.use(express.static(__dirname + '/assets/'));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");

app.use("/", require("./router/rutas"));

const mongoose = require("mongoose");

const user = "lauravcruz";
const password = "cGmE99fABCzWLQ2H";
const dbname = "pokemon";
const uri = `mongodb+srv://${user}:${password}@cluster0.maebliy.mongodb.net/${dbname}?retryWrites=true&w=majority`;

app.use("/pokemon", require("./router/pokemon"));
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
  .listen(3000);

console.log("Iniciando Express en el puerto 3000");
