import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './views/home';
import Sobre from './views/about';
import Contact from './views/contact';
import Header from './components/headers';
import NotFound from './views/notFound';
import Product from './views/Product';


function RoutesApp(){
    return(
        <BrowserRouter>
        <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/product/:id" element={<Product/>}/>
                <Route path="/sobre" element={<Sobre/>}/>
                <Route path="/contato" element={<Contact/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;