const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); // Importa cors

const app = express();

// Configura CORS para permitir solicitudes desde http://127.0.0.1:5500
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'conrado',
  database: 'mesaya'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos SQL');
});

// Ruta para validar el login
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  const query = 'SELECT * FROM personas WHERE nombre = ? AND password = ?';
  db.query(query, [usuario, password], (err, results) => {
    if (err) throw err;
    
    if (results.length > 0) {
      res.send('Usuario autenticado correctamente');
    } else {
      res.status(401).send('Usuario o contraseña incorrectos');
    }
  });
});

// Ruta para manejar el formulario de inserción de datos
app.post('/formulario', (req, res) => {
  const { usuario, password } = req.body;

  const query = 'INSERT INTO persona (usuario, password) VALUES (?, ?)';
  db.query(query, [usuario, password], (err, result) => {
    if (err) throw err;
    res.send('Datos insertados correctamente');
  });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
