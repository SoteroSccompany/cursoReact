import './signUp.css';
import { useState } from 'react';
import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/auth';
import { useContext } from 'react';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const {signUp, loadingAuth} = useContext(AuthContext);

  async function haddleSubmit(e) {
    e.preventDefault();
    if(name !== '' && email !== '' && password !== ''){
      await signUp(email, password, name);
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
          <input type="text" placeholder='Digite seu nome' value={name} onChange={e => setName(e.target.value)}/>
          <input type="email" placeholder="Email@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="********" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">{loadingAuth ? "Carregando...." : "Cadastrar"}</button>
        </form>

        <Link to="/">Voltar a login</Link>
      </div>
    </div>
  );
}

export default SignUp;
