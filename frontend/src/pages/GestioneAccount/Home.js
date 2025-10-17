import {useEffect, useState} from 'react';
import Axios from 'axios';

function Home(){
    const[ruolo, setRuolo] = useState("");
    useEffect(() =>{
        Axios.post("http://localhost:3001/gestioneAccount/home", {
        },{
        headers: {
        loginToken: localStorage.getItem("loginToken")
        }
        }).then((risultato)=>{
            if(risultato.data.error){
                alert(risultato.data.error);
                setRuolo("");
                window.location.href="/"
            }else {
                setRuolo(risultato.data.ruolo); //Il valore di ruolo viene settato verificando prima il token e impostandolo da questo
            }
        }).catch((error)=>{window.location.href="./ERROR"});
    })
    
    
    return (
        <div id="image">
            <div className="home">
            {ruolo === "cliente" && (
                <div className="azioni">
                    <a href="/prenotazione" className="btn btn-primary mb-3"role="button" aria-disabled="true">Prenota Mezzo</a>
                    <a href="/listaPrenotazione" className="btn btn-primary mb-3" role="button" aria-disabled="true">Lista Prenotazioni</a>
                    <a href="/terminaServizio" className="btn btn-primary mb-3" role="button" aria-disabled="true">Inizia Corsa</a>
                </div>

            )}

            {ruolo === "autista" && (
                <>
                <div className="azioni">
                    <a href="/controlloPrenotazione" className="btn btn-primary mb-3"  role="button" aria-disabled="true">Controllo Prenotazioni</a>
                    <a href="/gestioneServizioAutista" className="btn btn-primary mb-3"  role="button" aria-disabled="true">Inizia Corsa</a>
                </div>
                </>
            )}

            {ruolo === "operatore" && (
                
                <div className="azioni">
                    <a href="/consegnaMezzo" className="btn btn-primary mb-3" role="button" aria-disabled="true">Consegna Mezzo</a>
                    <a href="/riportaMezzo" className="btn btn-primary mb-3" role="button" aria-disabled="true">Riporta Mezzo</a>
                </div>
                
            )}

             {ruolo === "amministratore" && (
                <div className="azioni">
                    <a href="/registrazioneadmin" className="btn btn-primary mb-3" role="button" aria-disabled="true">Registrazione Dipendente</a>
                    <a href="/prenotazione" className="btn btn-primary mb-3" role="button" aria-disabled="true">Prenota Mezzo</a>
                    <a href="/listaPrenotazione" className="btn btn-primary mb-3" role="button" aria-disabled="true">Lista Prenotazioni</a>

                </div>
            )}
        </div>
        </div>
    )
}

export default Home;
