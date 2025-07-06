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


module.exports = {getListasElección}