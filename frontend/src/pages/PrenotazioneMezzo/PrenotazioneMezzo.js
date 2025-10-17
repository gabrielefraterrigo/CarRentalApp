import React, { useState, useEffect}from 'react';
import Axios from 'axios';
import SelezionareLaDestinazione from './SelezionareLaDestinazione';
import SelezionareVeicolo from './SelezionareVeicolo';
import SelezionareDateEOrario from './SelezionareDateEOrario';
import PrenotazioneAlCliente from './PrenotazioneAlCliente';

function PrenotazioneMezzo() {
    const [ruolo, setRuolo] = useState("");
    const [step, setStep] = useState(1);
    const [flag, setFlag] = useState(true);
    const [idUtente, setIdUtente] = useState("");
    const [categoriaPatente, setCategoriaPatente] = useState("");
    const [destinazione, setDestinazione] = useState(undefined);
    const [posizione, setPosizione] = useState(undefined)
    const [partenza, setPartenza] = useState(undefined);
    const [ritiro, setRitiro] = useState(undefined);  
    const [dataInizio, setDataInizio] = useState(new Date());
    const [dataFine, setDataFine] = useState(new Date());
    const [veicolo, setVeicolo] = useState("");
    const [targa, setTarga] = useState("");
    const [autista, setAutista] = useState(false)
    const [consegna, setConsegna] = useState(false)
    const [mancia, setMancia] = useState(false)
    const [costo, setCosto] = useState()
    

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
                if(ruolo==="amministratore" && flag){
                    setStep(0)
                    setFlag(false)
                }
                if(ruolo==="cliente"){
                    setIdUtente(risultato.data.idutente)
                    setCategoriaPatente(risultato.data.categoria_patente)
                }
            }
        }).catch((error)=>{window.location.href="./ERROR"}); 
    })

    const prenota = () => {
       Axios.post("http://localhost:3001/prenotazioneMezzo/prenotazione", {
        idUtente: idUtente,
        destinazioneX: destinazione.longitude,
        destinazioneY: destinazione.latitude,
        posizioneX: x(),
        posizioneY: y(),
        dataInizio: dataInizio.getFullYear()+"-"+addZero(dataInizio.getMonth()+1)+"-"+addZero(dataInizio.getDate())+"T"+addZero(dataInizio.getHours())+":"+addZero(dataInizio.getMinutes()),
        dataFine: dataFine.getFullYear()+"-"+addZero(dataFine.getMonth()+1)+"-"+addZero(dataFine.getDate())+"T"+addZero(dataFine.getHours())+":"+addZero(dataFine.getMinutes()),
        targa: targa,
        autista: autista,
        consegna: consegna,
        costo: consideraMancia()
        }).then(() => {
            console.log("fatto!")
            window.location.href = "/home"
        }).catch((error)=>{window.location.href="./ERROR"});      
    };

    const nextStep = () => {
        setStep(step+1)
    }

    function x(){
        if(consegna || autista){
            return posizione.longitude
        }
        else return posizione[0]
    }

    function y(){
        if(consegna || autista){
            return posizione.latitude
        }
        else return posizione[1]
    }


    const backStep = () => {
        setStep(step-1)
    }

    const backStepReset = () => {
        setMancia(false)
        backStep()
    }

    function calcoloCosto(tariffa){
        setCosto(tariffa*((dataFine-dataInizio)/3600000));
       
    }

    function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
    }

    function consideraMancia(){
        if(mancia){
            console.log(costo)
            return (parseFloat(costo)+5).toFixed(2)
        }
        else  {            console.log(costo)
            return costo.toFixed(2)}
    }
    
    const props1 = {nextStep,setIdUtente,setCategoriaPatente}
    const props2 = {nextStep,backStep,setDataInizio,setDataFine,ruolo}
    const props3 = {nextStep,backStep,setVeicolo,setAutista,setConsegna,calcoloCosto,autista,categoriaPatente}
    const props4 = {nextStep,backStep,setTarga,setPartenza,setDestinazione,setAutista,setConsegna,setRitiro,setPosizione,consegna,autista,partenza,ritiro,veicolo}

    switch (step){
        case 0:
            return (
                <PrenotazioneAlCliente {...props1}/>
            )
        case 1:
            return (
                 <SelezionareDateEOrario {...props2}/>
            )
        case 2: 
            return (
               <SelezionareVeicolo {...props3}/>
            )
        case 3: 
            return (
                <SelezionareLaDestinazione {...props4}/>
            )
        case 4:
            return (
                <div className="prenotazioneMezzo" id="image">
                    <div className="containerTabella">
                        <h3>Riepilogo</h3>
                        <table className="table table-striped table-bordered table-hover" id="listaPrenotazioni">
                            <thead>
                                <tr>
                                    <th>Targa</th>
                                    <th>Destinazione</th>
                                    {(consegna || autista) ? (
                                        <th>Consegna</th>
                                        ) : (
                                        <th>Ritiro</th>
                                        )
                                    }
                                    <th>Data inizio</th>
                                    <th>Data fine</th>
                                    <th>Costo</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>{targa}</td>
                                    <td>{destinazione.longitude}, {destinazione.latitude}</td>
                                    {(consegna || autista) ? (
                                        <td>{posizione.longitude}, {posizione.latitude}</td>
                                        ) : (
                                        <td>{posizione[0]}, {posizione[1]}</td>
                                        )
                                    }
                                    <td>{addZero(dataInizio.getDate())+"/"+addZero(dataInizio.getMonth()+1)+"/"+dataInizio.getFullYear()+" "+addZero(dataInizio.getHours())+":"+addZero(dataInizio.getMinutes())}</td>
                                    <td>{addZero(dataFine.getDate())+"/"+addZero(dataFine.getMonth()+1)+"/"+dataFine.getFullYear()+" "+addZero(dataFine.getHours())+":"+addZero(dataFine.getMinutes())}</td>
                                    <td>{consideraMancia()}</td>
                                    {autista && (
                                        <td>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" onClick={()=>{
                                                    if(!mancia)
                                                    setMancia(true)
                                                    else
                                                    setMancia(false)
                                                }}></input>
                                                <label className="form-check-label">
                                                    Mancia Autista (+5€)
                                                </label>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            </tbody>

                        </table>

                        <div className="mappa-bottoni">
                            <button className="btn btn-primary mb-3" onClick={backStepReset} id="back">Indietro</button>
                            <button className="btn btn-primary mb-3" onClick={prenota} id="back">Conferma</button>
                        </div>
                    </div>
                </div>
                
            )
        default :
            return (
                null
            )
    }
}

export default PrenotazioneMezzo;
