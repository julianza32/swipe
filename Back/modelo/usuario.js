const mongoose = require('mongoose');
const Schema = mongoose.Schema;



var UsuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    correo: String,
    contrasena: String,
    rol: String,
    imagen: String,
    listas:[{
        nombre: String,
        canciones:[]
    }]
    // telefono: Number,
    // fecha: Date
    
});

module.exports = mongoose.model('Usuario',UsuarioSchema);