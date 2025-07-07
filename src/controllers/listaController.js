const db = require('../db/connection');
const querys = require('../querys');


const getListasElección = async (req, res) => {
  const { fecha_elección, tipo_elección } = req.body;
  console.log('Fecha de elección:', fecha_elección);
  console.log('Tipo de elección:', tipo_elección);

  try {
    const [listas] = await db.query(querys.getListas, [tipo_elección, fecha_elección]);
    

    if (!listas) {
      return res.status(404).json({ message: 'Listas no encontradas' });
    }
    console.log('Listas obtenidas:', listas);
    res.json(listas);
  } catch (error) {
    console.error('Error al obtener las listas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    error: error.message
  }
}

const getIdPapeleta = async (req, res) => {
  const { id } = req.body;
  console.log('ID solicitado:', id);

  try {
const [rows] = await db.query(
  'SELECT * FROM lista JOIN papeleta ON papeleta.ID = lista.ID_papeleta WHERE lista.ID = ?',
  [id]
);    const papeleta = rows[0];
    console.log("PAPELETA: ", papeleta.id);
    

    if (!papeleta) {
      return res.status(404).json({ message: 'Papeleta no encontrada' });
    }

console.log("PAPELETA: ", papeleta.ID_papeleta);
res.json({ IDpapeleta: papeleta.ID_papeleta });

  } catch (error) {
    console.error('Error al obtener la papeleta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


const getPapeletaEleccion = async (req, res) => {
  const { tipo, fecha_elección, tipo_elección } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM lista WHERE tipo = ? AND fecha_elección = ? AND tipo_elección = ?', [tipo, fecha_elección, tipo_elección]);
    const [papeleta] = rows[0];

    if (!papeleta) {
      return res.status(404).json({ message: 'Papeleta no encontrada' });
    }
    res.json({papeleta: papeleta});
  } catch (error) {
    console.error('Error al obtener la papeleta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    error: error.message
  }
}


module.exports = {getListasElección, getIdPapeleta, getPapeletaEleccion}