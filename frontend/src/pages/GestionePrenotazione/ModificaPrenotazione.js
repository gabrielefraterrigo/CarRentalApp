import React, { useState, useRef, useCallback} from "react";
import Axios from "axios";
import ReactMapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'

function ModificaPrenotazione ({backStep, idprenotazione, oldDate}) {
    
    ///////Funzioni Date////////
    const [dataInizio, setDataInizio] = useState();
    const [dataFine, setDataFine] = useState();

    const handleDataIni = () => {
        setDataInizio(new Date(document.getElementById("data_inizio").value+"T"+document.getElementById("orario_inizio").value+":00+02:00"));
    }
    const handleDataFin = () => {
        setDataFine(new Date(document.getElementById("data_fine").value+"T"+document.getElementById("orario_fine").value+":00+02:00"));
    }

    function controlloOra() {
        var oggi = new Date()
        var prenotazione = new Date(oldDate);
        

        var pren = (prenotazione.getHours() * 60 * 60) + (prenotazione.getMinutes() * 60) - 1800;
        
        var ora = (oggi.getHours() * 60 * 60) + (oggi.getMinutes() * 60);
        

        if ( (oggi.getMonth() > prenotazione.getMonth()) || (oggi.getMonth() === prenotazione.getMonth() && oggi.getDate() > prenotazione.getDate()) ||
             (oggi.getMonth() === prenotazione.getMonth() && oggi.getDate() === prenotazione.getDate() && ora >= pren)) {
            return(true);
        } else {
            return(false);
        }
    }

    function verificaDati(event) {
        event.preventDefault()
        var form = document.getElementById('form')
        form.classList.add('was-validated')
        if (form.checkValidity()) {
            if(dataInizio > dataFine){
                alert("Range inserito non valido")
            } else if((new Date())>dataInizio){
                alert("Inserire una data di prenotazione maggiore di quella odierna")      
            } else if(controlloOra()){
                alert("Puoi modificare la prenotare:\n-Entro mezz'ora dall'inizio della prenotazione.\n-Se la data della prenotazione non è antecedente a quella odierna.");
            } else {
                nextStep2();
            }
        }
    } 
    ////// Funzioni Mappa //////
    const f = useRef()
    const [destinazione, setDestinazione] = useState([])
    const mapRef = useRef()
    const [bbox] = useState([12.335622, 36.326164, 15.638706, 38.674870])

    const [viewport, setViewport] = useState({
        width: 800,
        height: 600,
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

    function verificaDestinazione() {
        if(destinazione.longitude!==undefined && destinazione.latitude!==undefined){
            setModifiche()
        }
    }

    function setModifiche(){
        Axios.post("http://localhost:3001/gestionePrenotazione/modificaPrenotazione", {
            idprenotazione: idprenotazione,
            destinazioneX: destinazione.longitude,
            destinazioneY: destinazione.latitude,
            orario_prenotazione: dataInizio.getFullYear()+"-"+addZero(dataInizio.getMonth()+1)+"-"+addZero(dataInizio.getDate())+"T"+addZero(dataInizio.getHours())+":"+addZero(dataInizio.getMinutes()),
            orario_terminazione: dataFine.getFullYear()+"-"+addZero(dataFine.getMonth()+1)+"-"+addZero(dataFine.getDate())+"T"+addZero(dataFine.getHours())+":"+addZero(dataFine.getMinutes())

            }).then(() => {
            
            window.location.href="/home"
            }).catch((error)=>{window.location.href="./ERROR"});    
    }

    function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
    }

    /////// STEP 2 ////////
    const [step2, setStep2] = useState(0);

    const nextStep2 = () => {
        setStep2(step2+1)
    }

    const backStep2 = () => {
        setStep2(step2-1)
    }

    switch(step2) {
        
        case 0:
            return(
                <div className="modificaPrenotazioneCli" id="image">
                <form className="row g-3 needs-validation" id={"form"} noValidate>
                    <div className="modificaPrenotazione">
                    <h3>Date e Orari</h3>
        
                    <div className="modificaCampo">
                        <div className="form">
                            <div className="input-group mb-3" >
                                <span className="input-group-text" id="basic-addon1-modifica">Data Prenotazione</span>
                                <input type="date"  className="form-control" id="data_inizio" onChange={handleDataIni} required></input>
                            </div>
                        </div>
                    </div>
        
                    <div className="modificaCampo">
                        <div className="form">
                            <div className="input-group mb-3" >
                                <span className="input-group-text" id="basic-addon1-modifica">Orario Prenotazione</span>
                                <input type="time"  className="form-control" id="orario_inizio" onChange={handleDataIni} required></input>
                            </div>
                        </div>
                    </div>
        
                    <div className="modificaCampo">
                        <div className="form">
                            <div className="input-group mb-3" >
                                <span className="input-group-text" id="basic-addon1-modifica">Data Fine Servizio</span>
                                <input type="date"  className="form-control" id="data_fine" onChange={handleDataFin} required></input>
                            </div>
                        </div>
                    </div>
        
                    <div className="modificaCampo">
                        <div className="form">
                            <div className="input-group mb-3" >
                                <span className="input-group-text" id="basic-addon1-modifica" >Orario Fine Servizio</span>
                                <input type="time"  className="form-control" id="orario_fine" onChange={handleDataFin} required></input>
                            </div>
                        </div>
                    </div>
                    <div className="steps">
                    <button className="btn btn-primary" onClick={backStep} >Indietro</button>
        
                    <button className="btn btn-primary" onClick={verificaDati}>Modifica</button>
                    </div>
                    </div>
                </form>
                </div>
            )

        case 1:
            return(
                <div className="form">
                    <ReactMapGL
                        {...viewport}
                        ref={mapRef}
                        mapboxApiAccessToken={'pk.eyJ1IjoiZGVycmlsOTgiLCJhIjoiY2tzd3lnZmt4MjQ4azJubzNlYWljdjBzYyJ9.gZh2W18FMIvsvKoqx7MbWA'}
                        onViewportChange={handleViewportChange}
                    >           
                        <Geocoder
                            mapRef={mapRef}
                            placeholder= "Destinazione"
                            containerRef={f}
                            marker={true}
                            bbox={bbox}
                            onViewportChange={handleGeocoderViewportChange}
                            mapboxApiAccessToken={'pk.eyJ1IjoiZGVycmlsOTgiLCJhIjoiY2tzd3lnZmt4MjQ4azJubzNlYWljdjBzYyJ9.gZh2W18FMIvsvKoqx7MbWA'}
                            />  
            
                    </ReactMapGL>
                    <div className="mappa">
                        <div className="mappa-bottoni">
                            
                            <div>
                                <h3>Nuova Destinazione</h3>
                                <div ref={f}></div>
                            </div>
                            
                            <button className="btn btn-primary mb-3" onClick={backStep2} id="back">Indietro</button>
                            <button className="btn btn-primary mb-3" onClick={verificaDestinazione} id="next">Next</button>
                            
                        </div>
                        
                    </div>
                </div>
                )
        default:
            return(null);

    }
}

export default ModificaPrenotazione;