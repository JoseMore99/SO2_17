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
            var x = JSON.parse(results)
            io.emit("key", x)
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
    await client.connect()
    console.log("Server on port 4000");
})