const express= require('express');
const app=express();
//declaracion cors
const cors=require('cors');
//variable de rutas a ejecutar
const usuarioRutas= require('./rutas/usuarioRutas');
const cancionRutas= require('./rutas/cancionRutas');
const listasRutas= require('./rutas/listasRutas');


//MIDLEWARES
app.use(express.json());
app.use(cors());
//consumo de rutas
app.use('/api',usuarioRutas);
app.use('/api',cancionRutas);
app.use("/api",listasRutas);

module.exports=app;