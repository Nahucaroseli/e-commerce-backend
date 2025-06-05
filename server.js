const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
const cors = require("cors");


dotenv.config();


const app = express();

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Conectado"))
.catch((error)=> console.log("No se ha conectado, ocurrio un problema",error));



app.use(cors());
app.use(express.json());




const authRoutes = require('./routes/auth');

app.use('/api/auth',authRoutes);

console.log(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});


// Inicializar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));


app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);
    res.status(500).json({ message: 'Error inesperado' });
  });

module.exports = (req, res) => app(req, res);