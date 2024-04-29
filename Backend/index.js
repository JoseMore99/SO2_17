const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql2/promise')

app.use(cors());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());



const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});


const infomysql = {
    host: process.env.DB_MY_HOST,
    user: process.env.DB_MY_USER,
    password: process.env.DB_MY_PASSWORD,
    port: process.env.DB_MY_PORT,
    database: process.env.DB_MY_NAME

}


app.get('/getsql', async (req, res) => {
    const conexion = await mysql.createConnection(infomysql)
    query = "SELECT * FROM so2.procesos"
    const [results,] = await conexion.execute(query, [])

    conexion.end(function (err) {
        if (err) {
            console.log(err.message);
            return
        }
    });
    conexion.destroy()
    res.json(results);
});

io.on('connection', (socket) => {
    //console.log("Se conecto un cliente");
    socket.on("key", async data => {
        console.log(data);
        try {
            setInterval(async () => {
                const conexion = await mysql.createConnection(infomysql)
                query = "SELECT * FROM so2.procesos"
                const [results,] = await conexion.execute(query, [])
                query = `SELECT 
            pid,
            nombre_proceso as name, 
            SUM(CASE WHEN llamada = 'Mmap' THEN tamanio ELSE -tamanio END) AS tamanio,
            ROUND(
                100 * (
                    SUM(CASE WHEN llamada = 'Mmap' THEN tamanio ELSE -tamanio END) / 
                    (SELECT SUM(CASE WHEN llamada = 'Mmap' THEN tamanio ELSE -tamanio END) FROM procesos)
                ),
                2
            ) AS porcentaje
        FROM 
            procesos
        GROUP BY 
            nombre_proceso`
                const [results2,] = await conexion.execute(query, [])

                conexion.end(function (err) {
                    if (err) {
                        console.log(err.message);
                        return
                    }
                });
                conexion.destroy()
                io.emit("key", results)
                io.emit("key2", results2)

            }, 2000);
        } catch (error) {
            console.log(error);
        }
        //io.emit("key", data + " desde el server")

    })
});

app.get('/', (req, res) => {
    res.send('¡Purueba api!');
});

server.listen(4000, async () => {
    console.log("Server on port 4000");
})