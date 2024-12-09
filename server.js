const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');


dotenv.config();

const app = express();

app.use(express.json());


mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Conectado"))
.catch((error)=> console.log("No conectado",error));



// Inicializar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));




