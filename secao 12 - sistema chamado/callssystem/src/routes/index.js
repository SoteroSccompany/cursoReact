import { Routes, Route } from 'react-router-dom';

import Signin from '../views/Signin';
import Signup from '../views/SignUp';
import Dashboard from '../views/dashboard';
import RouteWrapper from './Route';
import Profile from '../views/Profile';
import Customers from '../views/customers';
import New from '../views/New';

export default function AllRoutes() {
    return (
        <Routes>
            <Route  path="/" element={<RouteWrapper  component={Signin}/>} />
            <Route  path="/register" element={<RouteWrapper component={Signup}/>} />
            <Route path="/dashboard" element={<RouteWrapper isPrivate component={Dashboard}/>} />
            <Route path="/profile" element={<RouteWrapper isPrivate component={Profile}/>} />
            <Route path="/customers" element={<RouteWrapper isPrivate component={Customers}/>} />
            <Route path="/new" element={<RouteWrapper isPrivate component={New}/>} />
            <Route path="/new/:id" element={<RouteWrapper isPrivate component={New}/>} />
        </Routes>
    );
}


/*
Exemplo de protecao de rotas
const ProtectRouter = ({isPrivate, children}) => {
    return isPrivate ? <Navigate to='/'/>: children;


};*/