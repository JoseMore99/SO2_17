import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from 'recharts';
import io from "socket.io-client";

function Principal() {
    const [infoProcess, AddinfoProcess] = useState([
        { name: 'Group A', porcentaje: "0.03" },
        { name: 'Group c', porcentaje:" 8.35" },
        { name: 'Group e', porcentaje: "2.09 "},
        { name: 'Group r', porcentaje:" 9.68" },
        { name: 'Group t', porcentaje: 6.27 },
        { name: 'Group y', porcentaje: 6.87 },
       // { name: 'Group B', value: 40.60 },
       // { name: 'Group p', value: 6.09 },
       // { name: 'Group o', value: 4.21 },
       // { name: 'Group l', value: 13.82 },
    ])
    const [procesos, Addprocesos] = useState([])
    const [procesosRes, Addprocesosres] = useState([])
    const socket = io("http://localhost:4000");


    useEffect(() => {

        socket.emit("key", "Grupo17");
        socket.on("key", (t) => {
            //console.log(t);
            Addprocesos(t)
        })
        socket.on("key2", (t) => {
            //console.log(t);
            Addprocesosres(t)
            for (let i = 0; i < t.length; i++) {
                t[i].porcentaje=Number( t[i].porcentaje)
            }
            AddinfoProcess(t)
            //console.log(procesosRes)
        })
    }, []);


    return (
        <div className="Principal m-2">
            <h1> Estadisticas</h1>

            <div className='row'>
                <div className='col'>
                    <h2 className="text-info">Porcentaje de uso de memoria</h2>

                    <div style={{ width: '100%', height: 800 }} >
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={infoProcess} dataKey="porcentaje" fill="#FFD700" label />
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className='col'>
                    <h2 className="text-info">Detalles de solicitudes</h2>
                    <table className="table table-hover text-center">
                        <thead>
                            <tr className="table-active">
                                <th scope="col">PID</th>
                                <th scope="col">NOMBRE</th>
                                <th scope="col">TAMAÑO</th>
                                <th scope="col">PORCENTAJE DE MEMORIA </th>
                            </tr>
                        </thead>
                        <tbody>
                            {procesosRes.map((p) => (
                                <tr className="table-primary">
                                    <th scope="row">{p.pid}</th><td>{p.name}</td><td>{p.tamanio}</td><td>{p.porcentaje} %</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>


            </div>
            <div className='row'>
                <div className='col'></div>
                <div className='col text-center'><h2 className="text-success-emphasis"> Procesos almacenados</h2></div>
                <div className='col'></div>

            </div>
            <div className='row'>
                <div className='col'>

                    <table className="table table-hover text-center">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">PID</th>
                                <th scope="col">NOMBRE</th>
                                <th scope="col">LLAMADA </th>
                                <th scope="col">TAMAÑO</th>
                                <th scope="col">FECHA </th>
                            </tr>
                        </thead>
                        <tbody>
                            {procesos.map((p) => (
                                <tr className="table-primary">
                                    <th scope="row">{p.pid}</th><td>{p.nombre_proceso}</td><td>{p.llamada}</td><td>{p.tamanio}</td><td>{p.fecha}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            <div className='row'>
                <p>PAULA GABRIELA GARCIA REINOSO 201700823</p>
                <p>JOSE CARLOS MOREIRA PAZ 201701015</p>
            </div>
        </div>
    );
}

export default Principal;
