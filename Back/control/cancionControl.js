const Cancion=require('../modelo/cancion');
const fs=require('fs');
const path=require('path');

/* FUNCIONES */
function registroCancion(req,res){
    var cancion=new Cancion;
    var parametros=req.body;
    console.log(parametros);
    
    cancion.titulo=parametros.titulo;
    cancion.artista=parametros.artista;
    cancion.genero=parametros.genero;
    cancion.album=parametros.album;
    cancion.anio=parametros.anio;
    cancion.letra=parametros.letra;
    cancion.reprod=0;
    cancion.archivo = null;
    cancion.imagenc = null;


    //Guardar en BD
    cancion.save((err,cancionNueva)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!cancionNueva){
                res.status(200).send({message:"No fue posible subir la canción"});
            }else{
                res.status(200).send({message:`Ahora puedes disfrutar de ${cancion.titulo}.`,
                                     cancion:cancionNueva
            })
            }
        }
    });

}

//subir archivo de musica
function subirCancion(req,res){
    var cancionId=req.params.id;
    var nombreArchivo="No has subido ningúna canción";
    //validación de archivo
    if(req.files){
        var rutaArchivo=req.files.archivo.path;
        console.log(`ruta Archivo: ${rutaArchivo}`);
        //split
        var partirArchivo=rutaArchivo.split('\\');
        //Acceder a la posicion que contiene el nombre de la cancion
        var nombreArchivo=partirArchivo[3];
        //split
        var extensionMusica=nombreArchivo.split('\.');
        //Acceder a la posicion de extension del aarchivo
        var extensionArchivo=extensionMusica[1];
        //mostrar en consola
        console.log(` partir archivo ${partirArchivo}, ${nombreArchivo}, extension: ${extensionMusica}, ${extensionArchivo}` );

        //Validación de formato
        if(extensionArchivo=='wmv'|| extensionArchivo=='mp3'){
            //Actualizar el campo archivo
            Cancion.findByIdAndUpdate(cancionId,{archivo:nombreArchivo},(err,cancionArriba)=>{
                if(err){
                    res.status(500).send({message:"Error en el servidor"});
                }else{
                    res.status(200).send({
                        message:"Canción ahora disponible",
                        archivo: nombreArchivo,
                        cancion: cancionArriba
                    });
                }
            });
        }else{
            //formato no valido
            res.status(200).send({message:"Formato inválido"})
        }
    }else{
        res.status(200).send({message: "No has subido ningún archivo de música."});
    }

}

//mostrar archivo
function reproducirMusica(req,res){
    //pedir el archivo a mostrar
    var archivo=req.params.musicFile;
    
    //ubicacion del archivo
    var ruta='./archivos/canciones/musica/'+archivo;
    //validar si existe o no fs.exists('ruta,(existencia)=>')
    fs.exists(ruta,(exists)=>{
        if(exists){
            res.sendFile(path.resolve(ruta));
        }else{
            res.status(200).send({message: "canción no encontrada"});
        }
    });
   
}
//Funciones para mostrar imagen de la canción
//funcion subir imagen
function subirImgC(req,res){
    var cancionId= req.params.id;
    var nombreArchivo="No has subido ninguna imagen....";
    var ruta = './archivos/canciones/imagenes/';
    
    /* validar si se esta enviando archivo*/
    console.log(req.files);
    
    if(req.files){
        var rutaArchivo= req.files.imagenc.path;
        //haremos split para separar elementos 
        var partirArchivo=rutaArchivo.split('\\');
        //Acceder a la posicion que contiene el nombre del archivo
        var nombreArchivo=partirArchivo[3];
        //split para separa nombre de archivo de la extension
        var extensionImg=nombreArchivo.split('\.');
        //Acceder a la posicion de la extensión del archivo
        var extensionArchivo=extensionImg[1];
        //mostrar en consola
        console.log(`ruta: ${rutaArchivo}, particion: ${partirArchivo}, nombre Archivo: ${nombreArchivo} Extensión Archivo: ${extensionArchivo}`);
        
        //validar si el formato del archivo es aceptable
        if(extensionArchivo=='png'|| extensionArchivo=='jpg' ||extensionArchivo=='jpeg'){
        
            Cancion.findOne({_id: cancionId},(err,cancionEncontrada)=>{
                if(err){
                    
                    res.status(500).send({message: "Error en el servidor"});
                }
                else if(cancionEncontrada.imagen){
                    console.log(ruta+cancionEncontrada.imagenc);
                    fs.open(ruta+cancionEncontrada.imagenc,(err,data)=>{
                        if(err)
                        {
                            console.log("no se encontro el archivo");
                            //res.status(200).send({message:`Error crash ${err}` });
                        }else if(!data)
                        {
                            console.log("error de lectura");
                            //res.status(200).send({message:`Error lectura ${err}` });
                        }else
                        {
                        //borrar archivo de imagen para actualizar
                        fs.unlink(ruta+cancionEncontrada.imagenc, (error)=>{
                        if(error){
                            //res.status(200).send({message: });
                            console.log(`Error ${error}`);
                            
                             }               
                        }); 
                        }
                    });
                    
                }
            }); 
 
            //Actualizar el campo imagen
            Cancion.findByIdAndUpdate(cancionId,{imagenc: nombreArchivo}, (err,imagenCancion)=>{
                if(err){
                    res.status(500).send({message: "Error en el servidor"});
                }else{
                    res.status(200).send({
                        message: "Imagen anexada!",
                        imagenc: nombreArchivo,
                        cancion: imagenCancion
                    });
                }
            });
        }else{
            //Formato no valido
            res.status(200).send({message:"Formato inválido: El archivo no es una imagen"});
        }
    }else{
        res.status(200).send({message: "No has subido imagenes"});
    }
}

