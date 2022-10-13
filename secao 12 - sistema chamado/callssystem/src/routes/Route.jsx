import { Navigate} from 'react-router-dom';
import {AuthContext} from '../context/auth';
import { useContext } from 'react';

export default function RouteWArapper({
    component: Component,
    isPrivate,
    ...children
}){
    const {signed, loading} = useContext(AuthContext);

    

    if(loading){
        return <h1>Carregando...</h1>
    }

    if(!signed && isPrivate){
        return <Navigate to="/" />;
    }

    if(signed && !isPrivate){
        return <Navigate to="/dashboard" />;
    }

    return (
            <Component />
        
    );
} 

