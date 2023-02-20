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

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const pokemonDB = await Pokemon.findOne({ _id: id });
    console.log(pokemonDB);
    res.render("detalle", {
      pokemon: pokemonDB,
      error: false,
    });
  } catch (error) {
    console.log("Se ha producido un error", error);
    res.render("detalle", {
      error: true,
      mensaje: "Pokémon no encontrado",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  console.log("_id desde backend", id);
  try {
    const pokemonDB = await Pokemon.findByIdAndDelete({ _id: id });
    console.log(pokemonDB);
    if (!pokemonDB) {
      res.json({
        estado: false,
        mensaje: "No se puede eliminar el Pokémon.",
      });
    } else {
      res.json({
        estado: true,
        mensaje: "Pokémon eliminado",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/crear", (req, res) => {
  res.render("crear");
});

router.post("/", async (req, res) => {
  const body = req.body; //Gracias al body parser podemos recuperar todo lo que viene del body
  console.log(body);
  try {
    const pokemonDB = new Pokemon(body);
    await pokemonDB.save(); //lo guardamos con .save (mongoose)
    res.redirect("/pokemon"); //volvemos al listado
  } catch (error) {
    console.log("error", error);
  }
});
module.exports = router;
