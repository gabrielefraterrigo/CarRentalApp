import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function SelezionareVeicolo({ nextStep, backStep, setVeicolo, setAutista, setConsegna, autista, calcoloCosto, categoriaPatente }) {

    const [listAuto, setListAuto] = useState([]);
    const [listMoto, setListMoto] = useState([]);
    const [listBici, setListBici] = useState([]);
    const [listMonopattino, setListMonopattino] = useState([]);

    useEffect(() => {
        Axios.post("http://localhost:3001/prenotazioneMezzo/richiestaVeicoli",
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

    function handleAutista() {
        setAutista(true);
        setConsegna(false);
    }

    function handleConsegna() {
        setConsegna(true);
        setAutista(false);
    }

    function controlloPatente(categoria) {
        ////Cliente Patente A+B
        if (categoriaPatente === 'AB' || autista) {
            return true
        }
        ////Cliente Patente B
        if (categoriaPatente === 'B') {
            if (categoria === 'A') {
                return false;
            } else {
                return true;
            }
        }
        ////Cliente Patente B1
        if (categoriaPatente === 'B1') {
            if (categoria === 'B' || categoria === 'A') {
                return false;
            } else {
                return true;
            }
        }
        ////Cliente Patente A
        if (categoriaPatente === 'A') {
            if (categoria === 'B' || categoria === 'B1') {
                return false;
            } else {
                return true;
            }
        }
        ////Cliente Patente A1
        if (categoriaPatente === 'A1') {
            if (categoria === 'B' || categoria === 'B1' || categoria === 'A') {
                return false;
            } else {
                return true;
            }
        }
        ////Cliente Patente AM
        if (categoriaPatente === 'A1') {
            if (categoria === 'AM' || categoria === null) {
                return true;
            } else {
                return false;
            }
        }
        /////Cliente senza Patente
        if (categoriaPatente === null) {
            if (categoria === null) {
                return true;
            } else {
                return false;
            }
        }
    }

    function selezionaVeicolo(valore) {
        if (controlloPatente(valore.categoria)) {
            setVeicolo(valore.idveicolo);
            calcoloCosto(valore.tariffa);
            nextStep();
        } else {
            alert("Spiacente, non disponi dei requisiti richiesti per questo veicolo")
        }
    };

    function selezionaAuto(valore) {
        if (controlloPatente(valore.categoria)) {
            setVeicolo(valore.idveicolo);
            calcoloCosto(valore.tariffa);
            nextStep();
        } else {
            alert("Spiacente, non disponi dei requisiti richiesti per questo veicolo")
        }
    };

    function backStepReset() {
        setConsegna(false);
        setAutista(false);
        backStep();
    }

    return (
        <div className="row g-3 needs-validation" id="image">

            <div className="containerSelezMezzo">
                <h3>Veicoli</h3>
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
                    </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="auto" role="tabpanel" aria-labelledby="home-tab">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="check" value="" onClick={handleAutista}></input>
                            <label className="form-check-label">
                                Servizio Autista
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="check" onClick={handleConsegna}></input>
                            <label className="form-check-label">
                                Consegna sul luogo di partenza
                            </label>
                        </div>

                        {listAuto.map((valore) =>
                            <div key={valore.idveicolo}>
                                <div className="containerSelezVeicolo">
                                    <div className="card mb-3" >
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={valore.fotoVeicolo} className="img-fluid rounded-start" alt="..."></img>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{valore.modello}</h5>
                                                    <p className="card-text">Tariffa oraria: {valore.tariffa}euro/ora</p>
                                                    <p className="card-text">Categoria patente richiesta: {valore.categoria}</p>
                                                    <button className="btn btn-primary mb-3" onClick={() => selezionaAuto(valore)}>Seleziona</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="tab-pane fade show" id="moto" role="tabpanel" aria-labelledby="profile-tab">
                        {listMoto.map((valore) =>
                            <div className="tab-pane fade show" id="moto" role="tabpanel" aria-labelledby="profile-tab" key={valore.idveicolo}>
                                <div className="containerSelezVeicolo">
                                    <div className="card mb-3" >
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={valore.fotoVeicolo} className="img-fluid rounded-start" alt="..."></img>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{valore.modello}</h5>
                                                    <p className="card-text">Tariffa oraria: {valore.tariffa}euro/ora</p>
                                                    <p className="card-text">Categoria patente richiesta: {valore.categoria}</p>
                                                    <button className="btn btn-primary mb-3" onClick={() => selezionaVeicolo(valore)}>Seleziona</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}</div>

                    <div className="tab-pane fade show" id="bici" role="tabpanel" aria-labelledby="contact-tab">
                        {listBici.map((valore) =>
                            <div className="tab-pane fade show" id="bici" role="tabpanel" aria-labelledby="contact-tab" key={valore.idveicolo}>
                                <div className="containerSelezVeicolo">
                                    <div className="card mb-3" >
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={valore.fotoVeicolo} className="img-fluid rounded-start" alt="..."></img>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{valore.modello}</h5>
                                                    <p className="card-text">Tariffa oraria: {valore.tariffa}euro/ora</p>
                                                    <p className="card-text"></p>
                                                    <button className="btn btn-primary mb-3" onClick={() => selezionaVeicolo(valore)}>Seleziona</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}</div>
                    <div className="tab-pane fade show" id="monopattini" role="tabpanel" aria-labelledby="profile-tab" >
                        {listMonopattino.map((valore) =>
                            <div className="tab-pane fade show" id="monopattini" role="tabpanel" aria-labelledby="profile-tab" key={valore.idveicolo}>
                                <div className="containerSelezVeicolo">
                                    <div className="card mb-3" >
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={valore.fotoVeicolo} className="img-fluid rounded-start" alt="..."></img>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{valore.modello}</h5>
                                                    <p className="card-text">Tariffa oraria: {valore.tariffa}euro/ora</p>
                                                    <p className="card-text"></p>
                                                    <button className="btn btn-primary mb-3" onClick={() => selezionaVeicolo(valore)}>Seleziona</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}</div>
                </div>


                <div className="form">
                    <button className="btn btn-primary mb-3" onClick={backStepReset}>Indietro</button>
                </div>
            </div>
        </div>
    )
}

export default SelezionareVeicolo;