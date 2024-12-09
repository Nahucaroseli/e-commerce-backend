const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


router.post("/registro",async (req,res) =>{
    try{
        const {email,password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Usuario ya registrado"});
        }

        const user = new User({email,password});
        await user.save();

        res.status(201).json({message:"Usuario registrado!"});


    }catch(error){
        res.status(500).json({message:"Error en el servidor"});
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