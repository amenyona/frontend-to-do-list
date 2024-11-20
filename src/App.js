import logo from './logo.svg';
import './App.css';
import AuthConsumer from './hooks/Auth';
import Login from './Login';
import { useRoutes } from 'react-router-dom';
import UpdateTask from './UpdateTask';
import TaskList from './TaskList';
import RequireAuth from './RequireAuth';
import AddTask from './AddTasks';
import TaskListCompleted from './TaskListCompleted';

function App() {
  const [authed, dispatch] = AuthConsumer();
  const auth = authed.auth
  //console.log('dffgdfgdgdgdfg '+authed)
 console.log('sdfs ' + auth)
 const routes = useRoutes([
  {
    path: "/",
    element: <Login />
  } ,
  {
    path: '/add',
    element: <RequireAuth><AddTask /></RequireAuth>
  }
  ,
  {
    path: "/update/:id",
    element: <RequireAuth><UpdateTask /></RequireAuth>
  } 
  ,
  {
    path: "/tasksLists",
    element: <RequireAuth><TaskList /></RequireAuth>
  }
  ,
  {
    path: "/completedtasksLists",
    element: <RequireAuth><TaskListCompleted /></RequireAuth>
  }


])

  return (
    <>
    {routes}
    </>
  );
}

export default App;
