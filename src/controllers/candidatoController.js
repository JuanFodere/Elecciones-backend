const db = require('../db/connection');

const getCandidatos = async (req, res) => {
  const { fecha_elección, tipo_elección } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM candidato WHERE fecha_elección = ? AND tipo_elección = ?', [fecha_elección, tipo_elección]);
    const candidatos = rows[0];

    if (!candidatos) {
      return res.status(404).json({ message: 'Candidatos no encontrados' });
    }

    res.json(candidatos);
  } catch (error) {
    console.error('Error al obtener los candidatos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    error: error.message
  }
}


module.exports = {getCandidatos}