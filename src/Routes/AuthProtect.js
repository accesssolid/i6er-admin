import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RouterKeys } from "./RouterKeys";

const AuthProtect = ({children}) => {
    const accessToken = useSelector((state) => state?.auth?.auth_data?.token)
    if(!accessToken){
        return children
    }else{
        return <Navigate to={RouterKeys.NON_Auth.HOME} />
    }
}

export default AuthProtect