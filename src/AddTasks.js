import axios from 'axios';
import Header from './Header';
import React, { useState, useCallback  } from 'react'
import { useNavigate} from "react-router-dom";
import AuthConsumer from './hooks/Auth';

function AddTask() {
  const user = JSON.parse(localStorage.getItem("user")); 
  const token = localStorage.getItem("token"); 
    const [authed, dispatch] = AuthConsumer();
    const [title, setTitle] = useState("");
    
   

    let navigate = useNavigate()

    /**async function addTask() {
        console.warn(name)


        const res = await axios.post('http://localhost:8000/api/addtask',
            JSON.stringify(name),
            {
              headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',

              }
            }
          );
          if (res.data.code == 200) {
           
            console.log(res);
          
            dispatch({ type: "login" })
            navigate('/tasksLists');
          } else {
            //alert(res.data.message)
            //toast(res.data.message);
            console.log('bad');
           
          }
          

    }*/

          async function addTask() {
            try {
              const taskData = {
                title: title, 
                user_id: user.id
              };
          
              const res = await axios.post(
                'http://localhost:8000/api/addtask',
                taskData,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                  },
                }
              );
          
              if (res.status === 200) {
                console.log('Task added successfully:', res.data);
                dispatch({ type: "login" }); // Action pour gérer la connexion
                navigate('/tasksLists'); // Redirection après succès
              } else {
                console.log('Unexpected status code:', res.status);
              }
            } catch (error) {
              console.error('Error while adding task:', error.response?.data || error.message);
            }
          }
          

    return (
        <>
            <Header />
            <div className="col-sm-6  offset-sm-3">
                <h1>Add Task Page</h1>
                <label>Tâche</label>
                <input type="text"  value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="Title" />
                
                <br />
                <button onClick={addTask} className="btn btn-primary">Add Task</button>
            </div>
        </>
    )
}

export default AddTask;