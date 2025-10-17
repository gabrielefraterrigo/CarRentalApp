import React, { useState, useEffect} from "react";
import Axios from "axios";
import ModificaPrenotazione from "./ModificaPrenotazione";


function TabellaPrenotazione ({idutente}) {
    const [listPrenotazione, setListPrenotazione] = useState([]);
    const [step, setStep] = useState(0);
    const [idprenotazione, setIdPrenotazione] = useState("");
    const [oldDate, setOldDate] = useState(new Date());
    
    useEffect(() =>{
        Axios.post("http://localhost:3001/gestionePrenotazione/listaPrenotazione", {
            idutente: idutente
        }).then((risultato)=>{
            if(risultato.data.error){
                alert(risultato.data.error);
                window.location.href="/"
            } else if(risultato.data.message) {
                
            } else {
                function list(){
                    risultato.data.listPrenotazione[0].forEach(
                        function(e,counter){
                            var url = ("https://api.mapbox.com/geocoding/v5/mapbox.places/"+ e.posizione_terminaX+ "%2C%20" + e.posizione_terminaY + ".json?pluginName=tableauGeocoder&access_token=pk.eyJ1IjoiZGVycmlsOTgiLCJhIjoiY2tzd3lnZmt4MjQ4azJubzNlYWljdjBzYyJ9.gZh2W18FMIvsvKoqx7MbWA&types=address&limit=1")
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
    },[idutente]);

    function eliminaPrenotazione (idprenotazione,targa) {
        //APRI POP UP
        console.log("run");
        document.getElementById('pop').style.display="block";

        //CHIUDI DAL BOTTONE CHIUDI
        document.getElementById("close").onclick = function(e){
            document.getElementById('pop').style.display="none";
        }
        //ELIMINA PRENOTAZIONE E CHIUDE POP UP
        document.getElementById("next").onclick = function(e) {
            document.getElementById('pop').style.display="none";

            Axios.post("http://localhost:3001/gestionePrenotazione/eliminaPrenotazione", {
            idprenotazione: idprenotazione,
            targa: targa

            }).then(() => {
            console.log("fatto!")
            window.location.href = "./listaPrenotazione"
            });

        }
        //CHIUDI DA SFONDO
        document.getElementById("pop").onclick = function(e){
            document.getElementById('pop').style.display="none";	
        }
        if(false){
            
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

    const nextStep = () => {
        setStep(step+1)
    }

    const backStep = () => {
        setStep(step-1)
    }

    const props = {backStep, idprenotazione, oldDate};

    switch(step) {
        
        case 0:
            return(
                <div className="listaPrenotazione table-responsive-sm" id="image">
                    <div className="containerTabella">
                    <h3>Lista prenotazioni</h3>
                    {listPrenotazione[0] && (
                    <table className="table table-striped table-bordered table-hover table-sm" id="listaPrenotazioni">

                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Targa</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Orario Inizio</th>
                                <th scope="col">Orario Fine</th>
                                <th scope="col">Autista</th>
                                <th scope="col">Destinazione</th>
                                <th scope="col">Azioni</th>
                            </tr>
                        </thead>

                        {listPrenotazione.map((valore) =>
                            <tbody className ="table-striped table-bordered table-hover" id="corpo" key={valore.idprenotazione}>
                                <tr>
                                    <td>{valore.idprenotazione}</td>
                                    <td>{valore.ref_targa}</td>
                                    <td>{valore.tipo}</td>
                                    <td>{data(valore.orario_prenotazione)}</td>
                                    <td>{data(valore.orario_terminazione)}</td>
                                    {valore.autista === 1 &&
                                        <td>Si</td>}
                                    {valore.autista === 0 &&
                                        <td>No</td>}
                                    <td>{valore.indirizzo}</td>
                                    <td> 
                                        {((new Date(valore.orario_prenotazione))-(new Date())>1800000) &&
                                            <div>
                                                <div className="overlay" id="pop">
                                                    <div className="popup">

                                                        <h2>Sei sicuro di voler eliminare la prenotazione?</h2>
                                                        <div className="bottoni">
                                                            <button className="btn btn-primary" id="close">Chiudi</button>

                                                            <button className="btn btn-danger" id="next">Elimina</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            <button className="btn btn-primary" onClick={() => {
                                                setIdPrenotazione(valore.idprenotazione);
                                                setOldDate(valore.orario_prenotazione);
                                                nextStep();
                                            }}>Modifica</button> 

                                            <button className="btn btn-danger" onClick={() => {
                                                eliminaPrenotazione(valore.idprenotazione,valore.ref_targa)
                                            }}>Elimina</button>
                                        </div>
                                    }
                                </td>
                            </tr>
                        </tbody>)}

                    </table>
                    
                    )}

                    {!listPrenotazione[0] && (
                        <h5>Non ci sono prenotazioni al momento</h5>
                    )}
                </div>
            </div>
            )

        case 1:
            return(
                <ModificaPrenotazione {...props}/>
                )
        default:
            return(null);

    }
}
export default TabellaPrenotazione;

