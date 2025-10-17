const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {verificaToken} = require('../middlewares/token')
const {verificaTokenAdmin} = require('../middlewares/token')

router.post('/home', verificaToken, async (req, res)=>{ //accesso alla sezione account "Home"
    res.json(req.utente);
});

router.post('/verificaAdmin', verificaTokenAdmin, async (req, res)=>{ //accesso alla sezione account "Home"
    res.json(req.utente);
});

router.post('/notifiche', verificaToken, async (req, res)=>{ //accesso alla sezione account "Home"
    const idutente = req.utente.idutente;
    const data = [];
    db.query('SELECT idnotifiche, contenuto, tipo FROM notifiche WHERE ref_idutente=? ORDER BY data_creazione DESC', [idutente],
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            if(!result[0]){
                res.json({message:"Non ci sono messaggi"}); 
            }else{
                data.push(result)
                res.json({notifiche: data})
            }
        }
    });

});


router.post("/registrazione", async (req, res) => {

    const nome = req.body.nome
    const cognome = req.body.cognome
    const email = req.body.email
    const pass = bcrypt.hashSync(req.body.pass,10);
    const cod_patente = req.body.cod_patente
    const data_nascita = new Date(req.body.data_nascita);
    const cod_carta = req.body.cod_carta
    const indirizzo_fatturazione = req.body.indirizzo_fatturazione
    const ruolo = "cliente"
    const categoria_patente = req.body.categoria_patente

    db.query('SELECT idutente FROM utente WHERE email=?', [email],
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            if(!result[0]){
                db.query('INSERT INTO utente ( nome, cognome, email, pass, cod_patente, data_nascita, cod_carta, indirizzo_fatturazione, ruolo, categoria_patente) VALUES (?,?,?,?,?,?,?,?,?,?)',
                [nome, cognome, email, pass, cod_patente, data_nascita, cod_carta, indirizzo_fatturazione, ruolo, categoria_patente], 
                (err, result) => {
                   if (err) {
                       console.log(err)
                   }
                   else {
                       res.send("Valori aggiunti")
                   }
                }
               );
            }else{
                res.json({ error:"Email già esistente"});
            }
        }
    }
    );
})

router.post("/registrazioneadmin", async (req, res) => {

    const nome = req.body.nome
    const cognome = req.body.cognome
    const email = req.body.email
    const pass = bcrypt.hashSync(req.body.pass,10);
    const cod_patente = req.body.cod_patente
    const data_nascita = new Date(req.body.data_nascita);
    const cod_carta = req.body.cod_carta
    const indirizzo_fatturazione = req.body.indirizzo_fatturazione
    const ruolo = req.body.ruolo
    const parcheggio = req.body.parcheggio

    db.query('SELECT idutente FROM utente WHERE email=?', [email],
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            if(!result[0]){
                db.query('INSERT INTO utente ( nome, cognome, email, pass, cod_patente, data_nascita, cod_carta, indirizzo_fatturazione, ruolo, ref_parc_stal_u, categoria_patente) VALUES (?,?,?,?,?,?,?,?,?,?,B)',
                [nome, cognome, email, pass, cod_patente, data_nascita, cod_carta, indirizzo_fatturazione, ruolo, parcheggio], 
                (err, result) => {
                   if (err) {
                       console.log(err)
                   }
                   else {
                       res.send("Valori aggiunti")
                   }
                }
               );
            }else{
                res.json({ error:"Email già esistente"});
            }
        }
    }
    );
})

router.post('/login', async (req, res) => {
    const email = req.body.email
    const pass = req.body.pass
    db.query('SELECT idutente, nome, pass, ruolo, categoria_patente FROM utente WHERE email=?', [email],
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            if(!result[0]){
                res.json({error:"Non esiste alcun utente con questa email"}); 
            }else{
                bcrypt.compare(pass, result[0].pass).then((corretto) => {
                    if(!corretto){
                        //console.log(err)
                        res.json({ error:"Password Errata"});
                    }else{
                        const loginToken = jwt.sign({idutente: result[0].idutente, status: "true", ruolo: result[0].ruolo, categoria_patente: result[0].categoria_patente}, "x"); //x deve essere uguale nel token
                        res.json({token: loginToken});
                    }
                })
            }
        }
    }
    );
})

router.get('/accesso', verificaToken, async (req, res)=>{ //verifico se è presente il token
    res.json(req.utente);
});


module.exports = router;

