const db = require('../db/connection');
const querys = require('../querys');


const getResultadoNacional = async (req, res) => {
  const { fecha_elección, tipo_elección } = req.body;

  try {
    const [resultados] = await db.query(querys.queryResultadoNacional, [fecha_elección, tipo_elección]);


    if (!resultados) {
      return res.status(404).json({ message: 'resultados no encontrados' });
    }

    res.json(resultados);
  } catch (error) {
    console.error('Error al obtener los resultados:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}



const getResultadoNacionalPorCircuito = async (req, res) => {
  const { fecha_elección, tipo_elección, Id_circuito } = req.body;

  try {
    const [resultados] = await db.query(querys.queryResultadoNacionalCircuito, [fecha_elección, tipo_elección, Id_circuito]);


    if (!resultados) {
      return res.status(404).json({ message: 'resultados no encontrados' });
    }

    res.json(resultados);
  } catch (error) {
    console.error('Error al obtener los resultados:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

const getResultadoNacionalPorPartido = async (req, res) => {
  const { fecha_elección, tipo_elección } = req.body;

  try {
    const [resultados] = await db.query(querys.queryResultadoNacionalPorPartido, [fecha_elección, tipo_elección]);


    if (!resultados) {
      return res.status(404).json({ message: 'resultados no encontrados' });
    }

    res.json(resultados);
  } catch (error) {
    console.error('Error al obtener los resultados:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}


module.exports = {getResultadoNacional, getResultadoNacionalPorCircuito, getResultadoNacionalPorPartido};