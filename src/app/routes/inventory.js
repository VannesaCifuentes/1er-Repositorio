const { createPool } = require('mysql');
const app = require('../../config/server')
const pool = require('../../config/db')

module.exports = app => {
    app.get('/', (req, res) => {
        pool.query('SELECT * FROM users', (err, result) => {
            console.log(result);
            res.render("../views/index.ejs", {
                inventario: result

            })
        })
    })
    app.get('/login', (req, res) => {
        res.render('../views/login.ejs')
    })
    app.get('/registro', (req, res) => {
        res.render('../views/registro.ejs')
    })
    app.get('/index', (req, res) => {
        res.render('db/registro')
    })

    app.post('/registro', async(req, res) => {
        const { nombre, apellido, correo, telefono, pass, subject } = req.body

        const newUser = {
            nombre,
            apellido,
            correo,
            telefono,
            pass,
            subject
        }

        await pool.query('INSERT INTO usuarios2 set ?', [newUser])

        res.send('recibido')
    })
}