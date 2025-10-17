import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function ConsegnaMezzo () {

    const [listPrenotazione, setListPrenotazione] = useState([]);
    const [ritardo, setRitardo] = useState("");
    useEffect(() =>{
        Axios.post("http://localhost:3001/gestionePrenotazione/consegnaMezzo", {
        },{headers: {
            loginToken: localStorage.getItem("loginToken")
            }
        }).then((risultato)=>{
            if(risultato.data.error){
                alert(risultato.data.error);
                window.location.href="/"
            } else if(risultato.data.message) {

            } else {
                function list(){
                    risultato.data.listPrenotazione[0].forEach(
                        function(e,counter){
                            var url = ("https://api.mapbox.com/geocoding/v5/mapbox.places/"+ e.posizione_consegnaX+ "%2C%20" + e.posizione_consegnaY + ".json?pluginName=tableauGeocoder&access_token=pk.eyJ1IjoiZGVycmlsOTgiLCJhIjoiY2tzd3lnZmt4MjQ4azJubzNlYWljdjBzYyJ9.gZh2W18FMIvsvKoqx7MbWA&types=address&limit=1")
                            if (typeof e === "object" ){
                                Axios.get(url, {
                                }).then((risp) => {
                                    e["indirizzo"] = risp.data.features[0].place_name
                                    if(counter===risultato.data.listPrenotazione[0].length-1){

                                        setListPrenotazione(risultato.data.listPrenotazione[0])
                                    }  
                                }).catch((error)=>{window.location.href="./ERROR"});
                            }
                            
                        }
                    )         
                }
                list();
            }
        }).catch((error)=>{window.location.href="./ERROR"});
    });

    function completaConsegna (idprenotazione) {
        Axios.post("http://localhost:3001/gestionePrenotazione/completaConsegna", {
            idprenotazione: idprenotazione
        }, {headers: {
        loginToken: localStorage.getItem("loginToken")
        }
        }).then(() => {
            
            window.location.href = "./home"
            }).catch((error)=>{window.location.href="./ERROR"});
    }
    function dichiaraRitardo (idprenotazione, ref_idcliente, orario_prenotazione, orario_terminazione) {
        //CALCOLO RITARDO
        var pren = new Date(orario_prenotazione);
        var term = new Date(orario_terminazione);

        var prenRitardo = (pren.getHours() * 3600) + (pren.getMinutes() * 60) + (ritardo * 60);
        var termRitardo = (term.getHours() * 3600) + (term.getMinutes() * 60) + (ritardo * 60);

        //inizio prenotazione con ritardo
        pren.setHours(Math.floor(prenRitardo / 3600)); //Calcolo ore
        pren.setMinutes((prenRitardo - (Math.floor(prenRitardo / 3600))*3600)/60); //Calcolo minuti

        //fine prenotazione con ritardo
        term.setHours(Math.floor(termRitardo / 3600)); //Calcolo ore
        term.setMinutes((termRitardo - (Math.floor(termRitardo / 3600))*3600)/60); //Calcolo minuti

        //Richiesta UPDATE
        Axios.post("http://localhost:3001/gestionePrenotazione/dichiaraRitardo", {
            idprenotazione: idprenotazione,
            orario_prenotazione: pren.getFullYear()+"-"+addZero(pren.getMonth()+1)+"-"+addZero(pren.getDate())+"T"+addZero(pren.getHours())+":"+addZero(pren.getMinutes()),
            orario_terminazione: term.getFullYear()+"-"+addZero(term.getMonth()+1)+"-"+addZero(term.getDate())+"T"+addZero(term.getHours())+":"+addZero(term.getMinutes()),
            }).then(() => {
                  
            }).catch((error)=>{window.location.href="./ERROR"});

        //Invio Notifica
        var contenuto = ("È stato dichiarato un ritardo per la prenotazione N°"+ idprenotazione +". Il nuovo orario indicato è " + addZero(pren.getHours())+":"+addZero(pren.getMinutes()));
        
        Axios.post("http://localhost:3001/gestionePrenotazione/notificaRitardo", {
            contenuto: contenuto,
            idcliente: ref_idcliente
            }).then(() => {
               
               window.location.href = "./consegnaMezzo"
            }).catch((error)=>{window.location.href="./ERROR"});
        
    }
    function dichiaraRitardoPopUp () {

        //APRI POP UP
        document.getElementById('pop').style.display="block";

        //CHIUDI DAL BOTTONE CHIUDI
        document.getElementById("closeRitardo").onclick = function(e){
            document.getElementById('pop').style.display="none";
        }

        //DICHIARA RITARDO E CHIUDE POP UP
        document.getElementById("dichiara").onclick = function(e) {
            setRitardo(document.getElementById("ritardo").value);
            document.getElementById('pop').style.display="none";

        }

    }
    
    function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
    }

    function data(data) {
        var a = new Date(data);

        var h = addZero(a.getHours());
        var m = addZero(a.getMinutes());

        return(a.getDate()+"/"+(a.getMonth()+1)+"/"+a.getFullYear()+" "+h+":"+m)
    }

    return(
        <div className="consegnaMezzo" id="image">
        <div className="containerTabella">
        <h3>Lista prenotazioni</h3>
        {listPrenotazione[0] && (<table className="table table-striped table-bordered table-hover" id="listaPrenotazioni">

            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">ID Cliente</th>
                    <th scope="col">Targa</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Orario Inizio</th>
                    <th scope="col">Destinazione</th>
                    <th scope="col">Azioni</th>
                </tr>
            </thead>

            {listPrenotazione.map((valore) =>
                <tbody className ="table-striped table-bordered table-hover" id="corpo" key={valore.idprenotazione}>
                    <tr>
                        <td>{valore.idprenotazione}</td>
                        <td>{valore.ref_idcliente}</td>
                        <td>{valore.ref_targa}</td>
                        <td>{valore.tipo}</td>
                        <td>{data(valore.orario_prenotazione)}</td>
                        <td>{valore.indirizzo}</td>
                        <td> 
                            {(((new Date()).getMonth()+1 < (new Date(valore.orario_prenotazione)).getMonth()+1) ||
                             (((new Date()).getMonth()+1 === (new Date(valore.orario_prenotazione)).getMonth()+1) && ((new Date()).getDate() <= (new Date(valore.orario_prenotazione)).getDate()))) &&
                                <div>
                                    <div className="overlay" id="pop">
                                        <div className="popupRitardo">

                                            <h2>Sei sicuro di voler rifiutare la prenotazione?</h2>
                                            <div className="ritardo ">

                                                <div className="dichiaraRitardo">
                                                    <div className="form">
                                                        <div className="input-group mb-3" >
                                                            <span className="input-group-text" id="basic-addon1-modifica" >Stima del ritardo</span>
                                                            <input type="text"  className="form-control" id="ritardo" required 
                                                                placeholder="Inserisci stima del ritardo" ></input>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bottoniRitardo">
                                                    <button className="btn btn-primary" id="closeRitardo">Chiudi</button>

                                                    <button className="btn btn-danger" id="dichiara" onClick= {() => {
                                                        dichiaraRitardo(valore.idprenotazione, valore.ref_idcliente, valore.orario_prenotazione, valore.orario_terminazione)}}>Dichiara ritardo</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary" onClick={() => {
                                        completaConsegna(valore.idprenotazione)
                                    }}>Completa consegna</button> 

                                    <button className="btn btn-danger" onClick={() => {

                                        dichiaraRitardoPopUp();
                                    }}>Dichiara ritardo</button>
                                </div>
                            }
                        </td>
                    </tr>
                </tbody>)}

        </table>)}

        {!listPrenotazione[0] && (
            <h5>Non ci sono prenotazioni al momento</h5>
        )}
        
        <a className="btn btn-primary" type="button" href="/home">Esci</a>
        </div>
    </div>
    )
}

export default ConsegnaMezzo;