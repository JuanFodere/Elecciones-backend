const db = require('../db/connection');

const queryListasEleccion = `
SELECT
    lista.número,
    lista.imagen,
    votante.apellido,
    integración_listas.cargo,
    integración_listas.partido
FROM Integración_Listas AS integración_listas
JOIN Lista
    ON integración_listas.ID_lista = lista.ID_papeleta
JOIN Candidato
    ON integración_listas.CI_candidato = Candidato.CI
    AND integración_listas.partido = Candidato.partido
    AND integración_listas.tipo_elección = Candidato.tipo_elección
    AND integración_listas.fecha_elección = Candidato.fecha_elección
JOIN Votante
    ON Candidato.CI = Votante.CI
WHERE integración_listas.fecha_elección = ?
  AND integración_listas.tipo_elección = ?;
`;


const getListasElección = async (req, res) => {
  const { fecha_elección, tipo_elección } = req.body;
  console.log('Fecha de elección:', fecha_elección);
  console.log('Tipo de elección:', tipo_elección);

  try {
    const [listas] = await db.query(queryListasEleccion, [fecha_elección, tipo_elección]);

    if (!listas) {
      return res.status(404).json({ message: 'Listas no encontradas' });
    }
    res.json({ listas });
  } catch (error) {
    console.error('Error al obtener las listas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    error: error.message
  }
}


module.exports = {getListasElección}