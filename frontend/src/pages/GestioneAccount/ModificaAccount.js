import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function ModificaAccount () {
    const [idutente, setIdutente] = useState("");

    useEffect(() =>{
        Axios.post("http://localhost:3001/gestioneAccount/home", {
        },{
        headers: {
        loginToken: localStorage.getItem("loginToken")
        }
        }).then((risultato)=>{
            if(risultato.data.error){
                alert(risultato.data.error);
                setIdutente("")
                window.location.href="/"
            }else {
                setIdutente(risultato.data.idutente)
            }
        }).catch((error)=>{window.location.href="./ERROR"});
    })

    function verificaCredenziali() {
        var forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault()//impedisce l'autosubmit del form
                if (!form.checkValidity()) {
                    event.stopPropagation()
                }
                ////Controllo Data di Nascita
                if(!isNaN(new Date(document.getElementById("data_nascita").value))){
                   if(((new Date())-(new Date(document.getElementById("data_nascita").value)))<441504000000){
                    alert("Impossibile proseguire, bisogna avere almeno 14 anni")
                    event.stopImmediatePropagation()
                    } 
                }
                form.classList.add('was-validated')
            }, false)
        })
    }

    const modificaNome = () => {
            Axios.post("http://localhost:3001/modificaAccount/modificaNome", {
            nome: document.getElementById("nome").value,
            idutente: idutente

            }).then(() => {
                
                window.location.href = "/modificaAccount"
            }).catch((error)=>{window.location.href="./ERROR"});   
    };

    const modificaCognome = () => {
            Axios.post("http://localhost:3001/modificaAccount/modificaCognome", {
            
            cognome: document.getElementById("cognome").value,
            idutente: idutente

            }).then(() => {
                
                window.location.href = "/modificaAccount"
            }).catch((error)=>{window.location.href="./ERROR"});
    };

    const modificaEmail = () => {
            Axios.post("http://localhost:3001/modificaAccount/modificaEmail", {
            
            email: document.getElementById("email").value,
            idutente: idutente

            }).then((risposta) => {
                if(risposta.data.error) {
                    alert(risposta.data.error);
                }else {
                    
                    localStorage.removeItem("loginToken");
                    window.location.href = "/"
                }
            }).catch((error)=>{window.location.href="./ERROR"});
    };

    const modificaPassword = () => {
            Axios.post("http://localhost:3001/modificaAccount/modificaPassword", {
            
            pass: document.getElementById("psw").value,
            idutente: idutente

            }).then(() => {
               
                localStorage.removeItem("loginToken");
                window.location.href = "/"
            }).catch((error)=>{window.location.href="./ERROR"});    
    };

    const modificaPatente = () => {
            Axios.post("http://localhost:3001/modificaAccount/modificaPatente", {
            
            cod_patente: document.getElementById("patente").value,
            idutente: idutente

            }).then(() => {
                
                window.location.href = "/modificaAccount"
            }).catch((error)=>{window.location.href="./ERROR"});     
    };

    const modificaCategoriaP = () => {
            Axios.post("http://localhost:3001/modificaAccount/modificaCategoriaP", {
            
            categoria_patente: document.getElementById("categoria_patente").value,
            idutente: idutente

            }).then(() => {
                
                localStorage.removeItem("loginToken");
                window.location.href = "/"
            }).catch((error)=>{window.location.href="./ERROR"});    
};

    const modificaDataNascita = () => {
            Axios.post("http://localhost:3001/modificaAccount/modificaDataNascita", {
            
            data_nascita: document.getElementById("data_nascita").value,
            idutente: idutente

            }).then(() => {
                
                window.location.href = "/modificaAccount"
            }).catch((error)=>{window.location.href="./ERROR"});
    };

    const modificaCarta = () => {
            Axios.post("http://localhost:3001/modificaAccount/modificaCarta", {
            
            cod_carta: document.getElementById("carta").value,
            idutente: idutente

            }).then(() => {
                
                window.location.href = "/modificaAccount"
            }).catch((error)=>{window.location.href="./ERROR"});
    };

    const modificaIndirizzo = () => {
            Axios.post("http://localhost:3001/modificaAccount/modificaIndirizzo", {
            
            indirizzo_fatturazione: document.getElementById("indirizzo").value,
            idutente: idutente

            }).then(() => {
                
                window.location.href = "/modificaAccount"
            }).catch((error)=>{window.location.href="./ERROR"});
    };

    return(
    <div className="modificaAccount" id ="image">
        <div className = "modificaAcc">
            <div className="conteinerModAcc">

            <h3>Modifica Account</h3>

            <form className="row g-3 needs-validation" noValidate onSubmit={modificaNome}>
                        <div className="modificaCampo">
                            <div className="form">
                                <div className="input-group mb-3" >
                                    <span className="input-group-text" id="inputGroup-sizing-default" >Nome</span>
                                    <input type="text"  className="form-control" id="nome" required 
                                        placeholder="Inserisci Nome..." 
                                        ></input>
                                    <button className="btn btn-primary" onClick={verificaCredenziali}>Modifica</button>
                                </div>
                            </div>
                        </div>
            </form>  

            <form className="row g-3 needs-validation" noValidate onSubmit={modificaCognome}>
                        <div className="modificaCampo">
                            <div className="form">
                                <div className="input-group mb-3" >
                                    <span className="input-group-text" id="inputGroup-sizing-default" >Cognome</span>
                                    <input type="text"  className="form-control" id="cognome" required
                                        placeholder="Inserisci Cognome..." 
                                        ></input>
                                    <button className="btn btn-primary" onClick={verificaCredenziali}>Modifica</button>
                                </div>
                            </div>
                        </div>
            </form>  

            <form className="row g-3 needs-validation" noValidate onSubmit={modificaEmail}>
                        <div className="modificaCampo">
                            <div className="form">
                                <div className="input-group mb-3" >
                                    <span className="input-group-text" id="inputGroup-sizing-default" >Email</span>
                                    <input type="email"  className="form-control" id="email" required
                                        placeholder="Inserisci nuova Email..." 
                                        pattern="^[A-z0-9]+@[A-z0-9]+\.[A-z]{2,}$"
                                        ></input>
                                    <button className="btn btn-primary" onClick={verificaCredenziali}>Modifica</button>
                                </div>
                            </div>
                        </div>
            </form>  

            <form className="row g-3 needs-validation" noValidate onSubmit={modificaPassword}>
                        <div className="modificaCampo">
                            <div className="form">
                                <div className="input-group mb-3" >
                                    <span className="input-group-text" id="inputGroup-sizing-default" >Password</span>
                                    <input type="password"  className="form-control" id="psw" required                            
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{8,}$"
                                        placeholder="Inserisci nuova Password..." 
                                        ></input>
                                    <button className="btn btn-primary" onClick={verificaCredenziali}>Modifica</button>
                                </div>
                            </div>
                        </div>
            </form>  

            <form className="row g-3 needs-validation" noValidate onSubmit={modificaPatente}>
                        <div className="modificaCampo">
                            <div className="form">
                                <div className="input-group mb-3" >
                                    <span className="input-group-text" id="inputGroup-sizing-default" >N°Patente</span>
                                    <input type="text"  className="form-control" id="patente" required 
                                        placeholder="Inserisci N°Patente..." 
                                    ></input>
                                    <button className="btn btn-primary" onClick={verificaCredenziali}>Modifica</button>
                                </div>
                            </div>
                        </div>
            </form>  

            <form className="row g-3 needs-validation" noValidate onSubmit={modificaCategoriaP}>
            <div className="modificaCampo">
                <div className="form">
                    <div className="input-group mb-3" >
                        <span className="input-group-text" id="basic-addon1-modifica">Categoria</span>

                        <select className="form-select" id="categoria_patente" required>
                            <option value= "">Scegli la categoria della patente</option>
                            <option value="AM">AM</option>
                            <option value="A1">A1</option>
                            <option value="A">A</option>
                            <option value="B1">B1</option>
                            <option value="B">B</option>
                            <option value="AB">A+B</option>
                        </select>
                        <button className="btn btn-primary" onClick={verificaCredenziali}>Modifica</button>
                    </div>
                </div>
            </div>
            </form> 

            <form className="row g-3 needs-validation" noValidate onSubmit={modificaDataNascita}>
                        <div className="modificaCampo">
                            <div className="form">
                                <div className="input-group mb-3" >
                                    <span className="input-group-text" id="inputGroup-sizing-default" >Data di nascita</span>
                                    <input type="date"  className="form-control" id="data_nascita" required
                                        ></input>
                                    <button className="btn btn-primary" onClick={verificaCredenziali}>Modifica</button>
                                </div>
                            </div>
                        </div>
            </form>  

            <form className="row g-3 needs-validation" noValidate onSubmit={modificaCarta}>
                        <div className="modificaCampo">
                            <div className="form">
                                <div className="input-group mb-3" >
                                    <span className="input-group-text" id="inputGroup-sizing-default" >N°Carta</span>
                                    <input type="text"  className="form-control" id="carta" required
                                        placeholder="Inserisci N°Carta di credito..." 
                                        ></input>
                                    <button className="btn btn-primary" onClick={verificaCredenziali}>Modifica</button>
                                </div>
                            </div>
                        </div>
            </form>  

            <form className="row g-3 needs-validation" noValidate onSubmit={modificaIndirizzo}>
                        <div className="modificaCampo">
                            <div className="form">
                                <div className="input-group mb-3" >
                                    <span className="input-group-text" id="inputGroup-sizing-default" >Indirizzo</span>
                                    <input type="text"  className="form-control" id="indirizzo"
                                        placeholder="Inserisci indirizzo di fatturazione..." required
                                    ></input>
                                    <button className="btn btn-primary" onClick={verificaCredenziali}>Modifica</button>
                                </div>
                            </div>
                        </div>
            </form>  

                <a href="/home" className="btn btn-primary mb-3" id="indietro" role="button" aria-disabled="true">Indietro</a>
            </div>
            </div>
        </div>    
)};

export default ModificaAccount;
