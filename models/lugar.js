const mongoose = require("mongoose");

const lugar = new mongoose.Schema({
  nombreLugar: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Lugares", lugar);
