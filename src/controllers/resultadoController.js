const db = require('../db/connection');

const queryGanadorNacional = `
SELECT
    Lista.número AS numero_lista,
    Integración_Listas.partido,
    COUNT(Voto.ID) AS total_votos
FROM Voto
JOIN Papeleta
    ON Voto.ID_papeleta = Papeleta.ID
JOIN Lista
    ON Papeleta.ID = Lista.ID_papeleta
JOIN Integración_Listas
    ON Integración_Listas.ID_lista = Lista.ID_papeleta
WHERE Papeleta.fecha_elección = ? AND Papeleta.tipo_elección = ?
GROUP BY Lista.número, Integración_Listas.partido
ORDER BY total_votos DESC
LIMIT 1;

`;

const getGanadorNacional = async (req, res) => {
  const { fecha_elección, tipo_elección } = req.body;
  console.log('Datos recibidos:', { fecha_elección, tipo_elección });

  try {
    const [rows] = await db.query(queryGanadorNacional, [fecha_elección, tipo_elección]);
    const ganador = rows[0];

    if (!ganador) {
      return res.status(404).json({ message: 'Ganador no encontrado' });
    }

    res.json(ganador);
  } catch (error) {
    console.error('Error al obtener el ganador:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = {getGanadorNacional};