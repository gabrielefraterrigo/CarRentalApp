import Axios from 'axios';
import {useEffect, useState} from 'react';

function GestioneNotifiche() {
    const [listNotifiche, setListNotifiche] = useState([]);
    const [flag, setFlag] = useState(false);

    useEffect( () =>{
        Axios.post("http://localhost:3001/gestioneAccount/notifiche", {
        },{
        headers: {
        loginToken: localStorage.getItem("loginToken")
        }
        }).then((risultato)=>{
            if(risultato.data.error){
                alert(risultato.data.error);
                window.location.href="/"
            } else if(risultato.data.message){
              setFlag(false)
            } else {
              setListNotifiche(risultato.data.notifiche[0]);
              setFlag(true)
            }
        }).catch((error)=>{window.location.href="./ERROR"});
    }, []);

    return (
      <div className="gestioneNotifiche" id="image">
        <div className="bloccoNotifiche">
          <div className="blocco">
            <h3>Notifiche</h3>
              {flag &&(//Flag è true allora ci sono notifiche
                listNotifiche.map((valore) =>
                  (<div className="notifiche" key={valore.idnotifiche}>
                    <label>{valore.tipo}</label>
                    <h2>{valore.contenuto}</h2>
                    </div>)
                )
              )}

              {!flag &&(//Flag è false, 0 notifiche
                <h5>Non ci sono notifiche al momento</h5>
              )}
          </div>
        </div>
      </div>
    )

}

export default GestioneNotifiche;
