require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {dbConnectNoSql} = require("./config/mongo");
const {dbConnectMySql} = require("./config/mysql")
const app = express();

const ENGINE_DB= process.env.ENGINE_DB;


const morganBody = require("morgan-body");
const loggerStream =require("./utils/handleLogger");

app.use(cors());
app.use(express.json());
app.use(express.static("storage")); 


morganBody(app,{
    noColors:true,
    stream: loggerStream,
    skip: function(req,res){
        return res.statusCode < 400 //TODO 2xx, 3xx
    }

})



const port = process.env.PORT || 3000

/**
 * Aqui invocamos rutas
*/

app.use("/api",require("./routes"))


console.log(process.env.PORT);
app.listen(port, ()=>{
    console.log(`Corriendo en ${port}`);
});

(ENGINE_DB === "nosql") ? dbConnectNoSql(): dbConnectMySql(); 