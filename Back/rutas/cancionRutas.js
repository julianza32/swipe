const express=require('express');
const CancionControl=require('../control/cancionControl');
//importar multiparty
const multipart=require('connect-multiparty');
const subirMusicaDirectorio=multipart({uploadDir:'./archivos/canciones/musica'});
const subirImgDirectorio=multipart({uploadDir:'./archivos/canciones/imag'});

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

//Exportar l RUTA
module.exports=api;