import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Registrazione from './pages/GestioneAccount/Registrazione';
import Login from './pages/GestioneAccount/Autenticazione';
import Homepage from './pages/VisioneServizi/Homepage';
import Home from './pages/GestioneAccount/Home';
import Navbar from './components/Navbar';
import ModificaAccount from './pages/GestioneAccount/ModificaAccount';
import GestioneNotifiche from './pages/GestioneAccount/GestioneNotifiche';
import RegistrazioneAmministratore from './pages/GestioneAccount/RegistrazioneAmministratore';
import PrenotazioneMezzo from './pages/PrenotazioneMezzo/PrenotazioneMezzo';
import ListaPrenotazione from './pages/GestionePrenotazione/ListaPrenotazione';
import ModificaPrenotazione from './pages/GestionePrenotazione/ModificaPrenotazione';
import TabellaPrenotazione from './pages/GestionePrenotazione/TabellaPrenotazione';
import ListaPrenotazioneCliente from './pages/GestionePrenotazione/ListaPrenotazioneCliente';
import ControlloPrenotazione from './pages/GestionePrenotazione/ControlloPrenotazione';
import ConsegnaMezzo from './pages/GestionePrenotazione/ConsegnaMezzo';
import GestioneServizioAutista from './pages/GestionePrenotazione/TerminaServizio/GestioneServizioAutista';
import TerminaServizioCliente from './pages/GestionePrenotazione/TerminaServizio/TerminaServizioCliente';
import RiportaMezzo from './pages/GestionePrenotazione/RiportaMezzo';
import Errore from './components/errore';

function App() {
   return (
     <>
      <BrowserRouter>
        <Navbar/>
          <Switch>
            <Route path="/registrazione" exact component={Registrazione} />
            <Route path="/" exact component={Homepage} />
            <Route path="/login" exact component={Login} />
            <Route path="/home" exact component={Home} />
            <Route path="/modificaAccount" exact component={ModificaAccount} />
            <Route path="/notifiche" exact component={GestioneNotifiche} />
            <Route path="/registrazioneadmin" exact component={RegistrazioneAmministratore} />
            <Route path="/prenotazione" exact component={PrenotazioneMezzo} />
            <Route path="/listaPrenotazione" exact component={ListaPrenotazione} />
            <Route path="/tabellaPrenotazione" exact component={TabellaPrenotazione} />
            <Route path="/modificaPrenotazione" exact component={ModificaPrenotazione} />
            <Route path="/listaPrenotazioneCliente" exact component={ListaPrenotazioneCliente}/>
            <Route path="/controlloPrenotazione" exact component={ControlloPrenotazione}/>
            <Route path="/consegnaMezzo" exact component={ConsegnaMezzo}/>
            <Route path="/terminaServizio" exact component={TerminaServizioCliente}/>
            <Route path="/gestioneServizioAutista" exact component={GestioneServizioAutista}/>
            <Route path="/riportaMezzo" exact component={RiportaMezzo}/>
            <Route path="/ERROR" exact component={Errore}/>
          </Switch>
      </BrowserRouter>
      </>
  );
}

export default App;