import { Routes, Route } from 'react-router-dom';

import Signin from '../views/Signin';
import Signup from '../views/SignUp';
import Dashboard from '../views/dashboard';
import RouteWrapper from './Route';
import Profile from '../views/Profile/Profile';

export default function AllRoutes() {
    return (
        <Routes>
            <Route  path="/" element={<RouteWrapper  component={Signin}/>} />
            <Route  path="/register" element={<RouteWrapper component={Signup}/>} />
            <Route path="/dashboard" element={<RouteWrapper isPrivate component={Dashboard}/>} />
            <Route path="/profile" element={<RouteWrapper isPrivate component={Profile}/>} />
        </Routes>
    );
}


/*
Exemplo de protecao de rotas
const ProtectRouter = ({isPrivate, children}) => {
    return isPrivate ? <Navigate to='/'/>: children;


};*/