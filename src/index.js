const express = require('express');
const app = express();
const votanteRoutes = require('./routes/votanteRoutes');
const circuitoRoutes = require('./routes/circuitoRoutes');
const votoRoutes = require('./routes/votoRoutes');
const authRoutes = require('./routes/authRoutes');
const integranteRoutes = require('./routes/integranteRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use(express.json());

app.use('/votantes', votanteRoutes);
app.use('/circuitos', circuitoRoutes);
app.use('/votos', votoRoutes);
app.use('/auth', authRoutes)
app.use('/integrantes', integranteRoutes);
app.use('/admin', adminRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(3000);

