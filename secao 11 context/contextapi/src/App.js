
import Alunos from "./components/alunos";
import { useState } from "react";
import UserProvider from "./contexts/user";


function App() {
  const [nomeAluno, setNomeAluno] = useState('Gabriel');
  return (
    <UserProvider>
      <div className="App">
        <h1>Context API</h1>
        <hr />
        <Alunos name={nomeAluno} changeName={setNomeAluno} />
      </div>
    </UserProvider>
  );
}

export default App;
