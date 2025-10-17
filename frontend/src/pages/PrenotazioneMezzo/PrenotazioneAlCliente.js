import React from 'react';
import Axios from 'axios';

function PrenotazioneAlCliente({nextStep, setIdUtente, setCategoriaPatente}) {

    const verificaEmail = () => {
        Axios.post("http://localhost:3001/prenotazioneMezzo/verificaEmail", {
            email: document.getElementById("email").value,
         }).then((risposta) => {
            if(risposta.data.error) {
                alert(risposta.data.error);
            }else {
                setIdUtente(risposta.data.idutente);
                setCategoriaPatente(risposta.data.categoria_patente);
                console.log(risposta.data.idutente);
                console.log(risposta.data.categoria_patente);
                nextStep();
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

    return (
        <div className="prenotazioneMezzoCLi" id="image">
        <form className=" row g-3 needs-validation" noValidate onSubmit={verificaEmail}>
            <div className="containerPrenCli">
            <h3>Email Cliente</h3>
            <div className="modificaCampo">
                 <div className="form">
                    <div className="input-group mb-3" >
                        <span className="input-group-text" id="inputGroup-sizing-default" >Email Cliente</span>
                        <input type="text"  className="form-control" id="email" required 
                            pattern="^[A-z0-9]+@[A-z0-9]+\.[A-z]{2,}$"
                            placeholder="Inserisci l'email dell'utente..." 
                            ></input>
                    </div>
                </div>
            </div>

            <div className="form">
              <button className="btn btn-primary mb-3" onClick={verificaCredenziali} id="registrati">Next</button>
            </div>
            </div>
        </form>
        </div>
    )
}

export default PrenotazioneAlCliente;