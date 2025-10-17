const mysql = require("mysql");

const serverCreden = mysql.createConnection({
    user: "amministratore",
    host: "localhost",
    password: "CtrlC-CtrlV",
    database: "noleggio",
})

module.exports = serverCreden;