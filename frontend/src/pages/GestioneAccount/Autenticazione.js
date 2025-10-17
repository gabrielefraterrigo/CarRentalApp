import React from 'react';
import Axios from 'axios'

function Login() {
    
    const loginAccount = () => {
        Axios.post("http://localhost:3001/gestioneAccount/login", {
            email: document.getElementById("email").value,
            pass: document.getElementById("password").value,
         }).then((risposta) => {
            if(risposta.data.error) {
                alert(risposta.data.error);
            }else {
                localStorage.setItem("loginToken",risposta.data.token);
                window.location.href = "/home"
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

    const showPwd = () => {

        var input = document.getElementById('password');
        if (input.type === "password") {
          input.type = "text";
        } else {
          input.type = "password";
        }
      };

    const clickEnter = () => {
        var e = window.event;
        if (e.keyCode === 13)
        {
            document.getElementById('autenticati').click();
            return false;
        }
        return true;
    };

    return (
        <form className="row g-3 needs-validation" id="image" noValidate onSubmit={loginAccount}>
        <div className="containerAutenticazione">
        <div className="autenticazione">
        <div className="formLogin">
          <h3>Login</h3>
              <div className="modificaCampo">
                  <div className="form">
                      <div className="input-group mb-3" >
                          <span className="input-group-text" id="inputGroup-sizing-default" >Email</span>
                          <input type="email"  className="form-control" id="email" required
                              placeholder="Inserisci Email..." 
                              onKeyUp={clickEnter}
                              ></input>
                       </div>
                  </div>
              </div>

              <div className="modificaCampo">
                  <div className="form">
                      <div className="input-group mb-3" >
                          <span className="input-group-text" id="inputGroup-sizing-default" >Password</span>
                          <input type="password"  className="form-control" id="password" required                            
                              placeholder="Inserisci Password..." 
                              onKeyUp={clickEnter}
                              ></input>
                          <span><i className="fa fa-eye" id="togglePassword" onClick={showPwd} aria-hidden="true"></i></span>
                      </div>
                  </div>
              </div>       

              <div className="form">
                <button className="btn btn-primary mb-3" id="autenticati" onClick={verificaCredenziali}>Login</button>
              </div>
            </div>
        </div>   
        </div>  
       </form>
    )
}

export default Login;

