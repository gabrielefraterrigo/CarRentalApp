import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Errore from './errore';

function Navbar() {
    const [accesso, setAccesso] = useState({
        status: false,
        ruolo: ""
      });
    
      useEffect(() =>{
          Axios.get("http://localhost:3001/gestioneAccount/accesso", {
            headers: {
              loginToken: localStorage.getItem("loginToken")
          },
          }).then((risultato)=>{
              if(risultato.data.error){
                  setAccesso({
                    status: false,
                    ruolo: ""
                  });
              }else {
                  setAccesso({
                    status: true,
                    ruolo: risultato.data.ruolo
                  });
              }
            }).catch((error)=>{<Errore/>});
     }, [])/// esegue il codice 1 volta sola, senza effettua un while infinito
    
        const logout = async() => {
          await localStorage.removeItem("loginToken");
          await setAccesso({
            status: false,
            ruolo: ""
          });
        }
    return (
      <div className="Navbar">
        <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">CtrlMove</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-text collapse navbar-collapse flex-row-reverse" id="navbarNavDropdown">
              <ul className="navbar2 nav flex-row-reverse"> 
                {!accesso.status && (
                    <>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" href="/registrazione">Registrazione</a>
                    </li>
                    
                    </>
                )}
                {accesso.status && (
                    <>

                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Ciao {accesso.ruolo}
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">

                       <li className="nav-item">
                          <a className="nav-link active" aria-current="page" href="/modificaAccount">Modifica Account</a>
                       </li>

                       <li><hr className="dropdown-divider"></hr></li>

                        <li className="nav-item">
                          <a className="nav-link active" onClick={logout} href="/">Logout</a>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link active" href="/notifiche">Notifiche</a>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link active" href="/home">Home</a>
                    </li>
                    
                    </>
                )} 
              </ul>
            </div>
         </div>
        </nav>
      </div>
  );
}

export default Navbar;

 /*<nav className='navbar navbar-dark bg-dark'>
      <percorso.Provider value={{accesso, setAccesso}}>
        <Link to="/">Home</Link>
        <Link to="/home">Account</Link>
        {!accesso.status ? (
          <>
        <Link to="/login">Login</Link>
        <Link to="/registrazione">Registrati</Link>
          </>
        ) : (
          <>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </percorso.Provider>
      </nav>*/
