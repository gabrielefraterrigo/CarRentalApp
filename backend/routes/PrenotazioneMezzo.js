const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {verificaToken} = require('../middlewares/token');

router.post("/verificaEmail", async (req, res) => {

    const email = req.body.email

    db.query('SELECT idutente,categoria_patente FROM utente WHERE email=?', [email],
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            if(!result[0]){
                res.json({ error:"L'email inserita non esiste"});
            }else{
                res.json(result[0]);
            }
        }
    }
    );
});

router.post("/prenotazione", async (req, res) => {

    const idUtente = req.body.idUtente
    const targa = req.body.targa
    const destinazioneX = req.body.destinazioneX
    const destinazioneY = req.body.destinazioneY
    const posizioneX = req.body.posizioneX
    const posizioneY = req.body.posizioneY
    const dataInizio = req.body.dataInizio
    const dataFine = req.body.dataFine
    const autista = req.body.autista
    const consegna = req.body.consegna
    const costo = req.body.costo

    
    db.query('UPDATE disponibilita SET prenotato=true WHERE targa=?',
    [targa], 
    (err, result) => {
        if (err) {
            console.log(err)
            }
        else {
            db.query('INSERT INTO prenotazione (ref_idcliente, ref_targa, orario_prenotazione, orario_terminazione, costo, posizione_consegnaX, posizione_consegnaY, posizione_terminaX, posizione_terminaY, consegna, autista) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        [idUtente, targa, dataInizio, dataFine, costo, posizioneX, posizioneY, destinazioneX, destinazioneY, consegna, autista], 
        (err, result) => {
            if (err) {
                console.log(err)
                }
            else {
                res.send("Valori aggiunti")
            }
        });
        }
    });

        
});

router.post("/cercaMezzo", async (req, res) => {
    const x = req.body.X
    const y = req.body.Y
    const veicolo = req.body.veicolo
    const posizioni = []

    db.query('SELECT targa, posizione_attualeX, posizione_attualeY FROM disponibilita D WHERE D.ref_idveicolo_di=? AND prenotato = false AND ST_Distance_Sphere(point(posizione_attualeX, posizione_attualeY),point(?,?)) < 5000 ', [veicolo,x,y],
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            if(!result[0]){
                res.json({ error:"Spiacente, non ci sono veicoli che soddisfano questi parametri nelle vicinanze"});
            }else{
                posizioni.push(result)
                res.json({list: posizioni});
            }
        }
    }
    );
})

router.post("/verificaDateEOrario", async (req, res) => {

    const dataInizio = req.body.dataInizio
    const dataFine = req.body.dataFine

    db.query('INSERT INTO orario (dataInizio, dataFine) values (?,?)', [dataInizio, dataFine],
    (err, result) => {
        if (err) {
            res.json({ error:"Errore"});
        }else {
            res.json({ message: "Perfetto"});
        }
    }
    );
})

router.post("/richiestaVeicoli", async (req, res) => {

    const data1 = []
    const data2 = []
    const data3 = []
    const data4 = []

    db.query('SELECT idveicolo, modello, tariffa, categoria, fotoVeicolo FROM veicolo WHERE tipo="automobile"',
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            data1.push(result)
            db.query('SELECT idveicolo, modello, tariffa, categoria, fotoVeicolo FROM veicolo WHERE tipo="moto"',
                (err, result) => {
                    if (err) {
                        console.log(err)
                    }else {
                        data2.push(result)
                        db.query('SELECT idveicolo, modello, tariffa, categoria, fotoVeicolo FROM veicolo WHERE tipo="bici"',
                            (err, result) => {
                                if (err) {
                                    console.log(err)
                                }else {
                                    data3.push(result)
                                    db.query('SELECT idveicolo, modello, tariffa, categoria, fotoVeicolo FROM veicolo WHERE tipo="monopattino"',
                                        (err, result) => {
                                            if (err) {
                                                console.log(err)
                                            }else {
                                                data4.push(result)
                                                res.json({listAuto: data1, listMoto: data2, listBici: data3, listMonopattino: data4})
                                            }
                                        }
                                    );  
                                }
                            }
                        );   
                    }
                }
            );
        }
    }
    );
})


//13.4376, 38.044

module.exports = router;  