const Lista = require('../modelo/usuario');

function crearLista(req,res)
{
    let parametros = req.params.id;
    let nombre = req.params.nombreLista;
    let nuevalista = req.body.lista;//array con ids de canciones
    console.log(parametros +", "+nombre+","+nuevalista);
    
    Lista.findByIdAndUpdate(parametros,{$push:{listas:{nombre:nombre,canciones:nuevalista}}},(err,listaGuardada)=>
    {
        if(err)
        {
            res.status(500).send({message:"Error en el servidor"+ err});
        }else if(!listaGuardada)
        { 
            console.log(listaGuardada);
            
            res.status(200).send({message:"Error al crear la lista"+ err});
        }else{
            res.status(200).send({
                message:"nueva Lista creada!",
                lista:listaGuardada
        });
        }
        
    });
}

function MostrarListas(req,res)//mostrar todas las listas son canciones
{
    //
    let id = req.params.id;
    //busca al usuario por id y trae unicament elas listas de este
    Lista.find({_id:id},{_id:0,'listas.nombre':1},(err,listas)=>{
        if(err)
        {
            res.status(500).send({message:"Error en el servidor"+ err});
        }else if(!listas)
        {
            res.status(500).send({message:"Error Usuario no encontrado"+ err});
        }else{
            res.status(500).send({message:"Listas del usuario",lista:listas});
        }
    });

}

function mostrarListaUna(req,res)//mostrar la lista que va a sonar con canciones
{
    let id = req.params.id;
    let Nlista= req.params.nombre;
    //busca al usuario por id y trae unicament elas listas de este
    Lista.find({_id:id,'listas.nombre':Nlista},{_id:0,'listas.$':1},(err,listas)=>{
        if(err)
        {
            res.status(500).send({message:"Error en el servidor"+ err});
        }else if(!listas)
        {
            res.status(500).send({message:"Error Usuario no encontrado"+ err});
        }else{
            res.status(500).send({message:"Listas del usuario",lista:listas});
        }
    });
}

function modificarrLista(req,res)//solo se modifica una lista a la vez
{
    let id = req.params.id;
    let Nlista = req.params.nombreLista;
    let NewLista = req.body;//body debe trer los parametros nombre y canciones
    console.log(NewLista);
    //busca al usuario por id y trae unicament elas listas de este
    Lista.updateOne({_id:id,'listas.nombre':Nlista},{$set:{'listas.$':NewLista}},(err,listas)=>{
        if(err)
        {
            res.status(500).send({message:"Error en el servidor "+ err});
        }else if(!listas)
        {
            res.status(500).send({message:"Error Usuario no encontrado"+ err});
        }else{
            res.status(500).send({message:"Listas del usuario",lista:listas});
        }
    });
}

function borrarLista(req,res)
{
    let idUsuario = req.params.id;
    let nombrelista = req.params.nombreLista;
    Lista.findByIdAndUpdate(idUsuario,{$pull:{listas:{nombre:nombrelista}}},(err,listaBorrada)=>{
        if(err)
        {
            res.status(500).send({message:"Error en el servidor "+ err});
        }else if(!listaBorrada)
        { 
            console.log(listaBorrada);
            
            res.status(200).send({message:"Error al borrar la lista "+ err});
        }else{
            res.status(200).send({
                message:"nueva Lista creada!",
                lista:listaBorrada
        });
        }
    });
}

module.exports={
    crearLista,
    MostrarListas,
    mostrarListaUna,
    modificarrLista,
    borrarLista
}