import React, { useState, useEffect, useMemo, useCallback } from "react";

function App() {

  
  const [tarefa, setTarefa] = useState(['Pagar a conta', 'Estudar React']);

  useEffect(() => {
    console.log('Tarefa alterada')

    return ()=>{} //componentWillUnmount sempre volte na teoria qualquer coisa

  }, [tarefa]);

  //const totalTarefas = useMemo(()=> tarefa.length, [tarefa]);

  const handdle = useCallback(() => {
    setTarefa([...tarefa, 'Novo Item']);
  }, [tarefa]);

  return (
    <div className="App">
      <ul>
        {
          tarefa.map((tarefa) => {
            return (
              <li key={tarefa}>{tarefa}</li>
            )
          })
        }
      </ul>
      <button onClick={handdle}>Adicionar</button>
    </div>
  );
}

export default App;
