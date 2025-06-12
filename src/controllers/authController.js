const db = require('../db/connection');
const bcrypt = require('bcrypt');

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [admin] = await db.query('SELECT * FROM admin WHERE username = ?', [username]);

    if (!admin) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.json({ message: 'Inicio de sesión exitoso', autenticado: true });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = { loginAdmin };