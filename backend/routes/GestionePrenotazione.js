const express = require('express');
const router = express.Router();
const db = require('../db');
const {verificaToken} = require('../middlewares/token');

router.post('/listaPrenotazione', async (req, res) => {
    const idutente = req.body.idutente;
    const data = [];
    db.query('SELECT idprenotazione, ref_targa, tipo, orario_prenotazione, orario_terminazione, posizione_terminaX, posizione_terminaY, autista FROM prenotazione, disponibilita, veicolo WHERE ref_idcliente = ? AND ref_targa = targa AND ref_idveicolo_di = idveicolo ORDER BY orario_prenotazione DESC', 
        [idutente], (err, result) => {
            if(err) {
                res.json({ error:"Errore"});
            } else if(!result[0]){
                res.json({message:"Non ci sono prenotazioni"}); 
            } else {
                data.push(result);
                res.json({listPrenotazione: data});
            }
        });
});

router.post('/terminaServizio', verificaToken, async (req, res) => {
    const idutente = req.utente.idutente;
    const data = [];
    db.query('SELECT idprenotazione, ref_targa, tipo, orario_prenotazione, orario_terminazione, posizione_terminaX, posizione_terminaY, autista, ritirato, costo FROM prenotazione, disponibilita, veicolo WHERE ref_idcliente = ? AND concluso=false AND autista = false AND ref_targa = targa AND ref_idveicolo_di = idveicolo ORDER BY orario_prenotazione DESC', 
        [idutente], (err, result) => {
            if(err) {
                res.json({ error:"Errore"});
            } else if(!result[0]){
                res.json({message:"Non ci sono prenotazioni"}); 
            } else {
                data.push(result);
                res.json({listPrenotazione: data});
            }
        });
});

router.post('/gestioneServizioAutista', verificaToken, async (req, res) => {
    const idutente = req.utente.idutente;
    const data = [];
    
    db.query('SELECT idprenotazione, ref_targa, tipo, orario_prenotazione, orario_terminazione, posizione_terminaX, posizione_terminaY, autista, ritirato, costo FROM prenotazione, disponibilita, veicolo WHERE ref_idautista = ? AND concluso=false AND ref_targa = targa AND ref_idveicolo_di = idveicolo ORDER BY orario_prenotazione DESC', 
        [idutente], (err, result) => {
            if(err) {
                res.json({ error:"Errore"});
            } else if(!result[0]){
    
                res.json({message:"Non ci sono prenotazioni"}); 
            } else {
                
                data.push(result);
                res.json({listPrenotazione: data});
            }
        });
});

router.post('/segnaRitiro', async (req, res) => {
    const idprenotazione = req.body.idprenotazione;
    db.query('UPDATE prenotazione SET ritirato=true WHERE idprenotazione=?',
    [idprenotazione],
     (err, result) => {
        if (err) {
            res.json({ error:"Errore"});
        } else {
            res.send("Dati aggiornati!")
            
        }
     }
    );
});

router.post('/conclusione', async (req, res) => {
    const idprenotazione = req.body.idprenotazione;
    const targa = req.body.targa;
    const x = req.body.x;
    const y = req.body.y;
    db.query('UPDATE prenotazione SET concluso=true WHERE idprenotazione=?',
    [idprenotazione],
     (err, result) => {
        if (err) {
            res.json({ error:"Errore"});
        } else {
            
            db.query('UPDATE disponibilita SET prenotato=false, posizione_attualeX=?, posizione_attualeY=? WHERE targa=?',
            [x,y,targa],
             (err, result) => {
                if (err) {
                    res.json({ error:"Errore"});
                } else {
                    res.send("Dati aggiornati!")
                    
                }
             }
            );
        }
     }
    );
});

