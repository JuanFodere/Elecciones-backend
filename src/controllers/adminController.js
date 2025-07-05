const db = require('../db/connection');

const cargarEleccion = async (req, res) => {
    const { fecha, tipoEleccion } = req.body;

    try {
    await db.query('INSERT into elección (fecha, tipo) VALUES (?, ?)', [ fecha, tipoEleccion ]);
    res.json({ message: 'Elección registrada con éxito', exito: true });
  } catch (error) {
    res.status(500).json({ message: 'Error al registar la elección', exito: false });
    error: error.message
  }
}

const cargarCircuito = async (req, res) => {
    const { ID_establecimiento, departamento, localidad, barrio_zona } = req.body;
    const abierto = false;

    try {
    await db.query('INSERT into circuito (ID_establecimiento, abierto, departamento, localidad, barrio_zona) VALUES (?, ?, ?, ?, ?)', [ ID_establecimiento, abierto, departamento, localidad, barrio_zona ]);
    res.json({ message: 'Circuito registrado con éxito', exito: true });
  } catch (error) {
    res.status(500).json({ message: 'Error al registar el circuito', exito: false });
    error: error.message
  }
}

const cargarEstablecimiento = async (req, res) => {
    const { Nombre, Dirección } = req.body;

    try {
    await db.query('INSERT into establecimiento (Nombre, Dirección) VALUES (?, ?)', [ Nombre, Dirección ]);
    res.json({ message: 'Establecimiento registrado con éxito', exito: true });
  } catch (error) {
    res.status(500).json({ message: 'Error al registar el establecimiento', exito: false });
    error: error.message
  }
}

const cargarCandidato = async (req, res) => {
    const { CI, partido, tipo_elección, fecha_elección } = req.body;
    console.log("candidato:", { CI, partido, tipo_elección, fecha_elección });

    try {
    await db.query('INSERT into candidato (CI, partido, tipo_elección, fecha_elección) VALUES (?, ?, ?, ?)', [ CI, partido, tipo_elección, fecha_elección ]);
    res.json({ message: 'Candidato registrado con éxito', exito: true });
  } catch (error) {
    res.status(500).json({ message: 'Error al registar el candidato', exito: false });
    error: error.message
  }
}

const cargarIntegrante = async (req, res) => {
    const { CI, fecha, rol, organismo_público, ID_circuito, ID_establecimiento, contraseña } = req.body;

    try {
    await db.query('INSERT into integrante_mesa (CI, fecha, rol, organismo_público, ID_circuito, ID_establecimiento, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?)', [ CI, fecha, rol, organismo_público, ID_circuito, ID_establecimiento, contraseña ]);
    res.json({ message: 'Integrante de mesa registrado con éxito', exito: true });
  } catch (error) {
    res.status(500).json({ message: 'Error al registar el integrante de mesa', exito: false });
    error: error.message
  }
}

const cargarPapeleta = async (req, res) => {
    const { tipo, fecha_elección, tipo_elección } = req.body;

    try {
    await db.query('INSERT into papeleta (tipo, fecha_elección, tipo_elección) VALUES (?, ?, ?)', [ tipo, fecha_elección, tipo_elección ]);
    res.json({ message: 'Papeleta registrada con éxito', exito: true });
  } catch (error) {
    res.status(500).json({ message: 'Error al registar la papeleta', exito: false });
    error: error.message
  }
}

const cargarLista = async (req, res) => {
    const { ID_papeleta, número, imagen } = req.body;

    try {
    await db.query('INSERT into lista (ID_papeleta, número, imagen) VALUES (?, ?, ?)', [ ID_papeleta, número, imagen ]);
    res.json({ message: 'Lista registrada con éxito', exito: true });
  } catch (error) {
    res.status(500).json({ message: 'Error al registar la lista', exito: false });
    error: error.message
  }
}

