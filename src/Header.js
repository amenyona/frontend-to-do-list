import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate} from "react-router-dom";
import { Table, Modal, Button } from 'react-bootstrap';
import AuthConsumer from './hooks/Auth';

function Header() {
    const [authed, dispatch] = AuthConsumer();
    let navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('user-info'))
    function logOut() {
        localStorage.clear();
        navigate("/login");

    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">

                <Navbar.Brand href="#">To Do List App</Navbar.Brand>
                <Nav className="mr-auto navbar_warraper">
                    {
                        authed ?
                            <>
                                <Link to="/tasksLists" style={{marginLeft: '40px', marginRight:'10px', textDecoration:'none',color:'#fff',fontSize:'large'}}>Task uncompleted List</Link>
                                <Link to="/completedtasksLists" style={{marginLeft: '10px', marginRight:'20px', textDecoration:'none',color:'#fff',fontSize:'large'}}>Task completed List</Link>
                                <Link to="/add" style={{textDecoration:'none',color:'#fff',fontSize:'large'}}>Add Tasks</Link>
                                <Link to="/update"></Link>
                                <Button style={{marginLeft: '40px', marginRight:'10px'}} variant="success" className="update" onClick={() =>{
                              dispatch({type:"logout"})
                              navigate('/', {replace:true})
                            }}>Se Déconnecter</Button>
                            </>
                            :
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                    }


                </Nav>
                {localStorage.getItem('user-info')?
                <Nav>
                    <NavDropdown title={user && user.name}>
                        <NavDropdown.Item >
                            Logout
                        </NavDropdown.Item> 
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                    </NavDropdown>
                   
                </Nav>
                :null
               }
            </Navbar>
        </div>
    )
}

export default Header;