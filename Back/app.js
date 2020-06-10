const express = require('express');
const app = express();

//Declaracion de cors (peromisos para clientes como por ejemplo angular)
const cors= require('cors');
//Declaracion de la constante de las rutas de usuarios
const usuariosRutas = require('./rutas/usuarioRutas');

//--Middlewars----
app.use(express.json()); //se utiliza json para definir el tipo de archivo dque se va a aenviar por express
app.use(cors() );
//Consumo de las rutas 
app.use('/api',usuariosRutas);
//--Fin de middlewars

//Exportacion del modulo

module.exports = app;