const mongoose = require("mongoose");

const traslado = new mongoose.Schema({
  idOrigen: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "lugares",
  },
  idDestino: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "lugares",
  },
  tipo: {
    required: true,
    type: String,
  },
  idCamillero: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "trabajadores",
  },
  nombrePersonal: {
    required: true,
    type: String,
  },
  nombrePaciente: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Traslados", traslado);
