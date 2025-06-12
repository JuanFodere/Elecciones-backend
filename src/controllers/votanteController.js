const db = require('../db/connection');

const getVotantePorCi = async (req, res) => {
  const { ci } = req.params;

  try {
    const [votante] = await db.query('SELECT * FROM votante WHERE CI = ?', [ci]);

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



module.exports = {getVotantePorCi};