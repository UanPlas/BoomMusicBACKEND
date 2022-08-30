const customHeader = (req, res, next)=>{
try {
    const apiKey = req.headers.api_key;
    if(apiKey==="jesus1"){    
    next()
    }else{
        res.status(403);
        res.send({error:"API_KEY_NO_ES_CORRECTA"});
    }
} catch (error) {
    res.status(403);
    res.send({error: "Algo ocurrio con el custom header"});
}
}
module.exports= customHeader;