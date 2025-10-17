const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');



router.post("/richiestaFotoVeicoli", async (req, res) => {

    const data1 = []
    const data2 = []
    const data3 = []
    const data4 = []

    db.query('SELECT idveicolo, modello, tariffa, fotoVeicolo FROM veicolo WHERE tipo="automobile"',
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            data1.push(result)
            db.query('SELECT idveicolo, modello, tariffa, fotoVeicolo FROM veicolo WHERE tipo="moto"',
                (err, result) => {
                    if (err) {
                        console.log(err)
                    }else {
                        data2.push(result)
                        db.query('SELECT idveicolo, modello, tariffa, fotoVeicolo FROM veicolo WHERE tipo="bici"',
                            (err, result) => {
                                if (err) {
                                    console.log(err)
                                }else {
                                    data3.push(result)
                                    db.query('SELECT idveicolo, modello, tariffa, fotoVeicolo FROM veicolo WHERE tipo="monopattino"',
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

router.post("/parcheggiEstalli", async (req, res) => {
    const posizioni = []

    db.query('SELECT * FROM parcheggio_stallo',
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            if(!result[0]){
                
            }else{
                posizioni.push(result)
                res.json({list: posizioni});
            }
        }
    }
    );
})



module.exports = router;