import Nome from "../Nome";
import { UserContext } from "../../contexts/user";
import {useContext} from 'react';

function Alunos() {
    const {user,setUser} = useContext(UserContext);
    return (
      <div className="App">
        <h1>Alunos: {user}</h1>
        <Nome />
        <button onClick={()=>{setUser('Gabriel o pica')}}>Trocar nome</button>
      </div>  
    );
  }
  
  export default Alunos;
  