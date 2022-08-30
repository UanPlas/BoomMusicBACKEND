const mongoose = require("mongoose");

const dbConnectNoSql= () => {
    const DB_URI = process.env.DB_URI;
    mongoose.connect(DB_URI, {
        useNewUrlParser : true,
        useUnifiedTopology:true
    }, (error, res)=> {
        if(!error){
            console.log("Conexion Correcta");
        }
        else{
            console.log("Conexion Incorrecta");
        }
    });
};

module.exports = {dbConnectNoSql}