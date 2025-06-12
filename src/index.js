const express = require('express');
const app = express();
const votanteRoutes = require('./routes/votanteRoutes');
const circuitoRoutes = require('./routes/circuitoRoutes');

app.use(express.json());

app.use('/votantes', votanteRoutes);
app.use('/circuitos', circuitoRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(3000);

