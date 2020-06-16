const express = require('express');
const ListaControl = require('../control/listasControl');
const listasControl = require('../control/listasControl');

var api = express.Router();

api.put('/crearLista/:id&:nombreLista',ListaControl.crearLista);

api.get('/mostrarListas/:id',listasControl.MostrarListas)//mostrar todas las listas

//mostrar una lista especifica?
api.get('/mostrarUnaLista/:id&:nombre',listasControl.mostrarListaUna)//mostrar todas las listas

api.put('/modificarLista/:id&:nombreLista',listasControl.modificarrLista);//id = usuario, segundo paramero para la lista?

api.delete('/eliminarLista/:id&:nombreLista',listasControl.borrarLista);//id= usuario, segundo paramero para la lista?

module.exports = api;
