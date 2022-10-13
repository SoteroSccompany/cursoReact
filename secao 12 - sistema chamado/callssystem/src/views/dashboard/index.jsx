import {useContext} from 'react';
import {AuthContext} from '../../context/auth';
import Header from '../../components/header/Header';

function Dashboard() {
    const {signOut} = useContext(AuthContext);
    return (

      <div className="App">
        <Header />
        Pagina de dashboard
        <button onClick={signOut}>LogOut</button>
      </div>
    );
  }
  
  export default Dashboard;
  