const mongoose = require("mongoose");

const trabajador = new mongoose.Schema({
  nombre: {
    required: true,
    type: String,
  },
  nombreUsuario: {
    required: true,
    type: String,
    unique: true,
  },
  contra: {
    required: true,
    type: String,
  },
  tipo: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Trabajadores", trabajador);
