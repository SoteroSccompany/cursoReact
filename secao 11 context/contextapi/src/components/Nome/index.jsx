import { UserContext } from "../../contexts/user";
import {useContext} from 'react';

function Nome() {
    const {user} = useContext(UserContext);
    return (
      <div>
        <span style={{color: '#ff0000'}}>Bem vindo: {user} </span>
      </div>  
    );
  }
  
  export default Nome;
  