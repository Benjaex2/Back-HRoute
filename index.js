require("dotenv").config();

const cors = require("cors");
const routes = require("./routes/routes");
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

mongoose.set("strictQuery", false);

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Base de datos conectada");
});
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado en ${process.env.PORT}`);
});
