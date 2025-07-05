const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ANUSH1234.',
    database: 'eleccionesdb',
    port: 3306,
}).promise();

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

module.exports = db;