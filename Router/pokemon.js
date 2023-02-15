const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pokemon", {
    arrayPokemon: [
      {
        id: "0010",
        nombre: "Caterpie",
        tipo: "Bicho",
        descripcion: "Es lamentable",
      },
      {
        id: "0013",
        nombre: "Weedle",
        tipo: "Bicho",
        descripcion: "También es lamentable",
      },
      {
        id: "0129",
        nombre: "Magikarp",
        tipo: "Agua",
        descripcion: "Qué cosa más mala",
      },
    ],
  });
});

module.exports = router;
