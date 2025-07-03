const e = require('cors');
const db = require('../db/connection');

const abrirCircuito = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM circuito WHERE ID = ?', [id]);
    const circuito = rows[0];

    if (!circuito) {
      return res.status(404).json({ message: 'Circuito no encontrado', exito: false });
    }
    if (circuito.abierto == true) {
      return res.status(400).json({ message: 'El circuito ya está abierto' });
    }

    const [rows2] = await db.query('SELECT * FROM fueron_abiertos WHERE circuito = ?', [id]);
    const circuito2 = rows2[0];
    console.log(circuito2);

    if (circuito2) {
      return res.status(400).json({ message: 'El circuito ya fue abierto anteriormente', exito: false });
    }

    await db.query('UPDATE circuito SET abierto = true WHERE ID = ?', [id]);
    await db.query('INSERT INTO fueron_abiertos (circuito) VALUES (?)', [id]);
    res.json({ message: 'Circuito abierto exitosamente', exito: true });
  } catch (error) {
    console.error('Error al obtener el circuito:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    error: error.message
  }
}

const cerrarCircuito = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM circuito WHERE ID = ?', [id]);
    const circuito = rows[0];

    if (!circuito) {
      return res.status(404).json({ message: 'Circuito no encontrado' });
    }
    if (circuito.abierto == false) {
      return res.status(400).json({ message: 'El circuito ya está cerrado' });
    }
    await db.query('UPDATE circuito SET abierto = false WHERE ID = ?', [id]);
    res.json({ message: 'Circuito cerrado exitosamente' });
  } catch (error) {
    console.error('Error al obtener el circuito:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    error: error.message
  }
}

const verEstadoCircuito = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM circuito WHERE ID = ?', [id]);
    const circuito = rows[0];

    if (!circuito) {
      return res.status(404).json({ message: 'Circuito no encontrado' });
    }

    res.json({estado: Boolean(circuito.abierto)});
  } catch (error) {
    console.error('Error al obtener el estado del circuito:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

const habilitaResultados = async (req, res) => {
  console.log("Habilita resultados");
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM circuito WHERE ID = ?', [id]);
    const circuito = rows[0];

    if (!circuito) {
      return res.status(404).json({ message: 'Circuito no encontrado' });
    }

    const [rows2] = await db.query('SELECT abierto FROM circuito WHERE ID = ?', [id]);
    const circuito2 = rows2[0];

    if (circuito2.abierto == true) {
      return res.status(400).json({ message: 'El circuito está abierto, no se pueden habilitar los resultados' });
    }
    
    const [rows3] = await db.query('SELECT * FROM fueron_abiertos WHERE circuito = ?', [id]);
    const circuito3 = rows3[0];

    if (!circuito3) {
      return res.status(400).json({ message: 'El circuito aún no ha sido habilitado' });
    }
    
    res.json({habilitado: true, message: 'Resultados habilitados'});
  } catch (error) {
    console.error('Error al obtener el estado del circuito:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}





module.exports = {abrirCircuito, cerrarCircuito, verEstadoCircuito, habilitaResultados};