const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


router.post("/registro",async (req,res) =>{
    console.log('Solicitud recibida:', req.body); // Log para confirmar si llega la solicitud
    try{
        const {username,email,password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Usuario ya registrado"});
        }

        const user = new User({username,email,password});
        await user.save();

        res.status(201).json({message:"Usuario registrado!"});


    }catch(error){
        console.error('Error en el registro:', error.message); // Asegúrate de que se vea el mensaje de error
        console.error(error); // Log adicional para obtener detalles del error
        res.status(500).json({ message: 'Error en el registro', error: error.message }); // Devuelve el mensaje de error
    }
});


router.post("/login", async(req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
           return res.status(404).json({ message: "Contraseña incorrecta"});
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.json({token,message:"Usuario logueado"});

    }catch(error){
        res.status(500).json({message:"Error en el servidor"});
    }

});

module.exports = router;