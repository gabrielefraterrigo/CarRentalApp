import React, { useState } from "react";
import Axios from "axios";
import TabellaPrenotazione from "./TabellaPrenotazione";

function ListaPrenotazioneCliente() {

    const [idutente, setIdUtente] = useState("");
    const [step, setStep] = useState(0)
    
    const verificaEmail = () => {
        Axios.post("http://localhost:3001/GestionePrenotazione/verificaEmail", {
            email: document.getElementById("email").value,
         }).then((risposta) => {
            if(risposta.data.error) {
                alert(risposta.data.error);
            }else {
                setIdUtente(risposta.data.idutente);
                setStep(1);
            }
         }).catch((error)=>{window.location.href="./ERROR"});     
    };


    function verificaCredenziali() {
        var forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault()//impedisce l'autosubmit del form
              if (!form.checkValidity()) {
                event.stopPropagation()
              }
              form.classList.add('was-validated')
            }, false)
        })
    }

    const props = {idutente}
    
    switch (step) {
        case 0:
            return (
                <form className=" row g-3 needs-validation" id="image" noValidate onSubmit={verificaEmail}>
                    <div className="containerList">
                        <h3>Email Cliente</h3>
                        <div className="modificaCampo">
                            <div className="form">
                                <div className="input-group mb-3" >
                                    <span className="input-group-text" id="inputGroup-sizing-default" >Email</span>
                                    <input type="text"  className="form-control" id="email" required 
                                        pattern="^[A-z0-9]+@[A-z0-9]+\.[A-z]{2,}$"
                                        placeholder="Inserisci l'email dell'utente..." 
                                        ></input>
                                </div>
                            </div>
                        </div>
            
                        <div className="form">
                            <button className="btn btn-primary mb-3" onClick={verificaCredenziali} id="avanti">Next</button>
                        </div>
                    </div>
                </form>
            );
        
        case 1:
            return (<TabellaPrenotazione {...props}/>);

        default:
            return(null);
            
    }
}

export default ListaPrenotazioneCliente;