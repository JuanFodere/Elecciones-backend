const db = require ('../db/connection');

const votarLista = async (req, res) => {
    const { validez, observado, fecha_y_hora, IDcircuito, IDpapeleta } = req.body;
    console.log("voto:", { validez, observado, fecha_y_hora, IDcircuito, IDpapeleta });

    try {
    const [rows] = await db.query('SELECT * FROM circuito WHERE ID = ?', [IDcircuito]);
    const circuito = rows[0];

    if (!circuito) {
      return res.status(404).json({ message: 'Circuito no encontrado' });
    }
    
    await db.query('INSERT into voto (validez, observado, fecha_y_hora, Id_circuito, Id_papeleta) VALUES (?, ?, ?, ?, ?)', [ validez, observado, fecha_y_hora, IDcircuito, IDpapeleta]);
    res.json({ message: 'Voto registrado con éxito', exito: true });
  } catch (error) {
    console.error('Error al obtener el circuito:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    error: error.message
  }
}


module.exports = {votarLista};