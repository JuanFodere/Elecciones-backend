const db = require('../db/connection');
const querys = require('../querys');
const { get } = require('../routes/resultadoRoutes');


const getResultadoNacional = async (req, res) => {
  const { fecha_elección } = req.body;
  console.log("fecha_elección:", fecha_elección);

  try {
    const [resultados] = await db.query(querys.queryResultadoNacional, [fecha_elección]);


    if (!resultados) {
      return res.status(404).json({ message: 'resultados no encontrados' });
    }
    console.log(resultados);
    res.json(resultados);
  } catch (error) {
    console.error('Error al obtener los resultados:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}



const getResultadoNacionalPorCircuito = async (req, res) => {
  console.log("llega al controlador por circuito");
  const { fecha_elección, Id_circuito } = req.body;
  console.log("fecha_elección:", fecha_elección);
  console.log("Id_circuito:", Id_circuito);

  try {
    const [resultados] = await db.query(querys.queryResultadoNacionalCircuito, [fecha_elección, Id_circuito]);


    if (!resultados) {
      return res.status(404).json({ message: 'resultados no encontrados' });
    }
    console.log(resultados)
    res.json(resultados);
  } catch (error) {
    console.error('Error al obtener los resultados:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

const getResultadoNacionalPorDepartamento = async (req, res) => {
  console.log("llega al controlador por departamento");
  const { fecha_elección, departamento } = req.body;
  console.log("fecha_elección:", fecha_elección);
  console.log("Departamento:", departamento);

  try {
    const [resultados] = await db.query(querys.queryResultadoNacionalPorDepartamento, [fecha_elección, departamento]);


    if (!resultados) {
      return res.status(404).json({ message: 'resultados no encontrados' });
    }
    console.log(resultados)
    res.json(resultados);
  } catch (error) {
    console.error('Error al obtener los resultados:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }

}

const getResultadoNacionalPorPartido = async (req, res) => {
  console.log("llega al controlador");
  const { fecha_elección } = req.body;
  console.log("fecha_elección:", fecha_elección);


  try {
    const [resultados] = await db.query(querys.queryResultadoNacionalPorPartido, [fecha_elección]);


    if (!resultados) {
      return res.status(404).json({ message: 'resultados no encontrados' });
    }
    console.log(resultados)
    res.json(resultados);
  } catch (error) {
    console.error('Error al obtener los resultados:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
  
}




module.exports = {getResultadoNacional, getResultadoNacionalPorCircuito, getResultadoNacionalPorPartido, getResultadoNacionalPorDepartamento};