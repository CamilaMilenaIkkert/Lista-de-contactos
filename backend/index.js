/* Para que se ejecute el backend de este proyecto ejecutar en una terminal: node index.js */

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    database: 'data_empleado', 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
});

/* Para que los datos nuevos impacten en la base de datos debes comentar esta seccion y luego inicializar la base de datos manualmente para que no se eliminen y recreen las tablas y los datos se reinicien cada vez que se detiene y se vuelva a ejectutar los scripts.*/
const sqlFilePath = path.join(__dirname, 'database', 'data_empleado.sql');
fs.readFile(sqlFilePath, 'utf8', (err, sqlScript) => {
    if (err) {
        console.error('Error al leer el archivo SQL:', err);
        return;
    }
    db.query(sqlScript, (error) => {
        if (error) {
            console.error('Error al ejecutar el script SQL:', error);
        } else {
            console.log('Base de datos inicializada correctamente 📂');
        }
    });
});
/* Hasta aqui se debe comentar y para incializar la base de datos se debe ejecutar: mysql -u root -p data_empleado < database/data_empleado.sql */

app.get('/empleados', (req, res) => {
    console.log("📢 Se hizo una petición GET a /empleados");
    db.query('SELECT * FROM empleados', (err, results) => {
        if (err) {
            console.error('❌ Error al obtener empleados:', err);
            res.status(500).json({ error: 'Error al obtener empleados: ' + err.message });
        } else {
            console.log("✅ Empleados obtenidos:", results);
            res.json(results);
        }
    });
});

app.post('/empleados', (req, res) => {
    const { nombre, apellido, dni, mail } = req.body;
    console.log("📢 Se hizo una petición POST a /empleados con:", req.body);
    
    db.query(
        'INSERT INTO empleados (nombre, apellido, dni, mail) VALUES (?, ?, ?, ?)',
        [nombre, apellido, dni, mail],
        (err, results) => {
            if (err) {
                console.error('❌ Error al agregar empleado:', err);
                res.status(500).json({ error: 'Error al agregar empleado: ' + err.message });
            } else {
                console.log(`✅ Empleado agregado con ID ${results.insertId}`);

                res.json({ 
                    message: 'Empleado agregado', 
                    id: results.insertId, 
                    contacto: { 
                        id_empleado: results.insertId, 
                        nombre, 
                        apellido, 
                        dni, 
                        mail 
                    }
                });
            }
        }
    );
});

app.put('/empleados/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, dni, mail } = req.body;
    console.log(`📢 Se hizo una petición PUT a /empleados/${id} con:`, req.body);
    
    db.query(
        'UPDATE empleados SET nombre = ?, apellido = ?, dni = ?, mail = ? WHERE id_empleado = ?',
        [nombre, apellido, dni, mail, id],
        (err, results) => {
            if (err) {
                console.error('❌ Error al actualizar empleado:', err);
                res.status(500).json({ error: 'Error al actualizar empleado: ' + err.message });
            } else if (results.affectedRows === 0) {
                console.warn(`⚠️ No se encontró un empleado con ID ${id}`);
                res.status(404).json({ error: 'Empleado no encontrado' });
            } else {
                console.log(`✅ Empleado con ID ${id} actualizado`);
                res.json({ message: 'Empleado actualizado' });
            }
        }
    );
});

app.delete('/empleados/:id', (req, res) => {
    const { id } = req.params;
    console.log(`📢 Se hizo una petición DELETE a /empleados/${id}`);
    
    db.query(
        'DELETE FROM empleados WHERE id_empleado = ?',
        [id],
        (err, results) => {
            if (err) {
                console.error('❌ Error al eliminar empleado:', err);
                res.status(500).json({ error: 'Error al eliminar empleado: ' + err.message });
            } else if (results.affectedRows === 0) {
                console.warn(`⚠️ No se encontró un empleado con ID ${id}`);
                res.status(404).json({ error: 'Empleado no encontrado' });
            } else {
                console.log(`✅ Empleado con ID ${id} eliminado`);
                res.json({ message: 'Empleado eliminado' });
            }
        }
    );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/empleados 🚀`);
});