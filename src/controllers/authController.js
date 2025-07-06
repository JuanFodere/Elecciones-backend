const db = require('../db/connection');
const bcrypt = require('bcrypt');

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM admin WHERE Usuario = ?', [username]);
    const admin = rows[0];

    if (!admin) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }

    if (password != admin.Contraseña) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.json({ message: 'Inicio de sesión exitoso', autenticado: true });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}


const loginVotante = async (req, res) => {
  const { número, serie, ci, fecha_elección, tipo_elección } = req.body;
  console.log("datos", fecha_elección, tipo_elección, ci);
  

  try {
    const [rows] = await db.query('SELECT * FROM votante WHERE número_cc = ? AND serie_cc = ?', [número, serie]);
    const votante = rows[0];
    console.log("votante", votante);

    if (!votante) {
      return res.status(404).json({ message: 'Votante no encontrado' });
    }
    if (ci != votante.CI) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    const [rows2] = await db.query('SELECT * FROM votante_eleccion WHERE CI_votante = ? AND fecha_elección = ? AND tipo_elección = ?', [ci, fecha_elección, tipo_elección]);
    const votanteEleccion = rows2[0];
    console.log("votanteEleccion", votanteEleccion);

    if (!votanteEleccion) {
      return res.status(404).json({ message: 'Votante no encontrado en la elección' });
    }

    if (votanteEleccion.circuito_votado) {
      return res.status(400).json({ message: 'El votante ya ha votado en esta elección', autenticado: false });
    }

    res.json({ message: 'Inicio de sesión exitoso', autenticado: true });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}


const loginMesa = async (req, res) => {
  const { número, serie, contraseña, fecha } = req.body;
  console.log("fecha", fecha, contraseña);

  try {
    const [rows] = await db.query('SELECT * FROM votante WHERE número_cc = ? AND serie_cc = ?', [número, serie]);
    const integrante = rows[0];

    if (!integrante) {
      return res.status(404).json({ message: 'Integrante de mesa no encontrado' });
    }

    const ci = integrante.CI
    const [mesaRows] = await db.query('SELECT * FROM integrante_mesa WHERE CI = ? AND fecha = ?', [ci, fecha]);
    const integrante2 = mesaRows[0];
    console.log("integrante2", integrante2);
    if (contraseña != integrante2.contraseña) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.json({ message: 'Inicio de sesión exitoso', autenticado: true, circuito: integrante2.ID_circuito});
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}




module.exports = { loginAdmin, loginVotante, loginMesa };