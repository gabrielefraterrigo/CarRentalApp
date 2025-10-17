import React, { useState  } from 'react';

function SelezionareDateEOrario({nextStep,backStep,setDataInizio,setDataFine,ruolo}) {
    const [dataInizio, setDataIni] = useState();
    const [dataFine, setDataFin] = useState();

    const handleDataIni = () => {
        setDataIni(new Date(document.getElementById("data_inizio").value+"T"+document.getElementById("orario_inizio").value+":00+02:00"))
    }
    const handleDataFin = () => {
        setDataFin(new Date(document.getElementById("data_fine").value+"T"+document.getElementById("orario_fine").value+":00+02:00"))
    }

    function setDate(){
        setDataInizio(dataInizio);
        setDataFine(dataFine);
        nextStep();
    }

    function verificaCredenziali(event) {
        event.preventDefault()
        var form = document.getElementById('form')
        form.classList.add('was-validated')
        if (form.checkValidity()) {
            if(dataInizio>dataFine){
                alert("Range inserito non valido")
            } else if((new Date())>dataInizio){
                alert("Inserire una data di prenotazione maggiore di quella odierna")
            }
            else if((dataInizio-(new Date()))>604800000){
                alert("Spiacente, non puoi prenotare oltre 7 giorni da oggi")
            }
            else {
                setDate();
            }
        }
    }

    return (
        <div className="selezionaDataOra" id="image">
            <form className="modificaPrenotazione row g-3 needs-validation" id={"form"} noValidate>
                <div className="containerDataOra">
                    <h3>Date e Orari</h3>
                    <div className="modificaCampo">
                        <div className="form">
                            <div className="input-group mb-3" >
                                <span className="input-group-text" id="inputGroup-sizing-default" >Data Prenotazione</span>
                                <input type="date"  className="form-control" id="data_inizio" onChange={handleDataIni} required
                                    ></input>
                            </div>
                        </div>
                    </div>

                    <div className="modificaCampo">
                        <div className="form">
                            <div className="input-group mb-3" >
                                <span className="input-group-text" id="inputGroup-sizing-default" >Orario Prenotazione</span>
                                <input type="time"  className="form-control" id="orario_inizio" onChange={handleDataIni}required
                                    ></input>
                            </div>
                        </div>
                    </div>

                    <div className="modificaCampo">
                        <div className="form">
                            <div className="input-group mb-3" >
                                <span className="input-group-text" id="inputGroup-sizing-default" >Data Fine Servizio</span>
                                <input type="date"  className="form-control" id="data_fine" onChange={handleDataFin} required
                                    ></input>
                            </div>
                        </div>
                    </div>

                    <div className="modificaCampo">
                        <div className="form">
                            <div className="input-group mb-3" >
                                <span className="input-group-text" id="inputGroup-sizing-default" >Orario Fine Servizio</span>
                                <input type="time"  className="form-control" id="orario_fine" onChange={handleDataFin} required
                                    ></input>
                            </div>
                        </div>
                    </div>

                    <div className="form">
                        
                        {ruolo === "amministratore" &&
                            <button className="btn btn-primary mb-3" onClick={backStep} id="back">Indietro</button>
                        }
                        <button className="btn btn-primary mb-3" onClick={verificaCredenziali} id="next">Next</button>
                        
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SelezionareDateEOrario;