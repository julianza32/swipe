const mongoose = require('mongoose');
const app = require('./app');
const port = 3000; // process.env.PORT (Para definir un puerto dinamicamente esta viene en un json)

mongoose.connect('mongodb://localhost:27017/swipe', (err,res)=>{
    if(err){
        console.log(`El error es ${err}`);
    }else{
        console.log('Funciona!!');
        //app.set('port',process.env.PORT||3000); -> configuracion de puerto del hosting;       
        app.listen(port,()=>{
            console.log(`Puerto:${port}`)
        })
    }
});

//spring-data para conectarse a multiples bases de datos