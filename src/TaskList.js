import React, { useEffect, useState } from 'react'
import { Table, Modal, Button } from 'react-bootstrap';
import AuthConsumer from './hooks/Auth';
import Header from './Header';
import { Link } from 'react-router-dom';

let identifiant = 0;
function TasksList() {
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
        let result = await fetch('http://localhost:8000/api/tasks_liste');
        result = await result.json();
        setData(result);
        console.log(result.tasks)
    }

    //console.warn("result", data);
    async function deleteOpeation() {
        let result = await fetch("http://localhost:8000/api/delete/" + identifiant, {
            method: 'DELETE'
        })
        result = await result.json();
        handleClose();
        getData();
    }

    
    
    const handleClose = () => setShow(false);
    
    function handleShow(id) {
        identifiant = id
        setShow(true);
    }
    const handleCloseT = () => setMontrer(false);
    
    function handleMontrer(id) {
        identifiant = id
        setMontrer(true);
    }
    async function completeTask() {
        let result = await fetch("http://localhost:8000/api/taskcompleted/" + identifiant, {
            method: 'put'
        })
        result = await result.json();
        handleCloseT();
        getData();
    }


    return (
        <div>
            <Header />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Supprimer tâche</Modal.Title>
                </Modal.Header>
                <Modal.Body>Voulez-vous vraiment supprimer cette tâche ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => deleteOpeation()}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={montrer} onHide={handleCloseT}>
                <Modal.Header closeButton>
                    <Modal.Title>Complèter Tâche</Modal.Title>
                </Modal.Header>
                <Modal.Body>Voulez-vous vraiment complèter cette tâche ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseT}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => completeTask()}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="col-sm-8 offset-sm-2">
                <h1 style={{ textAlign: 'center' }}>Task List Page</h1>
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

                                    <td><Link to={`/update/${item.id}`}  >
                                        <Button variant="primary" className="update" >Update</Button></Link>
                                        <Button variant="danger" style={{ display: 'inline-block' }} onClick={() => {
                                            handleShow(item.id)
                                        }} className="delete">Delete</Button>

<Button variant="success" style={{ display: 'inline-block' }} onClick={() => {
                                            handleMontrer(item.id)
                                        }} className="delete">Complete</Button>

                                    </td>

                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default TasksList