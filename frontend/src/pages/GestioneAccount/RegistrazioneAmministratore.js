import React, {useEffect, useState} from 'react';
import Axios from 'axios'

function RegistrazioneAmministratore() {


    useEffect( () =>{
        Axios.post("http://localhost:3001/gestioneAccount/verificaAdmin", {
        },{
        headers: {
        loginToken: localStorage.getItem("loginToken")
        }
        }).then((risultato)=>{
            if(risultato.data.error){
                alert(risultato.data.error);
                window.location.href="/"
            }
        }).catch((error)=>{window.location.href="./ERROR"});
    }, [])

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


    const creaDipendente = () => {
       Axios.post("http://localhost:3001/gestioneAccount/registrazioneadmin", {
        nome: document.getElementById("nome").value,
        cognome: document.getElementById("cognome").value,
        email: document.getElementById("email").value,
        pass: document.getElementById("psw").value,
        cod_patente: document.getElementById("patente").value,
        data_nascita: document.getElementById("data_nascita").value,
        cod_carta: document.getElementById("carta").value,
        indirizzo_fatturazione: document.getElementById("indirizzo").value,
        ruolo: document.getElementById("ruolo").value,
        parcheggio: parcheggio
        }).then(() => {
            
        window.location.href = "/home"
        }).catch((error)=>{window.location.href="./ERROR"});    
    };

    const [flag,setFlag] = useState(false)
    const [parcheggio, setParcheggio] = useState(null)

    function controlloRuolo(){
        if(document.getElementById("ruolo").value === "operatore"){
            setFlag(true)
        }
        else setFlag(false)
    }

    return (
     <form className="row g-3 needs-validation" id="image" noValidate onSubmit={creaDipendente}>
      <div className="registrazioneadmin">  
        <h3>Registrazione Dipendente</h3>

        <div className="modificaCampo">
          <div className="form">
            <div className="input-group mb-3" >
                    <span className="input-group-text" id="inputGroup-sizing-default">Ruolo</span>

                    <select className="form-select" id="ruolo" onChange={controlloRuolo} required>
                        <option value= "">Scegli il tipo di dipendente</option>
                        <option value="autista">Autista</option>
                        <option value="operatore">Operatore</option>
                    </select>
                </div>
            </div>
        </div>

        {flag &&
        
        (<div className="modificaCampo">
                <div className="form">
                    <div className="input-group mb-3" >
                        <span className="input-group-text" id="inputGroup-sizing-default" >Codice del parcheggio</span>
                        <input onChange={setParcheggio} type="text"  className="form-control" id="parcheggio"
                            placeholder="Inserisci il codice del parcheggio..." required
                           ></input>
                    </div>
                </div>
            </div>)
        }

        <div className="modificaCampo">
                <div className="form">
                    <div className="input-group mb-3" >
                        <span className="input-group-text" id="inputGroup-sizing-default" >Nome</span>
                        <input type="text"  className="form-control" id="nome" required 
                            placeholder="Inserisci Nome..." 
                            ></input>
                    </div>
                </div>

            </div>

            <div className="modificaCampo">
                <div className="form">
                    <div className="input-group mb-3" >
                        <span className="input-group-text" id="inputGroup-sizing-default" >Cognome</span>
                        <input type="text"  className="form-control" id="cognome" required
                            placeholder="Inserisci Cognome..." 
                            ></input>
                    </div>
                </div>
            </div>

            <div className="modificaCampo">
                <div className="form">
                    <div className="input-group mb-3" >
                        <span className="input-group-text" id="inputGroup-sizing-default" >Email</span>
                        <input type="email"  className="form-control" id="email" required
                            placeholder="Inserisci nuova Email..." 
                            pattern="^[A-z0-9]+@[A-z0-9]+\.[A-z]{2,}$"
                            ></input>
                     </div>
                </div>
            </div>

            <div className="modificaCampo">
                <div className="form">
                    <div className="input-group mb-3" >
                        <span className="input-group-text" id="inputGroup-sizing-default" >Password</span>
                        <input type="password"  className="form-control" id="psw" required                            
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{8,}$"
                            placeholder="Inserisci nuova Password..." 
                            ></input>
                    </div>
                </div>
            </div>

            <div className="modificaCampo">
                <div className="form">
                    <div className="input-group mb-3" >
                        <span className="input-group-text" id="inputGroup-sizing-default" >N°Patente</span>
                        <input type="text"  className="form-control" id="patente" required 
                            placeholder="Inserisci N°Patente..." 
                           ></input>
                    </div>
                </div>
            </div>

            <div className="modificaCampo">
                <div className="form">
                    <div className="input-group mb-3" >
                        <span className="input-group-text" id="inputGroup-sizing-default" >Data di nascita</span>
                        <input type="date"  className="form-control" id="data_nascita" required
                            ></input>
                    </div>
                </div>
            </div>

            <div className="modificaCampo">
                <div className="form">
                    <div className="input-group mb-3" >
                        <span className="input-group-text" id="inputGroup-sizing-default" >N°Carta di credito</span>
                        <input type="text"  className="form-control" id="carta" required
                            placeholder="Inserisci N°Carta di credito..." 
                            ></input>
                    </div>
                </div>
            </div>

            <div className="modificaCampo">
                <div className="form">
                    <div className="input-group mb-3" >
                        <span className="input-group-text" id="inputGroup-sizing-default" >Indirizzo di fatturazione</span>
                        <input type="text"  className="form-control" id="indirizzo"
                            placeholder="Inserisci indirizzo di fatturazione..." required
                           ></input>
                    </div>
                </div>
            </div>

        

            <div className="form">
              <button className="btn btn-primary mb-3" onClick={verificaCredenziali} id="registrati">Registrati</button>
            </div>
      </div>   
     </form>         
    )
}

export default RegistrazioneAmministratore;