router.post('/conclusioneAutista', async (req, res) => {
    const idprenotazione = req.body.idprenotazione;
    const targa = req.body.targa;
    db.query('UPDATE prenotazione SET concluso=true WHERE idprenotazione=?',
    [idprenotazione],
     (err, result) => {
        if (err) {
            res.json({ error:"Errore"});
        } else {
            
            db.query('SELECT posizioneX, posizioneY FROM disponibilita, parcheggio_stallo WHERE targa = ? AND idparc_stal = ref_idparc_stal', 
            [targa], (err, result) => {
                if(err) {
                    res.json({ error:"Errore"});
                } else {
                    db.query('UPDATE disponibilita SET  prenotato=false ,posizione_attualeX= ?, posizione_attualeY = ? WHERE targa=?', 
                    [result[0].posizioneX, result[0].posizioneY, targa], (err, result) => {
                        if(err) {
                            res.json({ error:"Errore"});
                        } else {
                            res.send("Dati aggiornati!")
                        }
                    });
                }
            });
        }
     });
});

router.post('/modificaPrenotazione', async (req, res) => {
    const idprenotazione= req.body.idprenotazione;
    const orario_prenotazione = req.body.orario_prenotazione;
    const orario_terminazione = req.body.orario_terminazione;
    const x = req.body.destinazioneX;
    const y = req.body.destinazioneY;

    db.query('UPDATE prenotazione SET orario_prenotazione = ?, orario_terminazione = ?, posizione_terminaX = ?, posizione_terminaY = ? WHERE idprenotazione=?',
    [orario_prenotazione, orario_terminazione, x, y, idprenotazione],
     (err, result) => {
        if (err) {
            res.json({ error:"Errore"});
        } else {
            res.send("Dati aggiornati!")
            
        }
     }
    );
    
});

router.post('/eliminaPrenotazione', async (req, res) => {
    const idprenotazione= req.body.idprenotazione;
    const targa = req.body.targa;

    

    db.query('DELETE FROM prenotazione WHERE idprenotazione=?',
    [idprenotazione],
     (err, result) => {
        if (err) {
            res.json({ error:"Errore"});
        }
        else {
            db.query('UPDATE disponibilita SET prenotato=false WHERE targa=?',
                [targa],
                (err, result) => {
                    if (err) {
                        res.json({ error:"Errore"});
                    }
                    else {
                        res.send("Dati aggiornati!")
                        
                    }
                }
            );
        }
     }
    );
    
});

router.post('/ottieniRuolo', verificaToken, async (req, res) => {
    const ruolo = req.utente.ruolo;
    if(ruolo === undefined){
        res.json({ error:"Errore"});
    } else {
        res.json(ruolo);
    }
});

