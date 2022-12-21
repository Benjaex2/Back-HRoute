const Trabajador = require("../models/trabajador");
const Lugar = require("../models/lugar");
const Traslado = require("../models/traslado");

const express = require("express");

const router = express.Router();

module.exports = router;

//Añadir un trabajador
router.post("/addTrabajador", async (req, res) => {
  const data = new Trabajador({
    nombre: req.body.nombre,
    nombreUsuario: req.body.nombreUsuario,
    contra: req.body.contra,
    tipo: req.body.tipo,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Agregar lugar
router.post("/addLugar", async (req, res) => {
  const data = new Lugar({
    nombreLugar: req.body.nombreLugar,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Agregar traslado
router.post("/addTraslado", async (req, res) => {
  const data = new Traslado({
    idOrigen: req.body.idOrigen,
    idDestino: req.body.idDestino,
    tipo: req.body.tipo,
    idCamillero: req.body.idCamillero,
    nombrePersonal: req.body.nombrePersonal,
    nombrePaciente: req.body.nombrePaciente,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Obtener todos los trabajadores
router.get("/getAllTrabajadores", async (req, res) => {
  try {
    const data = await Trabajador.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Obtener todos los trabajadores que son camilleros
router.get("/getAllCamilleros", async (req, res) => {
  try {
    const data = await Trabajador.find({ tipo: "camillero" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Obtener todos los lugares
router.get("/getAllLugares", async (req, res) => {
  try {
    const data = await Lugar.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Obtener todos los traslados
router.get("/getAllTraslados", async (req, res) => {
  try {
    const data = await Traslado.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Obtener todos los traslados para tabla
router.get("/getAllTrasladosTable", async (req, res) => {
  try {
    const dataT = await Traslado.find();
    const dataP = await Trabajador.find();
    const dataL = await Lugar.find();
    const data = dataT.map((traslado, index) => {
      return {
        index: index + 1,
        nombreOrigen: dataL.find((lugar) => lugar._id.equals(traslado.idOrigen))
          ?.nombreLugar,
        nombreDestino: dataL.find((lugar) =>
          lugar._id.equals(traslado.idDestino)
        )?.nombreLugar,
        tipo: traslado.tipo,
        nombreCamillero: dataP.find((camillero) =>
          camillero._id.equals(traslado.idCamillero)
        )?.nombre,
        nombrePersonal: traslado.nombrePersonal,
        nombrePaciente: traslado.nombrePaciente,
        _id: traslado._id,
      };
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Obtener un trabajador por id
router.get("/getOneTrabajador/:id", async (req, res) => {
  try {
    const data = await Trabajador.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Obtener un traslado por id
router.get("/getOneTraslado/:id", async (req, res) => {
  try {
    const data = await Trabajador.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/comprobarLogin", async (req, res) => {
  const data = {
    usuario: req.body.usuario,
    contra: req.body.contra,
  };

  try {
    const dataP = await Trabajador.find();
    const usuario = await dataP.find(
      (camillero) => camillero.nombreUsuario == data.usuario
    );

    if (
      usuario.nombreUsuario == data.usuario &&
      usuario.contra == data.contra
    ) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    console.log(data.usuario);
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/borrarTraslado/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Traslado.findByIdAndDelete(id);
    res.send(`Traslado con id ${id} fue eliminado`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
