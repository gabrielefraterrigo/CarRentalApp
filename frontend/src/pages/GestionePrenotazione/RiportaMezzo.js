import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function RiportaMezzo () {

    const [listPrenotazione, setListPrenotazione] = useState([]);
    useEffect(() =>{
        Axios.post("http://localhost:3001/gestionePrenotazione/riportaMezzo", {
            ora: (new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+"-"+((new Date()).getDate()-1)+"T"+(new Date()).getHours()+":"+(new Date()).getMinutes()
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
    },[]);

    function riportaMezzo (targa) {
        Axios.post("http://localhost:3001/gestionePrenotazione/completaRiportaMezzo", {
            targa: targa,
        }, {headers: {
        loginToken: localStorage.getItem("loginToken")
        }
        }).then(() => {
            
            window.location.href = "./riportaMezzo"
        }).catch((error)=>{window.location.href="./ERROR"}); 
    }

    function prendiIncarico (idprenotazione,targa) {
        Axios.post("http://localhost:3001/gestionePrenotazione/prendiIncarico", {
            idprenotazione: idprenotazione,
            targa: targa
        }, {headers: {
        loginToken: localStorage.getItem("loginToken")
        }
        }).then(() => {
            
            window.location.href = "./riportaMezzo"
        }).catch((error)=>{window.location.href="./ERROR"}); 
    }

    return(
        <div className="consegnaMezzo" id="image">
        <div className="containerTabella">
        <h3>Lista prenotazioni</h3>
        {listPrenotazione[0] && (<table className="table table-striped table-bordered table-hover" id="listaPrenotazioni">

            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Targa</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">ID Parcheggio</th>
                    <th scope="col">Posizione Attuale</th>
                    <th scope="col">Guasto</th>
                    <th scope="col">Azioni</th>
                </tr>
            </thead>

            {listPrenotazione.map((valore) =>
                <tbody className ="table-striped table-bordered table-hover" id="corpo" key={valore.idprenotazione}>
                    <tr>
                        <td>{valore.idprenotazione}</td>
                        <td>{valore.ref_targa}</td>
                        <td>{valore.tipo}</td>
                        <td>{valore.ref_idparc_stal}</td>
                        <td>{valore.indirizzo}</td>
                        <td>{valore.guasto}</td>
                                <div>
                                    {valore.ref_idoperatore===null
                                        ?
                                    (<button className="btn btn-primary" onClick={() => {
                                        prendiIncarico(valore.idprenotazione, valore.ref_targa)
                                    }}>Prendi incarico</button>)
                                        : 
                                    (<button className="btn btn-primary" onClick={() => {
                                        riportaMezzo(valore.ref_targa)
                                    }}>Completa consegna</button>)
                                    }                                    
                                </div>
                        
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

export default RiportaMezzo;