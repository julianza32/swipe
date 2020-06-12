const express = require('express');
const ListaControl = require('../control/listasControl');

var api = express.Router();

api.put('/crearLista/:id&:nombreLista',ListaControl.crearLista);

//api.get('/mostrarLista')//mostrar todas las listas

//mostrar una lista especifica?

//api.put('/modificarLista/:id&:nombreLista');//id = usuario, segundo paramero para la lista?

//api.delete('/eliminarLista/:id&:nombreLista');//id= usuario, segundo paramero para la lista?

module.exports = api;
