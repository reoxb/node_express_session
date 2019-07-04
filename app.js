const express = require('express');
// necesario para almacenar la sesion 
const session = require('express-session')
const app = express();

const port = 9000;
const hostname = 'localhost';

// definimos como manejara express la session
app.use(session({
    secret: 'javascript rules',
    resave: true,
    saveUninitialized: true
}));

app.get('/', function (req, res) {
    req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
    res.send(`Numero de visitas en la pagina ${req.session.cuenta}`)    
})

app.listen(port, hostname, function () {
    console.log(`File server running at http://${hostname}:${port}`);
});