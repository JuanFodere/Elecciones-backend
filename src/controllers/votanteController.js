const db = require('../db/connection');

const getVotantePorCi = async (req, res) => {
  const { ci } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM votante WHERE CI = ?', [ci]);
    const votante = rows[0];

    if (!votante) {
      return res.status(404).json({ message: 'Votante no encontrado' });
    }

    res.json(votante);
  } catch (error) {
    console.error('Error al obtener el votante:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    error: error.message
  }
}

const getVotanteElección = async (req, res) => {
  const { CI_votante, fecha_elección, tipo_elección } = req.body;
  console.log('Datos recibidos:', { CI_votante, fecha_elección, tipo_elección });

  try {
    const [rows] = await db.query('SELECT * FROM votante_eleccion WHERE CI_votante = ? AND fecha_elección = ? AND tipo_elección = ?', [CI_votante, fecha_elección, tipo_elección]);
    const votante = rows[0];

    if (!votante) {
      return res.status(404).json({ message: 'Votante no encontrado' });
    }

    res.json(votante);
  } catch (error) {
    console.error('Error al obtener la información del votante:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}


const getAllVotantes = async (req, res) => {

  try {
    const [rows] = await db.query('SELECT * FROM votante');
    const votantes = rows[0];

    if (!votantes) {
      return res.status(404).json({ message: 'No hay votantes' });
    }

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los votante:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    error: error.message
  }
}




module.exports = {getVotantePorCi, getVotanteElección, getAllVotantes};