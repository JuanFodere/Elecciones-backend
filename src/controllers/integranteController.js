const db = require('../db/connection');

const confirmarAutoridad = async (req, res) => {
  const { ci, contraseña, fecha, ID_circuito } = req.body;
  console.log(ci, contraseña, fecha, ID_circuito);

  try {
    const [rows] = await db.query('SELECT * FROM integrante_mesa WHERE ID_circuito = ? and fecha = ?', [ID_circuito, fecha]);
    const integrante = rows[0];

    if (!integrante) {
      return res.status(404).json({ message: 'Integrante de mesa no encontrado' });
    }
    console.log(integrante);
    if (ci != integrante.CI || contraseña != integrante.contraseña) {
      return res.status(400).json({ message: 'Autoridad no confirmada', autoridad: false});
    }
    res.json({ message: 'Autoridad confirmada', autoridad: true });
  } catch (error) {
    console.error('Error al obtener el integrante de mesa:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    error: error.message
  }
};

const verCircuitoAsignado = async (req, res) => {
  const { ci, fecha } = req.body;
  console.log(ci, fecha);

  try {
    const [rows] = await db.query('SELECT ID_circuito FROM integrante_mesa WHERE CI = ? and fecha = ?', [ci, fecha]);
    const circuito = rows[0];

    if (!circuito) {
      return res.status(404).json({ message: 'Circuito no encontrado' });
    }

    res.json(circuito);
  } catch (error) {
    console.error('Error al obtener el circuito:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    error: error.message
  }
};



module.exports = { confirmarAutoridad, verCircuitoAsignado };