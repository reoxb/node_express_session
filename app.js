const express = require('express');
const session = require('express-session')
const app = express();
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(session);


const port = 9000;
const hostname = 'localhost';

// Connect to DB
mongoose.connect('mongodb://localhost/userSession',
  function(err, res) {
    if(err) throw err;
    console.log('Conectado con éxito a la BD');
});


// definimos como manejara express la session
app.use(session({
    secret: 'javascript rules',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 24 * 60 * 60 * 1000},
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      clear_interval: (24 * 60 * 60 * 100)
    })
}));

app.get('/', function (req, res) {
    // establece una variable de la sesion para ser consultada y almacenada
    req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
    console.log(req.session);
    res.send(`Numero de visitas en la pagina ${req.session.cuenta}`)    
})

app.listen(port, hostname, function () {
    console.log(`File server running at http://${hostname}:${port}`);
});