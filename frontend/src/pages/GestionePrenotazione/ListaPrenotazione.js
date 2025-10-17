import React, { useState, useEffect } from "react";
import Axios from "axios";
import TabellaPrenotazione from "./TabellaPrenotazione";
import ListaPrenotazioneCliente from "./ListaPrenotazioneCliente";

function ListaPrenotazione() {

    const [ruolo, setRuolo] = useState("");
    const [idutente, setIdUtente] = useState("");

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
                setIdUtente(risultato.data.idutente);
            }
        }).catch((error)=>{window.location.href="./ERROR"});
    })

    
    const props = {idutente}

    switch(ruolo) {

        case "amministratore": //caso amministratore
            return(<ListaPrenotazioneCliente/>);

        case "cliente": //caso cliente
            return (<TabellaPrenotazione {...props}/>);

        default:
            return(null);
            

    }
}

 export default ListaPrenotazione;