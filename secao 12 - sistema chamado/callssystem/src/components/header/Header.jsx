import { useContext } from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import { AuthContext } from '../../context/auth'
import Avatar from '../../assets/avatar.png'
import { FiHome, FiUser, FiSettings } from "react-icons/fi";

export default function Header() {

    const { user } = useContext(AuthContext)
    return (

        <div className="sidebar">
            <div>
                <img src={user.avatarUrl == null ? Avatar : user.avatarUrl} alt="fotoAvatar" />
            </div>
            <Link to='/dashboard'>
                <FiHome color='#FFFF' size={25} />
                Chamado
            </Link>
            <Link to='/customers'>
                <FiUser color='#FFFF' size={25} />
                Cliente
            </Link>
            <Link to='/profile'>
                <FiSettings color='#FFFF' size={25} />
                Configurações
            </Link>
        </div>
    )

}