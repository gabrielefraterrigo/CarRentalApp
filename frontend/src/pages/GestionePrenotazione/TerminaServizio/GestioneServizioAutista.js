import React, { useState, useEffect, useRef, useCallback} from "react";
import Axios from "axios";
import ReactMapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'

function GestioneServizioAutista() {
    const [listPrenotazione, setListPrenotazione] = useState([]);
        
    useEffect(() =>{
        Axios.post("http://localhost:3001/gestionePrenotazione/gestioneServizioAutista", {
        },{
            headers: {
            loginToken: localStorage.getItem("loginToken")
        }
        }).then((risultato)=>{
            if(risultato.data.error){
                alert(risultato.data.error);
                window.location.href="/"
            } else if(risultato.data.message) {
                  console.log("AIUTO")  
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
                                        console.log(risultato.data.listPrenotazione[0])
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
    
    function segnaRitiro(idprenotazione){
        Axios.post("http://localhost:3001/gestionePrenotazione/segnaRitiro", {
            idprenotazione: idprenotazione,
            }).then(() => {
                console.log("fatto!")
            }).catch((error)=>{window.location.href="./ERROR"});
    }

    function mostraRitardo() {
        //APRI POP UP
        console.log("run");
        document.getElementById('pop0').style.display="block";
    
        //CHIUDI DAL BOTTONE CHIUDI
        document.getElementById("closeRitardoCliente").onclick = function(e){
            document.getElementById('pop0').style.display="none";
        }

        //DICHIARA RITARDO E CHIUDE POP UP
        document.getElementById("dichiaraCliente").onclick = function(e) {
            document.getElementById('pop0').style.display="none";

        }
        
        if(false){
                
        }
    }
    
    function mostraDettagli() {
        //APRI POP UP
        console.log("run");
        document.getElementById('pop1').style.display="block";
    
        //CHIUDI DAL BOTTONE CHIUDI
        document.getElementById("close").onclick = function(e){
            document.getElementById('pop1').style.display="none";
        }
            
        //CHIUDI DA SFONDO
        document.getElementById("pop1").onclick = function(e){
            document.getElementById('pop1').style.display="none";	
        }
        if(false){
                
        }
    }

    ///////Funzioni Ritardo Cliente

    const [ritardoCliente, setRitardoCliente] = useState("");

    function segnalaRitardoCliente (idprenotazione, orario_terminazione, costo) {
        //CALCOLO RITARDO
        var term = new Date(orario_terminazione);

        var termRitardo = (term.getHours() * 3600) + (term.getMinutes() * 60) + (ritardoCliente * 60);

        //fine prenotazione con ritardo
        term.setHours(Math.floor(termRitardo / 3600)); //Calcolo ore
        term.setMinutes((termRitardo - (Math.floor(termRitardo / 3600))*3600)/60); //Calcolo minuti

        //Cambio costo
        var speseExtra =  ritardo/20
        var costoAggiornato = parseFloat(costo)+parseFloat(speseExtra); //3 euro per ogni ora di ritardo
        console.log(costoAggiornato)
        
        //Richiesta UPDATE
        Axios.post("http://localhost:3001/gestionePrenotazione/dichiaraRitardoCliente", {
            idprenotazione: idprenotazione,
            orario_terminazione: term.getFullYear()+"-"+addZero(term.getMonth()+1)+"-"+addZero(term.getDate())+"T"+addZero(term.getHours())+":"+addZero(term.getMinutes()),
            costoAggiornato: costoAggiornato
            }).then(() => {
                console.log("fatto!")
                window.location.href = "./gestioneServizioAutista"
            }).catch((error)=>{window.location.href="./ERROR"});

        //Invio Notifica
        /*var contenuto = ("È stato dichiarato un ritardo per la prenotazione N°"+ idprenotazione +". Il nuovo orario indicato per la conclusione del servizio è " + addZero(term.getHours())+":"+addZero(term.getMinutes()));
        console.log(contenuto)
        Axios.post("http://localhost:3001/gestionePrenotazione/???", {
            contenuto: contenuto
        }).then(() => {
            console.log("fatto!")
            //window.location.href = "./consegnaMezzo"
        });*/
        
    }

 ////////

 ////// Funzioni Mappa //////
        
    function mostraMappa() {
        //APRI POP UP
        document.getElementById("mappa").onclick = function(e){
            document.getElementById('pop1').style.display="none";
            document.getElementById('pop2').style.display="block";
        }

        //CHIUDI DAL BOTTONE CHIUDI
        document.getElementById("closeMappa").onclick = function(e){
            document.getElementById('pop2').style.display="none";
        }
        
        //CHIUDI DA SFONDO
        if(false){
            
        }
    }   
        const [bbox] = useState([12.335622, 36.326164, 15.638706, 38.674870])
        const [destinazione, setDestinazione] = useState([])
        const mapRef = useRef()
    
        const [viewport, setViewport] = useState({
            width: 400,
            height: 500,
            latitude: 38.0000,
            longitude: 13.4376,
            zoom: 8
        });
    
        const handleViewportChange = useCallback(
            (newViewport) => setViewport(newViewport),
            []
        );
    
        const handleGeocoderViewportChange = useCallback(
            (newViewport) => {
              const geocoderDefaultOverrides = { transitionDuration: 1000 };
              setDestinazione(newViewport);
              return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides
              });
            },
            [handleViewportChange]
        );
    
        function verificaDestinazione(idprenotazione) {
            if(destinazione.longitude!==undefined && destinazione.latitude!==undefined){
                Axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/"+ destinazione.longitude+ "%2C%20" + destinazione.latitude + ".json?pluginName=tableauGeocoder&access_token=pk.eyJ1IjoiZGVycmlsOTgiLCJhIjoiY2tzd3lnZmt4MjQ4azJubzNlYWljdjBzYyJ9.gZh2W18FMIvsvKoqx7MbWA&types=address&limit=1", {
                }).then((risp) => {

                    Axios.post("http://localhost:3001/gestionePrenotazione/dichiaraCambioDestinazione", {
                        idprenotazione: idprenotazione,
                        destinazioneX: destinazione.longitude,
                        destinazioneY: destinazione.latitude
                    }).then(() => {
                        console.log("fatto!")
                        window.location.href = "./gestioneServizioAutista"
                    }).catch((error)=>{window.location.href="./ERROR"});
                    
                    /*
                    var contenuto = ("È stato dichiarato un cambio di destinazione per la prenotazione N°"+ idprenotazione +". La nuova destinazione è: "+ risp.data.features[0].place_name);
                    console.log(contenuto)
                    Axios.post("http://localhost:3001/gestionePrenotazione/???", {
                        contenuto: contenuto,
                    }).then(() => {
                        console.log("fatto!")
                        //window.location.href = "./consegnaMezzo"
                    });*/

                })    
            }
        }
    //////////


    //////Funzioni Ritardo///////// 

    const [ritardo, setRitardo] = useState("");
    
    function segnalaRitardoPopUp() {

        //APRI POP UP
        document.getElementById("ritardo").onclick = function(e){
            document.getElementById('pop1').style.display="none";
            document.getElementById('pop3').style.display="block";
        }
        
        //CHIUDI DAL BOTTONE CHIUDI
        document.getElementById("closeRitardo").onclick = function(e){
            document.getElementById('pop3').style.display="none";
        }
        
        //DICHIARA RITARDO E CHIUDE POP UP
        document.getElementById("dichiara").onclick = function(e) {
            document.getElementById('pop3').style.display="none";

        }

    }

    function segnalaRitardo (idprenotazione, orario_terminazione, costo) {
        //CALCOLO RITARDO
        var term = new Date(orario_terminazione);

        var termRitardo = (term.getHours() * 3600) + (term.getMinutes() * 60) + (ritardo * 60);

        //fine prenotazione con ritardo
        term.setHours(Math.floor(termRitardo / 3600)); //Calcolo ore
        term.setMinutes((termRitardo - (Math.floor(termRitardo / 3600))*3600)/60); //Calcolo minuti
        
        //Richiesta UPDATE
        Axios.post("http://localhost:3001/gestionePrenotazione/dichiaraRitardoCliente", {
            idprenotazione: idprenotazione,
            orario_terminazione: term.getFullYear()+"-"+addZero(term.getMonth()+1)+"-"+addZero(term.getDate())+"T"+addZero(term.getHours())+":"+addZero(term.getMinutes()),
            costoAggiornato: costo
            }).then(() => {
                console.log("fatto!")
                window.location.href = "./gestioneServizioAutista"
            }).catch((error)=>{window.location.href="./ERROR"});

        //Invio Notifica
        /*var contenuto = ("È stato dichiarato un ritardo per la prenotazione N°"+ idprenotazione +". Il nuovo orario indicato per la conclusione del servizio è " + addZero(term.getHours())+":"+addZero(term.getMinutes()));
        console.log(contenuto)
        Axios.post("http://localhost:3001/gestionePrenotazione/???", {
            contenuto: contenuto
        }).then(() => {
            console.log("fatto!")
            //window.location.href = "./consegnaMezzo"
        });*/
        
    }

    /////////


    //////Funzioni Guasto/////////

    function mostraMappaGuasto() {
        //APRI POP UP
        document.getElementById("guasto").onclick = function(e){
            document.getElementById('pop1').style.display="none";
            document.getElementById('pop4').style.display="block";
        }

        //CHIUDI DAL BOTTONE CHIUDI
        document.getElementById("closeGuasto").onclick = function(e){
            document.getElementById('pop4').style.display="none";
        }
        
        //CHIUDI DA SFONDO
        if(false){
            
        }
    }
    const [guasto, setGuasto] = useState([])

    const mapRef2 = useRef()
    
        const [viewport2, setViewport2] = useState({
            width: 400,
            height: 500,
            latitude: 38.0000,
            longitude: 13.4376,
            zoom: 8
        });
    
        const handleViewportChangeGuasto = useCallback(
            (newViewport2) => setViewport2(newViewport2),
            []
        );

    const handleGeocoderViewportChangeGuasto = useCallback(
        (newViewport2) => {
          const geocoderDefaultOverrides = { transitionDuration: 1000 };
          setGuasto(newViewport2);
          return handleViewportChangeGuasto({
            ...newViewport2,
            ...geocoderDefaultOverrides
          });
        },
        [handleViewportChangeGuasto]
    );

    function verificaPosizioneGuasto(idprenotazione,targa) {
        if(guasto.longitude!==undefined && guasto.latitude!==undefined){
            Axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/"+ guasto.longitude+ "%2C%20" + guasto.latitude + ".json?pluginName=tableauGeocoder&access_token=pk.eyJ1IjoiZGVycmlsOTgiLCJhIjoiY2tzd3lnZmt4MjQ4azJubzNlYWljdjBzYyJ9.gZh2W18FMIvsvKoqx7MbWA&types=address&limit=1", {
                }).then((risp) => {

                    Axios.post("http://localhost:3001/gestionePrenotazione/segnalaGuasto", {
                        idprenotazione: idprenotazione,
                        guastoX: guasto.longitude,
                        guastoY: guasto.latitude,
                        targa: targa
                    }).then(() => {
                        console.log("OOOOO")
                    }).catch((error)=>{window.location.href="./ERROR"});
                        
                    var contenuto = ("È stato segnalato un guasto per la prenotazione N°"+ idprenotazione +". La posizione del veicolo è: "+ risp.data.features[0].place_name);
                    console.log(contenuto)
                    Axios.post("http://localhost:3001/gestionePrenotazione/notificaGuasto", {
                        contenuto: contenuto,
                        idprenotazione: idprenotazione,
                    }).then(() => {
                        console.log("fatto!")
                        window.location.href = "./gestioneServizioAutista"
                    }).catch((error)=>{window.location.href="./ERROR"});

            }).catch((error)=>{window.location.href="./ERROR"}); 
        }
    }

    /////////


    //////Funzione Conclusione////////

    function conclusione(idprenotazione,targa) {

        document.getElementById("concludi").onclick = function(e){
            Axios.post("http://localhost:3001/gestionePrenotazione/conclusioneAutista", {
                idprenotazione: idprenotazione,
                targa: targa,
                }).then(() => {
                    console.log("fattooo!")
                    window.location.href = "./home"
                }).catch((error)=>{window.location.href="./ERROR"});
        }
        
    }

    ////////

        
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
                <div className="listaPrenotazione" id="image">
                    <div className="containerTabella">
                <h3>Lista Prenotazioni Attive</h3>
                {listPrenotazione[0] && (<table className="table table-striped table-bordered table-hover" id="listaPrenotazioni">
    
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Targa</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Orario Inizio</th>
                            <th scope="col">Orario Fine</th>
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
                                <td>{valore.indirizzo}</td>
                                <td> 
                                    {((new Date(valore.orario_prenotazione))-(new Date())<1800000) && 
                                        (
                                            <div>

                                                {/*////OVERLAY RITARDO CLIENTE////*/}

                                                <div className="overlay" id="pop0">
                                                    <div className="popupRitardo">
                                                    <h2>Dichiara Ritardo Cliente</h2>
                                                    <div className="ritardo ">

                                                        <div className="dichiaraRitardo">
                                                            <div className="form">
                                                                <div className="input-group mb-3" >
                                                                    <span className="input-group-text" id="basic-addon1-modifica" >Stima del ritardo</span>
                                                                    <input type="text"  className="form-control" value={ritardoCliente} onChange={(e)=>{setRitardoCliente(e.target.value)}} id="ritardoCliente" 
                                                                            placeholder="Inserisci stima del ritardo" ></input>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="bottoniRitardo">
                                                            <button className="btn btn-primary" id="closeRitardoCliente">Chiudi</button>
                                                            <button className="btn btn-danger" id="dichiaraCliente" onClick= {() => {
                                                                segnalaRitardoCliente(valore.idprenotazione, valore.orario_terminazione, valore.costo)}}>Dichiara ritardo</button>
                                                        </div>

                                                    </div>
                                                    </div>
                                                </div>

                                                {/*////OVERLAY COMANDI////*/}
                                                <div className="overlay" id="pop1">
                                                        <div className="popup">
                                                            <h2>Comandi</h2>
                                                            <div className="bottoni">
                                                                <button className="btn btn-primary" id="mappa">Dichiara Cambio di Destinazione</button>
                                                                <button className="btn btn-primary" id="ritardo">Dichiara Ritardo</button>
                                                                <button className="btn btn-warning" id="guasto">Segnala Guasto</button>
                                                                <button className="btn btn-success" id='concludi'>Concludi Noleggio</button>
                                                                <button className="btn btn-danger" id="close">Chiudi</button>
                                                            </div>
                                                        </div>
                                                </div>

                                            {/*////OVERLAY MAPPA////*/}

                                            <div className="overlay" id="pop2">
                                                    <div className="popup">
                                                        <h2>Cambio Destinazione</h2>
                                                        <div>
                                                        <ReactMapGL
                                                            {...viewport}
                                                            ref={mapRef}
                                                            mapboxApiAccessToken={'pk.eyJ1IjoiZGVycmlsOTgiLCJhIjoiY2tzd3lnZmt4MjQ4azJubzNlYWljdjBzYyJ9.gZh2W18FMIvsvKoqx7MbWA'}
                                                            onViewportChange={handleViewportChange}
                                                        >          
                                                            <Geocoder
                                                                mapRef={mapRef}
                                                                placeholder= "Destinazione"
                                                                marker={true}
                                                                bbox={bbox}
                                                                onViewportChange={handleGeocoderViewportChange}
                                                                mapboxApiAccessToken={'pk.eyJ1IjoiZGVycmlsOTgiLCJhIjoiY2tzd3lnZmt4MjQ4azJubzNlYWljdjBzYyJ9.gZh2W18FMIvsvKoqx7MbWA'}
                                                                />  
                                                        </ReactMapGL>
                                                        </div>
                                                        <div >
                                                            <div > 
                                                                <button className="btn btn-primary" id="closeMappa">Indietro</button>
                                                                <button className="btn btn-primary" onClick={() => {verificaDestinazione(valore.idprenotazione)}}>Next</button>  
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>

                                            {/*////OVERLAY RITARDO AUTISTA////*/}

                                            <div className="overlay" id="pop3">
                                                    <div className="popupRitardo">

                                                        <h2>Dichiara Ritardo</h2>
                                                        <div className="ritardo ">

                                                            <div className="dichiaraRitardo">
                                                                <div className="form">
                                                                    <div className="input-group mb-3" >
                                                                        <span className="input-group-text" id="basic-addon1-modifica" >Stima del ritardo</span>
                                                                        <input type="text"  className="form-control" value={ritardo} onChange={(e)=>{setRitardo(e.target.value)}} id="ritardo" 
                                                                            placeholder="Inserisci stima del ritardo" ></input>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="bottoniRitardo">
                                                                <button className="btn btn-primary" id="closeRitardo">Chiudi</button>
                                                                <button className="btn btn-danger" id="dichiara" onClick= {() => {
                                                                    segnalaRitardo(valore.idprenotazione, valore.orario_terminazione, valore.costo)}}>Dichiara ritardo</button>
                                                            </div>

                                                        </div>
                                                    </div>
                                            </div>

                                            {/*////OVERLAY GUASTO////*/}

                                            <div className="overlay" id="pop4">
                                                    <div className="popup">
                                                        <h2>Posizione del veicolo guasto</h2>
                                                        <div>
                                                        <ReactMapGL
                                                            {...viewport2}
                                                            ref={mapRef2}
                                                            mapboxApiAccessToken={'pk.eyJ1IjoiZGVycmlsOTgiLCJhIjoiY2tzd3lnZmt4MjQ4azJubzNlYWljdjBzYyJ9.gZh2W18FMIvsvKoqx7MbWA'}
                                                            onViewportChange={handleViewportChangeGuasto}
                                                        >          
                                                            <Geocoder
                                                                mapRef={mapRef2}
                                                                placeholder= "Guasto"
                                                                marker={true}
                                                                bbox={bbox}
                                                                onViewportChange={handleGeocoderViewportChangeGuasto}
                                                                mapboxApiAccessToken={'pk.eyJ1IjoiZGVycmlsOTgiLCJhIjoiY2tzd3lnZmt4MjQ4azJubzNlYWljdjBzYyJ9.gZh2W18FMIvsvKoqx7MbWA'}
                                                                />  
                                                        </ReactMapGL>
                                                        </div>
                                                    <div >
                                                            <div > 
                                                                <button className="btn btn-primary" id="closeGuasto">Indietro</button>
                                                                <button className="btn btn-primary" onClick={() => {verificaPosizioneGuasto(valore.idprenotazione, valore.ref_targa)}}>Next</button>  
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                            
                                            {/*////BOTTONI////*/}

                                                {!valore.ritirato ?
                                                (<div>
                                                    <button className="btn btn-warning" onClick={() => {
                                                    mostraRitardo();  
                                                }}>Dichiara Ritardo</button>
                                                <button className="btn btn-info" onClick={() => {
                                                    segnaRitiro(valore.idprenotazione)
                                                    mostraDettagli();
                                                    mostraMappa();
                                                    segnalaRitardoPopUp();
                                                    mostraMappaGuasto();
                                                    conclusione(valore.idprenotazione,valore.ref_targa) 
                                                }}>Visualizza Comandi</button> 
                                                </div>)
                                                    :
                                                (<button className="btn btn-info" onClick={() => {
                                                    mostraMappa();
                                                    segnalaRitardoPopUp();
                                                    mostraMappaGuasto();
                                                    conclusione(valore.idprenotazione,valore.ref_targa);
                                                    mostraDettagli();
                                                }}>Visualizza Comandi</button>)
                                                }
                                                
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            </tbody>)}

                    </table>)}

                    {!listPrenotazione[0] && (
                        <h5>Non ci sono prenotazioni al momento</h5>
                    )}
                    </div>
                </div>
                )
}

export default GestioneServizioAutista;





