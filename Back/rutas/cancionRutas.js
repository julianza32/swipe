const express=require('express');
const CancionControl=require('../control/cancionControl');
//importar multiparty
const multipart=require('connect-multiparty');
const cancionControl = require('../control/cancionControl');
const subirMusicaDirectorio=multipart({uploadDir:'./archivos/canciones/musica'});
const subirImgDirectorio=multipart({uploadDir:'./archivos/canciones/imagenes'});

var api=express.Router();
//ruta registro de cancion
api.post('/subir',CancionControl.registroCancion);
//ruta cancion
api.put('/subirCancion/:id',subirMusicaDirectorio,CancionControl.subirCancion);
//ruta reproducir cancion
api.get('/playMusic/:musicFile', CancionControl.reproducirMusica);
//ruta imagen de cancion
api.put('/subirImgCancion/:id',subirImgDirectorio,CancionControl.subirImgC);
//ruta mostrar img de canción
api.get('/obtenerImgCancion/:imageFile', CancionControl.mostrarArchivoImg);
//ruta actualizar cancion
api.put('/updateMusic/:id', CancionControl.actualizarCancion);
//ruta eliminar canción
api.delete('/deleteMusic/:id', CancionControl.eliminarCancion);
//ruta para obtener una canción en especifico
api.get('/buscarCancion/:id', CancionControl.buscarCancion);
//ruta para obtener una canción en especifico
api.get('/buscarCancionEsp/', CancionControl.buscarCancionEsp);

api.get('/listarCanciones',cancionControl.ListarCanciones);

api.get('/listarTendencias',cancionControl.ListarCancionesTendencia);
//ruta para mostrar las canciones disponibles
api.get('/obtenerCanciones', CancionControl.obtenerCanciones);

api.get('/obtenerCancionesGenero',cancionControl.ListarCancionesGenero)

//Exportar l RUTA
module.exports=api;