const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'conrado',
  database: 'BDLocal'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos SQL');
});

// Ruta para manejar el formulario
app.post('/formulario', (req, res) => {
  const { campo1, campo2 } = req.body;

  const query = 'INSERT INTO tu_tabla (campo1, campo2) VALUES (?, ?)';
  db.query(query, [campo1, campo2], (err, result) => {
    if (err) throw err;
    res.send('Datos insertados correctamente');
  });
});

// Inicia el servidor
app.listen(3306, () => {
  console.log('Servidor corriendo en http://localhost:3306');
});