//funcion mostrar archivo
function mostrarArchivoImg(req,res){
    //pedir el archivo a mostrar
    var archivo=req.params.imageFile;
    //ubicacion del archivo
    var ruta='./archivos/canciones/imagenes/'+archivo;
    //validar si existe o no fs.exists('ruta,(existencia)=>')
    fs.exists(ruta,(exists)=>{
        if(exists){
            res.sendFile(path.resolve(ruta));
        }else{
            res.status(200).send({message: "imagen no encontrada"});
        }
    });
   
}

//funcion actualizar musica
function actualizarCancion(req,res){
    var cancionId=req.params.id;
    var nuevosDatosCancion=req.body;

    Cancion.findByIdAndUpdate(cancionId,nuevosDatosCancion,(err,cancionActualizada)=>{
        if(err){
            res.status(200).send({message:"Error en el servidor"});
        }else{
            if(!cancionActualizada){
                res.status(200).send({message:"No fue posible actualizar la canción"});
            }else{
                res.status(200).send({
                    message:"Canción Actualizada!!",
                    cancion:nuevosDatosCancion
                });
            }
        }
    });
}
//funcion eliminar musica
function eliminarCancion(req,res){
    var cancionId=req.params.id;
    var ruta = './archivos/canciones/imagenes/';

    //Buscar el usuario apra encontrar is tiene imagen de perfil y borrarla
    Cancion.findOne({_id : cancionId},(err,cancionEncontradaEliminar)=>{
        if(err)
        {
            res.status(500).send({message:"Error en el servidor"});
        }else if(!cancionEncontradaEliminar){
            res.status(200).send({message:"Usuario inexistente"});
        }else if(cancionEncontradaEliminar.imagenc !=null)
        {
            //borrar archivo de imagen
            fs.unlink(ruta+cancionEncontradaEliminar.imagenc,(error)=>{
                if (error) {
                    res.status(200).send({message:`Error ${error}` });
                } 
            });
            //fin de borrar archivo
        }
    });







    Cancion.findByIdAndDelete(cancionId,(err,cancionEliminada)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!cancionEliminada){
                res.status(200).send({message:"No fue posible eliminar la canción"});
            }else{
                res.status(200).send({
                    message:"Cancion Eliminada",
                    cancion:cancionEliminada
                });
            }
        }
    });
}
//funcion buscar cancion 
function buscarCancion(req, res){
    var cancionId=req.params.id;
    Cancion.findById(cancionId,(err, cancionBuscada)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!cancionBuscada){
                res.status(200).send({message:"No fue posible encontrar la canción"});
            }else{
                res.status(200).send({
                    message:"Cancion encontrada",
                    cancion:cancionBuscada
                });
            }
        }
    })
}

function buscarCancionEsp(req, res){
    var parametros = req.body;
    var busqueda = parametros.busqueda;
    console.log(busqueda);
    
    Cancion.findAll({$or: [
            { titulo: {$regex: busqueda, $options: 'i'} } ,{ genero: {$regex: busqueda, $options: 'i'} },{ album: {$regex: busqueda, $options: 'i'} } 
    ]}, (err, cancionEncontrada)=>{
        //console.log(cancionEncontrada);
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            res.status(200).send({
                message:"El resultado de tu busqueda es:",
                cancion: cancionEncontrada
            });
         }
        
    });
}

function ListarCanciones(req,res)
{
    Cancion.find({},{titulo:1},{sort:{titulo:1}},(err,encontrados)=>{
        if(err)
        {
            res.status(500).send({message:"error en el servidor "+err});
        }else if(!encontrados){
            res.status(200).send({message:"No se encontraron coincidencias"});
        }else{
            res.status(200).send({
                message:"datos encontrados!",
                canciones:encontrados});
        }
    });
}
function ListarCancionesTendencia(req,res)
{
    Cancion.find({},{titulo:1},{sort:{reprod:-1}},(err,encontrados)=>{
        if(err)
        {
            res.status(500).send({message:"error en el servidor "+err});
        }else if(!encontrados){
            res.status(200).send({message:"No se encontraron coincidencias"});
        }else{
            res.status(200).send({
                message:"datos encontrados!",
                canciones:encontrados});
        }
    });
}

//exportar 
module.exports={
    registroCancion,
    subirCancion, 
    reproducirMusica,
    subirImgC,
    mostrarArchivoImg,
    actualizarCancion,
    eliminarCancion, 
    buscarCancion,
    buscarCancionEsp,
    ListarCanciones,
    ListarCancionesTendencia

}