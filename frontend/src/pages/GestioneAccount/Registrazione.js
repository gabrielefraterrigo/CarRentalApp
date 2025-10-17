import React from 'react';
import Axios from 'axios'

function Registrazione() {
    const creaAccount = () => {

        Axios.post("http://localhost:3001/gestioneAccount/registrazione", {
            nome: document.getElementById("nome").value,
            cognome: document.getElementById("cognome").value,
            email: document.getElementById("email").value,
            pass: document.getElementById("psw").value,
            cod_patente: document.getElementById("patente").value,
            data_nascita: document.getElementById("data_nascita").value,
            cod_carta: document.getElementById("carta").value,
            indirizzo_fatturazione: document.getElementById("indirizzo").value,
            categoria_patente: document.getElementById("categoria_patente").value
        }).then((risposta) => {
            if (risposta.data.error) {
                alert(risposta.data.error);
            } else {

                window.location.href = "/"
            }
        }).catch((error) => { window.location.href = "./ERROR" });
    };

    function verificaCredenziali() {
        var forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    event.preventDefault()//impedisce l'autosubmit del form
                    if (!form.checkValidity()) {
                        event.stopImmediatePropagation()
                    }
                    if (((new Date()) - (new Date(document.getElementById("data_nascita").value))) < 441504000000) {
                        alert("Impossibile proseguire, bisogna avere almeno 14 anni per registrarsi")
                        event.stopImmediatePropagation()
                    }
                    form.classList.add('was-validated')
                }, false)
            })
    }

    return (
        <form className="row g-3 needs-validation" id="image" noValidate onSubmit={creaAccount}>
            <div className="container">

                <div className="registrazione">
                    <h3>Registrazione</h3>

                    <div className="modificaCampo">
                        <div className="form">
                            <div className="containerReg">
                                <div className="input-group mb-3" >
                                    <span className="input-group-text" id="inputGroup-sizing-default" >Nome</span>
                                    <input type="text" className="form-control" id="nome" required
                                        placeholder="Inserisci Nome..."
                                    ></input>
                                </div>
                            </div>
                        </div>
                    </div>


                

                <div className="modificaCampo">
                    <div className="form">
                        <div className="containerReg">
                            <div className="input-group mb-3" >
                                <span className="input-group-text" id="inputGroup-sizing-default" >Cognome</span>
                                <input type="text" className="form-control" id="cognome" required
                                    placeholder="Inserisci Cognome..."
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modificaCampo">
                    <div className="form">
                        <div className="containerReg">
                            <div className="input-group mb-3" >
                                <span className="input-group-text" id="inputGroup-sizing-default" >Email</span>
                                <input type="email" className="form-control" id="email" required
                                    placeholder="Inserisci nuova Email..."
                                    pattern="^[A-z0-9]+@[A-z0-9]+\.[A-z]{2,}$"
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modificaCampo">
                    <div className="form">
                        <div className="containerReg">
                            <div className="input-group mb-3" >
                                <span className="input-group-text" id="inputGroup-sizing-default" >Password</span>
                                <input type="password" className="form-control" id="psw" required
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{8,}$"
                                    placeholder="Inserisci nuova Password..."
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modificaCampo">
                    <div className="form">
                        <div className="containerReg">
                            <div className="input-group mb-3" >
                                <span className="input-group-text" id="inputGroup-sizing-default" >N°Patente</span>
                                <input type="text" className="form-control" id="patente"
                                    placeholder="Inserisci N°Patente..."
                                ></input>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="modificaCampo">
                    <div className="form">
                        <div className="containerReg">
                            <div className="input-group mb-3" >
                                <span className="input-group-text" id="inputGroup-sizing-default">Categoria</span>

                                <select className="form-select" id="categoria_patente">
                                    <option value="">Scegli la categoria della patente</option>
                                    <option value="AM">AM</option>
                                    <option value="A1">A1</option>
                                    <option value="A">A</option>
                                    <option value="B1">B1</option>
                                    <option value="B">B</option>
                                    <option value="AB">A+B</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modificaCampo">
                    <div className="form">
                        <div className="containerReg">
                            <div className="input-group mb-3" >
                                <span className="input-group-text" id="inputGroup-sizing-default" >Data di nascita</span>
                                <input type="date" className="form-control" id="data_nascita" required
                                ></input>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="modificaCampo">
                    <div className="form">
                        <div className="containerReg">
                            <div className="input-group mb-3" >
                                <span className="input-group-text" id="inputGroup-sizing-default" >N°Carta</span>
                                <input type="text" className="form-control" id="carta" required
                                    placeholder="Inserisci N°Carta di credito..."
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modificaCampo">
                    <div className="form">
                        <div className="containerReg">
                            <div className="input-group mb-3" >
                                <span className="input-group-text" id="inputGroup-sizing-default" >Indirizzo</span>
                                <input type="text" className="form-control" id="indirizzo"
                                    placeholder="Inserisci indirizzo di fatturazione..." required
                                ></input>

                            </div>
                        </div>
                    </div>

                    </div>
                    <div className="modificaCampo">
                        <div className="form">
                            <div className="containerReg">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" required></input>
                                    <label className="form-check-label" >Possiedi un dispositivo portatile?</label>
                                </div>
                                <div>
                                    <button className="btn btn-primary mb-3" onClick={verificaCredenziali} id="registrati">Registrati</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </form>

    )
}

export default Registrazione;

