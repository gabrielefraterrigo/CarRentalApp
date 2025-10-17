import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
import Axios from 'axios';

function SelezionareLaDestinazione({nextStep,backStep,setTarga,setPartenza,setDestinazione,setAutista,setConsegna,setRitiro,setPosizione,consegna,autista,partenza,ritiro,veicolo}) {
    const [inizio, setInizio] = useState([])
    const [fine, setFine] = useState([])
    const [mezzi, setMezzi] = useState([])
    const [bbox] = useState([12.335622, 36.326164, 15.638706, 38.674870])

    const mapRef = useRef()

    const [viewport, setViewport] = useState({
        width: 800,
        height: 600,
        latitude: 38.0000,
        longitude: 13.4376,
        zoom: 8,
    }); 

    useEffect(() =>{
        if(inizio.longitude!==undefined){
            Axios.post("http://localhost:3001/prenotazioneMezzo/cercaMezzo", {
            X: inizio.longitude,
            Y: inizio.latitude,
            veicolo: veicolo
            }).then((risposta) => {
                if(risposta.data.error) {
                    alert(risposta.data.error);
                }else {
                    setMezzi(risposta.data.list[0])
                }
            }).catch((error)=>{window.location.href="./ERROR"}); 
        }      
    },[inizio,veicolo])
    
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );
    
    const handleGeocoderViewportChangeI = useCallback(
        (newViewport) => {
          const geocoderDefaultOverrides = { transitionDuration: 1000 };
          setInizio(newViewport);
          return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides
          });
        },
        [handleViewportChange]
    );

    const handleGeocoderViewportChangeF = useCallback(
        (newViewport) => {
          const geocoderDefaultOverrides = { transitionDuration: 1000 };
          setFine(newViewport);
          return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides
          });
        },
        [handleViewportChange]
    );

    function verificaCredenziali() {
        if(partenza!==undefined && fine.longitude!==undefined && fine.latitude!==undefined){
            if(consegna||autista){
                setPosizione(partenza)
            }
            else{
                setPosizione(ritiro)
            }
            setDestinazione(fine)
            nextStep()
        }
    }

    function backStepReset(){
        setPartenza(undefined)
        setDestinazione(undefined)
        setConsegna(false);
        setAutista(false);
        backStep();
    }

    return (
        <div className="selezionaDestinazione table-responsive-sm" id="image">
            <div className="containerMappa">
            <div className="mappa">
                <h3>Seleziona la destinazione</h3>
                <ReactMapGL
                    {...viewport}
                    ref={mapRef}
                    mapboxApiAccessToken={'pk.eyJ1IjoiZGVycmlsOTgiLCJhIjoiY2tzd3lnZmt4MjQ4azJubzNlYWljdjBzYyJ9.gZh2W18FMIvsvKoqx7MbWA'}
                    onViewportChange={handleViewportChange}
                >  
                        <Geocoder
                        mapRef={mapRef}
                        placeholder = "Inizio"
                        position = "top-left"
                        marker={true}
                        bbox={bbox}
                        onViewportChange={handleGeocoderViewportChangeI}
                        mapboxApiAccessToken={'pk.eyJ1IjoiZGVycmlsOTgiLCJhIjoiY2tzd3lnZmt4MjQ4azJubzNlYWljdjBzYyJ9.gZh2W18FMIvsvKoqx7MbWA'}
                    />
                    
                    <Geocoder
                        mapRef={mapRef}
                        placeholder= "Destinazione"
                        marker={true}
                        bbox={bbox}
                        onViewportChange={handleGeocoderViewportChangeF}
                        mapboxApiAccessToken={'pk.eyJ1IjoiZGVycmlsOTgiLCJhIjoiY2tzd3lnZmt4MjQ4azJubzNlYWljdjBzYyJ9.gZh2W18FMIvsvKoqx7MbWA'}
                        />
                    {mezzi.map(mezzo => (
                        <Marker
                            key={mezzo.targa}
                            latitude={parseFloat(mezzo.posizione_attualeY)}
                            longitude={parseFloat(mezzo.posizione_attualeX)}  
                        >
                            <button className="buttonMap" onClick={() =>{
                                setPartenza(inizio);
                                setTarga(mezzo.targa)
                                setRitiro([parseFloat(mezzo.posizione_attualeX),parseFloat(mezzo.posizione_attualeY)])
                                
                            }}>
                                <img src='/MarkerAuto.png' alt={"..."}></img>
                            </button>
                        </Marker>
                    ))} 
                    
                    
                    </ReactMapGL>
                    </div>
                    
                    <div className="mappa-bottoni">                
                        <button className="btn btn-primary mb-3" onClick={backStepReset}>Indietro</button>
                        <button className="btn btn-primary mb-3" onClick={verificaCredenziali}>Next</button>
                        
                    </div>
            
            </div>
    </div>
    );
}

export default SelezionareLaDestinazione;
