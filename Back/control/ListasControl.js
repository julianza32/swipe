const Lista = require('../modelo/usuario');

function crearLista(req,res)
{
    let parametros = req.params.id;
    let nombre = req.params.nombreLista;
    let nuevalista = req.body.lista;//array con ids de canciones
    console.log(parametros +", "+nombre+","+nuevalista);
    
    Lista.findByIdAndUpdate(parametros,{$push:{
            listas:{
                nombre:nombre, 
                canciones:nuevalista
         }
        }
    },(err,listaGuardada)=>
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

function MostrarLista(req,res)
{
    //
}

function modificarrLista(req,res)
{

}

function borrarLista(req,res)
{

}

module.exports={
    crearLista
}