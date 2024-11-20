import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from './Header'
import AuthConsumer from './hooks/Auth';

function UpdateTask() {
  const user = JSON.parse(localStorage.getItem("user")); 
  const token = localStorage.getItem("token"); 
  const [task, setTask] = useState([])
  const [title, setTitle] = useState();
  const [authed, dispatch] = AuthConsumer();
  let params = useParams()
  let navigate = useNavigate()
  useEffect(() => {
   console.log(params)
   getTask()
}, []);

async function getTask(){
  let result = await fetch('http://localhost:8000/api/task/'+params.id);
  result = await result.json();
  setTask(result);
  console.log(result)
}
async function updateTask() {
  try {
    const taskData = {
      title: title, 
      user_id: user.id
    };

    const res = await axios.put(
      'http://localhost:8000/api/task/'+task.id,
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
            <h1>Update Task Page</h1>
            <label>Tâche</label>
            <input type="text"  defaultValue={task.title} onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="Title" />
            
            <br />
            <button  onClick={updateTask} className="btn btn-primary">Update Task</button>
        </div>
    </>
)

}

export default UpdateTask