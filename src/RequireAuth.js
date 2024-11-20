import React from "react";
import AuthConsumer from "./hooks/Auth";
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({children}) => {
    const [authed] = AuthConsumer();
    const location = useLocation();
    return authed.auth ===true ?(
        children

    ):(
        <Navigate to={"/login"} replace state={{path:location.pathname}}></Navigate>
    )
}

export default RequireAuth;