import './signIn.css';
import { useState, useContext } from 'react';
import {AuthContext} from '../../context/auth';
import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';

function SignIn() {
  const {signIn, loadingAuth} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function haddleSubmit(e) {
    e.preventDefault();
    
    if(email !== '' && password !== ''){
      signIn(email, password);
    }


    console.log(email, password);
  }


  return (
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <img src={logo} alt="logo" />
        </div>

        <form onSubmit={haddleSubmit}>
          <h1>Entrar</h1>
          <input type="email" placeholder="Email@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="********" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">{loadingAuth ? "Carregando..." : "Acessar"}</button>
        </form>

        <Link to="/register">Ainda não possui conta?</Link>
      </div>
    </div>
  );
}

export default SignIn;
