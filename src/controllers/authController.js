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
  const { número, serie, ci } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM votante WHERE número_cc = ? AND serie_cc = ?', [número, serie]);
    const votante = rows[0];

    if (!votante) {
      return res.status(404).json({ message: 'Votante no encontrado' });
    }

    if (ci != votante.CI) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.json({ message: 'Inicio de sesión exitoso', autenticado: true });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}


const loginMesa = async (req, res) => {
  const { número, serie, contraseña } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM votante WHERE número_cc = ? AND serie_cc = ?', [número, serie]);
    const integrante = rows[0];

    if (!integrante) {
      return res.status(404).json({ message: 'Integrante de mesa no encontrado' });
    }

    const ci = integrante.CI
    const [mesaRows] = await db.query('SELECT * FROM integrante_mesa WHERE CI = ?', [ci]);
    const integrante2 = mesaRows[0];
    if (contraseña != integrante2.contraseña) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.json({ message: 'Inicio de sesión exitoso', autenticado: true });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}




module.exports = { loginAdmin, loginVotante, loginMesa };