const Usuario = require('../modelo/usuario');
// Importar modulo File System 
const fs = require('fs');
// Importar modulo path
const path = require('path');


//Funcion Registro Usuario
function regitrarUsuario(req, res) {
    var usuario = new Usuario();
    var parametros = req.body;

    usuario.nombre = parametros.nombre;
    usuario.apellido = parametros.apellido;
    usuario.correo = parametros.correo;
    usuario.contrasena = parametros.contrasena;
    usuario.rol = 'usuario';
    usuario.imagen = null;
    usuario.save((err, usuarioNuevo) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        } else {
            if (!usuarioNuevo) {
                res.status(200).send({ message: "No fue posible crear el registro" });
            } else {
                res.status(200).send({
                    message: "Usuario Creado",
                    usuario: usuarioNuevo
                });
            }
        }
    });

}

function login(req, res) {
    var parametros = req.body;
    var correoUsuario = parametros.correo;
    var contraUsuario = parametros.contrasena;

    Usuario.findOne({ correo: correoUsuario }, (err, usuarioLog) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        } else {
            if (!usuarioLog) {
                res.status(200).send({ message: "Usuario inexistente" });
            } else {
                if (usuarioLog.contrasena != contraUsuario) {
                    res.status(200).send({ message: "Contraseña incorrecta" });
                } else {
                    res.status(200).send({
                        message: "Usuario, Logueado!!",
                        usuario: usuarioLog
                    });
                }
            }
        }
    });
}

function actulizarUsuario(req, res) {
    //localhost:3000/api/editar/:id
    var usuarioId = req.params.id;
    var nuevosDatosUsuario = req.body;
    

    Usuario.findByIdAndUpdate(usuarioId, nuevosDatosUsuario, (err, usuarioActuliazado) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        } else {
            if (!usuarioActuliazado) {
                res.status(200).send({ message: "No fue posible actulizar sus datos" });
            } else {
                res.status(200).send({
                    message: "Usuario Actulizado!!",
                    usuario: nuevosDatosUsuario
                });
            }
        }
    });
}

//Funcion de subir IMG
function subirImg(req, res) {
    var usuarioId = req.params.id;
    var nombreArchivo = "No has subido ninguna imagen...";

    //Validar si efectivamente se esta enviando un archivo

    if (req.files) {
        // Vamos a ir analizando la ruta del archivo, el nombre y la extención
        // C:\\usuarios\descargas\imagen.png
        var rutaArchivo = req.files.imagen.path;
        console.log(`Ruta archivo: ${rutaArchivo}`);

        // Haremos un split para separar elementos
        // Esto nos generará un arreglo de datos
        var partirArchivo = rutaArchivo.split('\\');
        console.log(`partir archivo: ${partirArchivo}`);

        //Acceder a la posicion que contiene el nombre del archivo
        var nombreArchivo = partirArchivo[2];
        console.log(`Posición dato: ${nombreArchivo}`);

        //Haremos un split para separar el nombre del archivo de la extencion
        //['imagen','png']
        var extensionImg = nombreArchivo.split('\.');
        console.log(`partir imagen: ${extensionImg}`);

        //Accedemos a la pocision de la extencion de l archivo
        var extensionArchivo = extensionImg[1];
        console.log(`Extension archivo: ${extensionArchivo}`);

        // Validar si el formato del archivo es aceptable 

        if(extensionArchivo == 'png'||extensionArchivo=='jpg'||extensionArchivo=='jpeg'){
            //Actulizar del usuario el campo imagen

            Usuario.findByIdAndUpdate(usuarioId,{imagen:nombreArchivo},(err,usuarioConImg)=>{
                if(err){
                    res.status(500).send({message: "Error en el servidor"});
                }else{
                    if(!usuarioConImg){
                        res.status(200).send({message: "No fue posible subir la imagen"});
                    }else{
                        res.status(200).send({
                            message: "Imagen anexada!",
                            imagen: nombreArchivo,
                            usuario: usuarioConImg
                        })
                    }
                }
            });
        }else{
            res.status(200).send({message:"Formato invalido! El archivo no es una imagen"})
        }
    } else {
        res.status(200).send({ message: "No has subido imagen" });
    }
}


//Funcion mostrar archivo

function mostrarArchivo(req,res){
    //pedir el archivo que queros mostrar
    var archivo = req.params.imageFile;
    //ubicacion del archivo 
    var ruta = './archivos/usuarios/'+archivo;

    //validar si existe o no 
    //fs.exists('la ruta del archivo a buscar, (existencia)=>{}')

    fs.exists(ruta,(exists)=>{
        if(exists){
            res.sendFile(path.resolve(ruta));
        }else{
            res.status(200).send({message: "Imagen no encontrada"});
        }
    });

}

function eliminarUsuario(req,res)
{
    var usuarioId = req.params.id;

    Usuario.findByIdAndDelete(usuarioId,(err,UsuarioEliminado)=>{
        if(err)
        {
            res.status(500).send({ message: "Error en el servidor" });
        }else{
            if (!UsuarioEliminado) {
                res.status(200).send({ message: "No se encontro el usuario" });
            } else {
                res.status(200).send({ 
                    message: "Usuario eliminado",
                    usuario:UsuarioEliminado 
                });
            }
        }
        
        
        
    });
}
module.exports = {
    regitrarUsuario, login, actulizarUsuario,subirImg, mostrarArchivo, eliminarUsuario
}