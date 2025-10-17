const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());


const gaRouter = require('./routes/GestioneAccount');
app.use("/gestioneAccount", gaRouter);

const vsRouter = require('./routes/VisioneServizi');
app.use("/visioneServizi", vsRouter);


const maRouter = require('./routes/ModificaAccount');
app.use("/modificaAccount", maRouter);

const pmRouter = require('./routes/PrenotazioneMezzo');
app.use("/prenotazioneMezzo", pmRouter);

const gpRouter = require('./routes/GestionePrenotazione');
app.use('/gestionePrenotazione', gpRouter);


app.listen(3001, () => {
    console.log("Avvio server sulla porta 3001")
});