const db = require ('../db/connection');

const votarLista = async (req, res) => {
    const { validez, observado, IDcircuito, IDpapeleta, IDlista } = req.body;
    console.log("voto:", { validez, observado, IDcircuito, IDpapeleta });

    try {
    const [rows] = await db.query('SELECT * FROM circuito WHERE ID = ?', [IDcircuito]);
    const circuito = rows[0];

    if (!circuito) {
      return res.status(404).json({ message: 'Circuito no encontrado' });
    }
    
    await db.query('INSERT into voto (validez, observado, Id_circuito, Id_papeleta, Id_lista) VALUES (?, ?, ?, ?, ?)', [ validez, observado, IDcircuito, IDpapeleta, IDlista]);
    res.json({ message: 'Voto registrado con éxito', exito: true });
  } catch (error) {
    console.error('Error al obtener el circuito:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    error: error.message
  }
}

const marcarVoto = async (req, res) => {
    const { circuito, fecha_elección, tipo_elección, ci } = req.body;
    console.log("los datos pa", circuito, fecha_elección, tipo_elección, ci)

    try {
    await db.query('UPDATE votante_eleccion SET circuito_votado = ? WHERE CI_votante = ? AND fecha_elección = ? AND tipo_elección = ?',[circuito,ci, fecha_elección, tipo_elección]);
    
    res.json({ message: 'Voto registrado con éxito', exito: true });
  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    error: error.message
  }
}

module.exports = {votarLista, marcarVoto};