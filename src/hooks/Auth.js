import { createContext, useContext,useReducer } from "react";
import axios from 'axios';

/**Store */
const initialState = {auth:false};

const authContext = createContext(initialState)

const logout = async (event) => {
    event.preventDefault();
     const data = "";
      const res = await axios.post('http://127.0.0.1:8000/api/logout',
       JSON.stringify(data),
       {
        headers: {
          'Content-Type': 'application/json',
          'X-Resquested-With': 'XMLHttpRequest',
        }
       }
      )

  }

export function reducer(state, action){
 switch(action.type){
    case 'login':
        return {auth:true};
    case 'logout':
        return {auth:false};
    default:
        throw new Error()
 }
}

/**Auth provider */

export function AuthProvider({children}){
    const [authed, dispatch] = useReducer(reducer, initialState)
    return <authContext.Provider value={[authed, dispatch]}>{children}</authContext.Provider>
}

/**Own consumer Hook*/
export default function AuthConsumer(){
    return useContext(authContext)
}