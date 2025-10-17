const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {verificaToken} = require('../middlewares/token');


router.post('/modificaNome', async (req, res)=>{

    const nome = req.body.nome
    const idutente = req.body.idutente
    

    db.query('UPDATE utente SET nome=? WHERE idutente=?',
    [nome, idutente],
     (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Dati aggiornati!")
            
        }
     }
    );
});

router.post('/modificaCognome', async (req, res)=>{

    const cognome = req.body.cognome
    const idutente = req.body.idutente

    db.query('UPDATE utente SET cognome=? WHERE idutente=?',
    [cognome, idutente],
     (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Dati aggiornati!")
            
        }
     }
    );
});

router.post('/modificaEmail', async (req, res)=>{

    const email = req.body.email
    const idutente = req.body.idutente

    db.query('SELECT idutente FROM utente WHERE email=?', [email],
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            if(!result[0]){
                db.query('UPDATE utente SET email=? WHERE idutente=?',
                [email, idutente],
                 (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        res.send("Dati aggiornati!")
                        
                    }
                 }
                );
            }else{
                res.json({ error:"Email già esistente"});
            }
        }
    }
    );
});

router.post('/modificaPassword', async (req, res)=>{

    const pass = bcrypt.hashSync(req.body.pass,10);
    const idutente = req.body.idutente

    db.query('UPDATE utente SET pass=? WHERE idutente=?',
    [pass, idutente],
     (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Dati aggiornati!")
           
        }
     }
    );
});

router.post('/modificaPatente', async (req, res)=>{

    const cod_patente = req.body.cod_patente;
    const idutente = req.body.idutente

    db.query('UPDATE utente SET cod_patente=? WHERE idutente=?',
    [cod_patente, idutente],
     (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Dati aggiornati!")
            
        }
     }
    );
});

router.post('/modificaCategoriaP', async (req, res)=>{

    const categoria_patente = req.body.categoria_patente;
    const idutente = req.body.idutente

    db.query('UPDATE utente SET categoria_patente=? WHERE idutente=?',
    [categoria_patente, idutente],
     (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Dati aggiornati!")
            
        }
     }
    );
});

router.post('/modificaDataNascita', async (req, res)=>{

    const data_nascita = req.body.data_nascita;
    const idutente = req.body.idutente

    db.query('UPDATE utente SET data_nascita=? WHERE idutente=?',
    [data_nascita, idutente],
     (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Dati aggiornati!")
            
        }
     }
    );
});

router.post('/modificaCarta', async (req, res)=>{

    const cod_carta = req.body.cod_carta;
    const idutente = req.body.idutente

    db.query('UPDATE utente SET cod_carta=? WHERE idutente=?',
    [cod_carta, idutente],
     (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Dati aggiornati!")
            
        }
     }
    );
});

router.post('/modificaIndirizzo', async (req, res)=>{

    const indirizzo_fatturazione = req.body.indirizzo_fatturazione;
    const idutente = req.body.idutente

    db.query('UPDATE utente SET indirizzo_fatturazione=? WHERE idutente=?',
    [indirizzo_fatturazione, idutente],
     (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Dati aggiornati!")
            
        }
     }
    );
});

module.exports = router;  
