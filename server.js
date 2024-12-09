const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();


const app = express();

app.use(express.json());




app.use('/api/auth',authRoutes);

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Conectado"))
.catch((error)=> console.log("No conectado",error));



// Inicializar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));


app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);
    res.status(500).json({ message: 'Error inesperado' });
  });