router.post("/verificaEmail", async (req, res) => {

    const email = req.body.email

    db.query('SELECT idutente FROM utente WHERE email=?', [email],
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

router.post('/controlloPrenotazione', verificaToken, async (req, res) => {
    const idautista = req.utente.idutente;
    const data = [];
    db.query('SELECT idprenotazione, ref_targa, tipo, ref_idcliente, orario_prenotazione, orario_terminazione, posizione_terminaX, posizione_terminaY FROM prenotazione, disponibilita, veicolo WHERE ref_targa = targa AND ref_idveicolo_di = idveicolo AND autista = 1 AND prenotazione.ref_idautista IS NULL AND idprenotazione NOT IN (SELECT idprenotazione FROM prenotazione, prenotazioni_rifiutate AS rf WHERE idprenotazione = ref_idprenotazione AND rf.ref_idautista = ?) ORDER BY orario_prenotazione DESC', 
        [idautista],
        (err, result) => {
            if(err) {
                res.json({ error:"Errore"});
            } else if(!result[0]){
                res.json({message:"Non ci sono prenotazioni"}); 
            } else {
                data.push(result);
                res.json({listPrenotazione: data});
            }
        });
});

router.post('/accettaPrenotazioneAutista', verificaToken, async(req, res) => {
    const ref_idautista = req.utente.idutente;
    const idprenotazione = req.body.idprenotazione;

    db.query('UPDATE prenotazione SET ref_idautista = ? WHERE idprenotazione = ?', [ref_idautista, idprenotazione],
    (err, result) => {
        if (err) {
            res.json({ error:"Errore"});
        }
        else {
            res.send("Dati aggiornati!")
            
        }
     }
    );
});

router.post('/rifiutaPrenotazioneAutista', verificaToken, async(req, res) => {
    const ref_idautista = req.utente.idutente;
    const idprenotazione = req.body.idprenotazione;

    db.query('INSERT INTO prenotazioni_rifiutate (ref_idprenotazione, ref_idautista_pr) VALUES (?, ?)', [idprenotazione, ref_idautista],
    (err, result) => {
        if (err) {
            res.json({ error:"Errore"});
        }
        else {
            res.send("Dati aggiornati!")
            
        }
     }
    );
});

router.post('/consegnaMezzo', verificaToken, async (req, res) => {
    const data = [];
    db.query('SELECT idprenotazione, ref_targa, tipo, ref_idcliente, orario_prenotazione, orario_terminazione, posizione_consegnaX, posizione_consegnaY FROM prenotazione, disponibilita, veicolo WHERE ref_targa = targa AND ref_idveicolo_di = idveicolo AND consegna = 1 AND ritirato = 0',
        (err, result) => {
            if(err) {
                res.json({ error:"Errore"});
            } else if(!result[0]){
                res.json({message:"Non ci sono prenotazioni"}); 
            } else {
                data.push(result);
                res.json({listPrenotazione: data});
            }
        });
});

router.post('/completaConsegna', verificaToken, async(req, res) => {
    const idprenotazione = req.body.idprenotazione;

    db.query('UPDATE prenotazione SET ritirato = 1 WHERE idprenotazione = ?', [idprenotazione],
    (err, result) => {
        if (err) {
            res.json({ error:"Errore"});
        }
        else {
            res.send("Dati aggiornati!")
            
        }
     }
    );
});

router.post('/dichiaraRitardo', async(req, res) => {
    const idprenotazione = req.body.idprenotazione;
    const orario_prenotazione = req.body.orario_prenotazione;
    const orario_terminazione = req.body.orario_terminazione
    db.query('UPDATE prenotazione SET orario_prenotazione = ?, orario_terminazione = ? WHERE idprenotazione = ?', [orario_prenotazione, orario_terminazione, idprenotazione],
    (err, result) => {
        if (err) {
            res.json({ error:"Errore"});
            console.log(err)

        }
        else {
            res.send("Dati aggiornati!")
            
        }
     }
    );
});

router.post('/notificaRitardo', async(req, res) => {
    const contenuto = req.body.contenuto;
    const idcliente = req.body.idcliente;
    const tipo = "Ritardo"
    db.query("INSERT INTO notifiche (tipo, contenuto, ref_idutente) VALUES (?, ?, ?)", [tipo, contenuto, idcliente],
    (err, result) => {
        if (err) {
            res.json({ error:"Errore"});
            console.log(err)

        }
        else {
            res.send("Dati aggiornati!")
            
        }
     }
    );
});

router.post('/notificaGuasto', async(req, res) => {
    const contenuto = req.body.contenuto;
    const idprenotazione = req.body.idprenotazione
    const tipo = "Guasto"
    const ruolo = "amministratore"
    db.query("select idutente from utente where ruolo=?", [ruolo],
    (err, result) => {
        if (err) {
            res.json({ error:"Errore"});
            console.log(err)
        }
        else {
            
            result.forEach(
                function(e){
                    
                    db.query("INSERT INTO notifiche (tipo, contenuto, ref_idutente) VALUES (?, ?, ?)", [tipo, contenuto, e.idutente],
                        (err, result) => {
                        if (err) {
                            res.json({ error:"Errore"});
                            
                        }
                        else {
                            res.send("Dati aggiornati!")
                            
                        }
                    });
                }
            )  
        }
     }
    );   
});

router.post('/dichiaraRitardoCliente', async(req, res) => {
    const idprenotazione = req.body.idprenotazione;
    const orario_terminazione = req.body.orario_terminazione
    const costoAggiornato = req.body.costoAggiornato;
    db.query('UPDATE prenotazione SET orario_terminazione = ?, costo=? WHERE idprenotazione = ?', [orario_terminazione, costoAggiornato,idprenotazione],
    (err, result) => {
        if (err) {
            res.json({ error:"Errore"});
            console.log(err)

        }
        else {
            res.send("Dati aggiornati!")
            
        }
     }
    );
});

router.post('/dichiaraCambioDestinazione', async (req, res) => {
    const idprenotazione= req.body.idprenotazione;
    const x = req.body.destinazioneX;
    const y = req.body.destinazioneY;

    db.query('UPDATE prenotazione SET posizione_terminaX = ?, posizione_terminaY = ? WHERE idprenotazione=?',
    [x, y, idprenotazione],
     (err, result) => {
        if (err) {
            result.json({ error:"Errore"});
        } else {
            res.send("Dati aggiornati!")
            
        }
     }
    );
    
});

router.post('/segnalaGuasto', async (req, res) => {
    const idprenotazione= req.body.idprenotazione;
    const x = req.body.guastoX;
    const y = req.body.guastoY;
    const targa = req.body.targa;

    db.query('UPDATE prenotazione SET concluso=true WHERE idprenotazione=?',
    [idprenotazione],
     (err, result) => {
        if (err) {
            result.json({ error:"Errore"});
        } else {
            db.query('UPDATE disponibilita SET posizione_attualeX = ?, posizione_attualeY = ? WHERE targa=?',
            [x, y, targa],
            (err, result) => {
                if (err) {
                    result.json({ error:"Errore"});
                } else {
                    res.send("Dati aggiornati!")
                    
                }
            }
            );
        }
     }
    );
    
});

router.post('/prendiIncarico', verificaToken, async (req, res) => {
    const idutente = req.utente.idutente;
    const idprenotazione = req.body.idprenotazione;
    const targa = req.body.targa;
    db.query('UPDATE prenotazione SET ref_idoperatore=? WHERE idprenotazione=?', 
        [idutente, idprenotazione], (err, result) => {
            if(err) {
                res.json({ error:"Errore"});
            } else {
                db.query('UPDATE disponibilita SET prenotato=true WHERE targa=?', 
                    [targa], (err, result) => {
                        if(err) {
                            res.json({ error:"Errore"});
                        } else {
                            res.send("Dati aggiornati!")
                        }
                });
            }
    });
});

router.post('/completaRiportaMezzo', verificaToken, async (req, res) => {
    const targa = req.body.targa;
    db.query('SELECT posizioneX, posizioneY FROM disponibilita, parcheggio_stallo WHERE targa = ? AND idparc_stal = ref_idparc_stal', 
        [targa], (err, result) => {
            if(err) {
                res.json({ error:"Errore"});
            } else {
                db.query('UPDATE disponibilita SET  prenotato=false, guasto=false, posizione_attualeX= ?, posizione_attualeY = ? WHERE targa=?', 
                    [result[0].posizioneX, result[0].posizioneY, targa], (err, result) => {
                        if(err) {
                            res.json({ error:"Errore"});
                        } else {
                            res.send("Dati aggiornati!")
                        }
                });
            }
    });
});

router.post('/riportaMezzo', verificaToken, async (req, res) => {
    const idutente = req.utente.idutente;
    const ora = req.body.ora;
    const data = [];

    db.query('SELECT idprenotazione, ref_targa, tipo, posizione_terminaX, posizione_terminaY, ref_idoperatore, ref_idparc_stal, guasto FROM disponibilita D, prenotazione PR, veicolo V, parcheggio_stallo PS WHERE PR.ref_targa = D.targa AND V.idveicolo = ref_idveicolo_di AND PR.concluso=true AND ref_idparc_stal = idparc_stal AND (ref_idoperatore IS NULL OR ref_idoperatore=?) AND (posizione_attualeX > posizioneX OR posizione_attualeX < posizioneX OR posizione_attualeY > posizioneY OR posizione_attualeY < posizioneY) AND PR.orario_terminazione<? AND PR.orario_terminazione >= ALL(select PR2.orario_terminazione from prenotazione PR2 where PR2.ref_targa = PR.ref_targa);', 
     [idutente,ora],(err, result) => {
            if(err) {
                res.json({ error:"Errore"});
            } else if(!result[0]){
                res.json({message:"Non ci sono prenotazioni"}); 
            } else {
                data.push(result);
                res.json({listPrenotazione: data});
            }
    });
});


module.exports = router;