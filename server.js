const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
const cors = require("cors");


dotenv.config();


const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Conectado"))
.catch((error)=> console.log("No se ha conectado, ocurrio un problema",error));


app.use(cors({
  origin: "https://compra-facil.netlify.app",
  methods: ["GET", "POST"],
  credentials: true
}));


app.use(express.json());


const authRoutes = require('./routes/auth');

app.use('/api/auth',authRoutes);


app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});


app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);
    res.status(500).json({ message: 'Error inesperado' });
  });

module.exports = app;