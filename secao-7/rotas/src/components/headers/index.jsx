
import {Link} from 'react-router-dom'

function Header(){
    return(
        <div>
            <header>
                <h1>Sotero</h1>
                <Link to="/">Home</Link>
                <Link to="/sobre">About</Link>
                <Link to="/contato">Contato</Link>
            </header>
        </div>
    )
}

export default Header;