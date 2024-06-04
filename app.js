const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const port = 4000;

app.use(express.json());
app.use(cors());

/**
 * Las rutas con sus configuraciones respectivas
 */
const activosRouter = require('./routes/activoRoute');
const responsablesRouter = require('./routes/responsableRoute');
const ubicacionesRouter = require('./routes/ubicacionRoute');
const tagRouter = require('./routes/tagRoute');
const activoTagsRoute = require('./routes/activoTagRoute');

app.use('/activos', activosRouter);
app.use('/responsables', responsablesRouter);
app.use('/ubicaciones', ubicacionesRouter);
app.use('/tags',tagRouter);
app.use('/activotags',activoTagsRoute);

app.get('/', (req, res) => {
    res.send('Meta 4.1 - Integración Frontend-Backend')
});

/**
 * Las constantes que contienen las credenciales para crear el servidor
 */
const llavePrivada = fs.readFileSync("server.key");
const certificado = fs.readFileSync("server.crt");
const credenciales = {
    key: llavePrivada,
    cert: certificado,
    passphrase: "password"
};
const httpsServer = https.createServer(credenciales, app);

/**
 * Ahora se utiliza el servidor https
 */
httpsServer.listen(port, () => {
    console.log('Servidor https escuchando por el puerto: ', port)
}).on('error', err => {
    console.log('Error al iniciar servidor: ', err)
});