const express = require('express');

const UsuarioControl = require ('../control/usuarioControl');
//importar el paquete connect-multiparty
const multipart = require('connect-multiparty');
//A través de connect-multiparty, apuntamos a la carpeta que deseemos en que se guarden los archivos
const  subirImgDirectorio = multipart({uploadDir: './archivos/usuarios'});
var api = express.Router();

//Ruta Registrar Usuario
api.post('/registro', UsuarioControl.regitrarUsuario);

// Ruta Login 
api.post('/login', UsuarioControl.login);

//Ruta subir imagen usuario
api.put('/subirImagen/:id', subirImgDirectorio, UsuarioControl.subirImg);

//Ruta Actulizar Usuario
 api.put('/actualizar/:id', UsuarioControl.actulizarUsuario);

//Ruta para mostrar imagen usuario
api.get('/obtenerImagen/:imageFile',UsuarioControl.mostrarArchivo);
//Ruta para eliminar usuario
api.delete('/eliminarUsuario/:id',UsuarioControl.eliminarUsuario)

//Exportar el módulo
module.exports = api;