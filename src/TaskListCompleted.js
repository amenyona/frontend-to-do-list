import React, { useEffect, useState } from 'react'
import { Table, Modal, Button } from 'react-bootstrap';
import AuthConsumer from './hooks/Auth';
import Header from './Header';
import { Link } from 'react-router-dom';

let identifiant = 0;
function TaskListCompleted() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const [show, setShow] = useState(false);
    const [montrer, setMontrer] = useState(false);
    
    const [authed, dispatch] = AuthConsumer();
    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
        console.log(user.id)
    }, []);

    async function getData() {
        let result = await fetch('http://localhost:8000/api/completed_task_list');
        result = await result.json();
        setData(result);
        console.log(result.tasks)
    }


    return (
        <div>
            <Header />
    
          
            <div className="col-sm-8 offset-sm-2">
                <h1 style={{ textAlign: 'center' }}>Task Completed List Page</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>Tâche</th>

                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td><Button variant="success" className="update" >Treatement Finished</Button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default TaskListCompleted