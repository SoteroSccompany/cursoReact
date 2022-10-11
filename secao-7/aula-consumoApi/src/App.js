import React,{useEffect, useState} from 'react';
import './index.css'
//https://sujeitoprogramador.com/rn-api/?api=posts



function App() {

  const [nutri, setNutri] = useState([]);

  //Obs, sempre que for utilizar o useeffect e nao colocar nada no array ele vai executar ao carregar o componente
  useEffect(() => {

    function loadApi(){
      let url = 'https://sujeitoprogramador.com/rn-api/?api=posts';

      //metodo de consulta a api de forma nativa do js
      fetch(url)
      .then((r) => r.json())
      .then((json) => {
        console.log(json);  
        setNutri(json);
      })

    }

    loadApi();

  },[]);


  return (
    <div className="container">
      <header>
        <strong>React Nutri</strong>
      </header>
      {nutri.map((item) => {
        return(
          <article key={item.id} className="post">
            <strong className="titulo">{item.titulo}</strong>
            <img className="capa" src={item.capa} alt="Capa"/>
            <p className="subtitulo">{item.subtitulo}</p>
            <a className="botao" href={item.link}>Acessar</a>
          </article>
        )
      })}
    </div>
  );
}

export default App;