const cargarIntegracionLista = async (req, res) => {
    const { CI_candidato, partido, tipo_elección, fecha_elección, ID_lista, cargo, orden } = req.body;

    try {
    await db.query('INSERT into integración_listas (CI_candidato, partido, tipo_elección, fecha_elección, ID_lista, cargo, orden) VALUES (?, ?, ?, ?, ?, ?, ?)', [ CI_candidato, partido, tipo_elección, fecha_elección, ID_lista, cargo, orden ]);
    res.json({ message: 'Integración de lista registrada con éxito', exito: true });
  } catch (error) {
    console.error('Error al registrar la integración de lista:', error);
    res.status(500).json({ message: 'Error al registar la integración de lista', exito: false });
    error: error.message
  }
}

const cargarPartidoPolítico = async (req, res) => {
    const { nombre, dirección_sede, presidente, vicepresidente } = req.body;

    try {
    await db.query('INSERT into partido_político (nombre, dirección_sede, presidente, vicepresidente) VALUES (?, ?, ?, ?)', [ nombre, dirección_sede, presidente, vicepresidente ]);
    res.json({ message: 'Partido político registrado con éxito registrado con éxito', exito: true });
  } catch (error) {
    res.status(500).json({ message: 'Error al registar el partido político', exito: false });
    error: error.message
  }
}

const cargarParticipación = async (req, res) => {
    const { fecha_elección, tipo_elección, partido } = req.body;

    try {
    await db.query('INSERT into participación (fecha_elección, tipo_elección, partido) VALUES (?, ?, ?)', [ fecha_elección, tipo_elección, partido ]);
    res.json({ message: 'Participación registrado con éxito', exito: true });
  } catch (error) {
    res.status(500).json({ message: 'Error al registar la participación', exito: false });
    error: error.message
  }
}

const cargarPolicía = async (req, res) => {
    const { CI, comisaría, fecha, ID_establecimiento } = req.body;
    console.log("policía:", { CI, comisaría, fecha, ID_establecimiento });

    try {
    await db.query('INSERT into policía (CI, comisaría, fecha, ID_establecimiento) VALUES (?, ?, ?, ?)', [ CI, comisaría, fecha, ID_establecimiento ]);
    res.json({ message: 'Policía registrado con éxito registrado con éxito', exito: true });
  } catch (error) {
    console.error('Error al registrar el policía:', error);
    res.status(500).json({ message: 'Error al registar el policía', exito: false });
    error: error.message
  }
}

const cargarVotante = async (req, res) => {
    const { CI, número_cc, serie_cc, nombre, apellido, fecha_nacimiento } = req.body;

    try {
    const [rows] = await db.query('SELECT * FROM votante WHERE CI = ?', [CI]);

    if (rows.length > 0) {
      
      return res.json({
        message: 'La cédula ya está registrada.',
        exito: false
      });
    }
    await db.query('INSERT into votante (CI, número_cc, serie_cc, nombre, apellido, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?)', [ CI, número_cc, serie_cc, nombre, apellido, fecha_nacimiento ]);
    res.json({ message: 'Votante registrado con éxito', exito: true });
  } catch (error) {
    console.error('Error al registrar el votante:', error);
    res.status(500).json({ message: 'Error al registar el votante', exito: false });
    error: error.message
  }
}

const cargarVotanteElección = async (req, res) => {
    const { CI_votante, fecha_elección, tipo_elección, circuito_asignado, circuito_votado } = req.body;

    try {
    await db.query('INSERT into votante_eleccion (CI_votante, fecha_elección, tipo_elección, circuito_asignado, circuito_votado) VALUES (?, ?, ?, ?, ?)', [ CI_votante, fecha_elección, tipo_elección, circuito_asignado, circuito_votado ]);
    res.json({ message: 'Votante registrado con éxito', exito: true });
  } catch (error) {
    console.error('Error al registrar el votante:', error);
    res.status(500).json({ message: 'Error al registar el votante', exito: false });
    error: error.message
  }
}




module.exports = { cargarEleccion, cargarCircuito, cargarEstablecimiento, cargarCandidato, cargarIntegrante, cargarPapeleta, cargarLista, cargarIntegracionLista, cargarPartidoPolítico, cargarParticipación, cargarPolicía, cargarVotante, cargarVotanteElección };