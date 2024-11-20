import React, { useEffect, useState } from 'react'
import AuthConsumer from './hooks/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [authed, dispatch] = AuthConsumer();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [tasks, setTasks] = useState([])
    let navigate = useNavigate()
     
    const data = {
      email: email,
      password: password
    }
    async function getData(){
      let result = await fetch('http://localhost:8000/api/user_liste');
      result = await result.json();
      setTasks(result);
      console.log(result)
  }
    useEffect(() => {
      getData()
      }, []);
  const loginSubmit = async (event) => {
    event.preventDefault();

    let errorStatus = "";
    try {

      const res = await axios.post('http://127.0.0.1:8000/api/login',
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',

          }
        }
      );
      if (res.data.code == 200) {
         const useConected =  res.data.user
         const token = res.data.token
        console.log(res);
        localStorage.setItem("user", JSON.stringify(useConected));
        localStorage.setItem("token", token)
        setEmail("");
        setPassword("")
        dispatch({ type: "login" })
        navigate('/tasksLists');
      } else {
        //alert(res.data.message)
        //toast(res.data.message);
        console.log('bad');
       
      }
      //console.log(res.data.code)
    } catch (error) {
      if (!error.res) {
        // network error
        errorStatus = 'Error: Network Error';
      } else {
        errorStatus = error.res.data.message;
      }
    }

  }
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={loginSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  )
}

export default Login