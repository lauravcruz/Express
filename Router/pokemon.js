const express = require("express");
const router = express.Router();
const Pokemon = require("../models/Pokemon");

router.get("/", async (req, res) => {
  try {
    const arrayPokemonDB = await Pokemon.find();
    console.log(arrayPokemonDB);
    res.render("pokemon", { arrayPokemon: arrayPokemonDB });
  } catch (error) {
    console.log(error);
  }
  /*res.render("pokemon", {
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
  });*/
});

module.exports = router;