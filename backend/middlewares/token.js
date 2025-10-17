const { verify } = require("jsonwebtoken"); //importo solo la funzione

const verificaToken = (req, res, next) => {
    const loginToken = req.header('loginToken');
    if(loginToken==='null'){ 
        return res.json({error: "Utente non autenticato"});
    }
    try{
        const tokenVerificato = verify(loginToken, "x"); // x deve essere uguale nella funzione sign
        req.utente = tokenVerificato;
        if(tokenVerificato){   
            return next();
        }   
    } catch(err){
        return res.json({error: err});
    }
};

const verificaTokenAdmin = (req, res, next) => {
    const loginToken = req.header('loginToken');
    if(loginToken==='null'){ 
        return res.json({error: "Utente non autenticato"});
    }
    try{
        const tokenVerificato = verify(loginToken, "x"); // x deve essere uguale nella funzione sign
        req.utente = tokenVerificato;
        if(tokenVerificato && tokenVerificato.ruolo!="amministratore"){ 
            return res.json({error: "L'utente non è un amministratore"})
        }
        if(tokenVerificato){   
            return next();
        }   
    } catch(err){
        return res.json({error: err});
    }
};

module.exports = {verificaToken,verificaTokenAdmin};