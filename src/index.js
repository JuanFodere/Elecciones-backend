const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

const votanteRoutes = require('./routes/votanteRoutes');
const circuitoRoutes = require('./routes/circuitoRoutes');
const votoRoutes = require('./routes/votoRoutes');
const authRoutes = require('./routes/authRoutes');
const integranteRoutes = require('./routes/integranteRoutes');
const adminRoutes = require('./routes/adminRoutes');
const resultadoRoutes = require('./routes/resultadoRoutes');
const candidatoRoutes = require('./routes/candidatoRoutes');
const listaRoutes = require('./routes/listaRoutes');

app.use(express.json());

app.use('/votantes', votanteRoutes);
app.use('/circuitos', circuitoRoutes);
app.use('/votos', votoRoutes);
app.use('/auth', authRoutes)
app.use('/integrantes', integranteRoutes);
app.use('/admin', adminRoutes);
app.use('/resultados', resultadoRoutes);
app.use('/candidatos', candidatoRoutes);
app.use('/listas', listaRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(3000);


