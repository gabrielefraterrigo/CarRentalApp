import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Axios from 'axios';


function PrenotazioneMezzo() {
    const [listAuto, setListAuto] = useState([]);
    const [listMoto, setListMoto] = useState([]);
    const [listBici, setListBici] = useState([]);
    const [listMonopattino, setListMonopattino] = useState([]);
    const [ps, setPS] = useState([])
    const mapRef = useRef()

    useEffect(() => {
        Axios.post("http://localhost:3001/visioneServizi/richiestaFotoVeicoli",
        ).then((risposta) => {
            if (risposta.data.error) {
                alert(risposta.data.error);
            } else {
                setListAuto(risposta.data.listAuto[0]);
                setListMoto(risposta.data.listMoto[0]);
                setListBici(risposta.data.listBici[0]);
                setListMonopattino(risposta.data.listMonopattino[0]);
            }
        }).catch((error) => { window.location.href = "./ERROR" });
    }, []);

    useEffect(() => {
        Axios.post("http://localhost:3001/visioneServizi/parcheggiEstalli", {

        }).then((risposta) => {
            if (risposta.data.error) {
                alert(risposta.data.error);
            } else {
                setPS(risposta.data.list[0])
            }
        }).catch((error) => { window.location.herf = './ERROR' });
    }, [])

    const [viewport, setViewport] = useState({
        width: 700,
        height: 700,
        latitude: 38.0000,
        longitude: 13.4376,
        zoom: 8,
    });

    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    return (
        <div className="visioneServizi" id="image">
            <div className="containerVS">
                <div className="row g-3 needs-validation">
                    <div className="veicoli">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#auto" type="button" role="tab" aria-controls="auto" aria-selected="true">Automobili</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#moto" type="button" role="tab" aria-controls="moto" aria-selected="false">Moto</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#bici" type="button" role="tab" aria-controls="bici" aria-selected="false">Biciclette</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#monopattini" type="button" role="tab" aria-controls="monopattini" aria-selected="false">Monopattini</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#parcheggi" type="button" role="tab" aria-controls="parcheggi" aria-selected="false">Parcheggi e stalli</button>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="auto" role="tabpanel" aria-labelledby="home-tab">


                            {listAuto.map((auto) =>
                                <div className="tab-pane fade show" id="auto" role="tabpanel" aria-labelledby="home-tab" key={auto.idveicolo}>
                                    <div className='row'>
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <div className="card" styles={{ width: '18rem', textAlign: 'center' }}>
                                                <img src={auto.fotoVeicolo} className="card-img-top" alt="..." />
                                                <div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{auto.modello}</h5>
                                                        <p className="card-text">Tariffa oraria: {auto.tariffa}euro/ora</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )}
                        </div>

                        <div className="tab-pane fade show" id="moto" role="tabpanel" aria-labelledby="profile-tab">
                            {listMoto.map((moto) =>
                                <div className="tab-pane fade show" id="moto" role="tabpanel" aria-labelledby="profile-tab" key={moto.idveicolo}>
                                    <div className='row'>
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <div className="card" styles={{ width: '18rem', textAlign: 'center' }}>
                                                <img src={moto.fotoVeicolo} className="card-img-top" alt="..." />
                                                <div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{moto.modello}</h5>
                                                        <p className="card-text">Tariffa oraria: {moto.tariffa}euro/ora</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}</div>

                        <div className="tab-pane fade show" id="bici" role="tabpanel" aria-labelledby="profile-tab">
                            {listBici.map((bici) =>
                                <div className="tab-pane fade show" id="bici" role="tabpanel" aria-labelledby="profile-tab" key={bici.idveicolo}>
                                    <div className='row'>
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <div className="card" styles={{ width: '18rem', textAlign: 'center' }}>
                                                <img src={bici.fotoVeicolo} className="card-img-top" alt="..." />
                                                <div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{bici.modello}</h5>
                                                        <p className="card-text">Tariffa oraria: {bici.tariffa}euro/ora</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}</div>

                        <div className="tab-pane fade show" id="monopattini" role="tabpanel" aria-labelledby="profile-tab">
                            {listMonopattino.map((monopattini) =>
                                <div className="tab-pane fade show" id="monopattini" role="tabpanel" aria-labelledby="profile-tab" key={monopattini.idveicolo}>
                                    <div className='row'>
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <div className="card" styles={{ width: '18rem', textAlign: 'center' }}>
                                                <img src={monopattini.fotoVeicolo} className="card-img-top" alt="..." />
                                                <div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{monopattini.modello}</h5>
                                                        <p className="card-text">Tariffa oraria: {monopattini.tariffa}euro/ora</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}</div>


                        <div className="tab-pane fade show" id="parcheggi" role="tabpanel" aria-labelledby="profile-tab">
                            <h3 className="">Mappa dei nostri parcheggi e stalli</h3>
                            <div className="mappaVS">
                                <ReactMapGL
                                    {...viewport}
                                    ref={mapRef}
                                    mapboxApiAccessToken={'pk.eyJ1IjoiZGVycmlsOTgiLCJhIjoiY2tzd3lnZmt4MjQ4azJubzNlYWljdjBzYyJ9.gZh2W18FMIvsvKoqx7MbWA'}
                                    onViewportChange={handleViewportChange}
                                >
                                    {ps.map(parcstal => (
                                        <Marker
                                            key={parcstal.idparc_stal}
                                            latitude={parseFloat(parcstal.posizioneY)}
                                            longitude={parseFloat(parcstal.posizioneX)}
                                        >
                                            <img src="MarkerParcheggio.png" width="20px" alt={"..."}></img>
                                        </Marker>
                                    ))}
                                </ReactMapGL>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrenotazioneMezzo;
