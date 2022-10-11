/* eslint-disable jsx-a11y/alt-text */

import React, { Component } from "react"
//import Membro from "./components/member"
//import Lista from "./components/list"
import './estilo.css'
 class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      textoFrase:''
    }
    this.quebrarBiscoito = this.quebrarBiscoito.bind(this)
    this.frases =['Siga os bons e aprenda com eles.', 'O bom-senso vale mais do que muito conhecimento.', 
    'O riso é a menor distância entre duas pessoas.', 
    'Deixe de lado as preocupações e seja feliz.',
    'Realize o óbvio, pense no improvável e conquiste o impossível.',
    'Acredite em milagres, mas não dependa deles.',
    'A maior barreira para o sucesso é o medo do fracasso.']
    
  }

  quebrarBiscoito(){
    let state = this.state
    let numeroAleatorio = Math.floor(Math.random() * this.frases.length)
    state.textoFrase = '"'+this.frases[numeroAleatorio]+'"'
    this.setState(state)
  }

  render() {
    return (
      <div className="container">
        <img src={require("./assets/biscoito.png")} className="img"/>
        <Button name='Quebrar Biscoitoooooo' action={this.quebrarBiscoito}/>
        <h3 className="textoFrase">{this.state.textoFrase}</h3>
      </div>
    )
  }
}

class Button extends Component{
    


    render(){
        return(
            <div>
                <button onClick={this.props.action} >{this.props.name}</button>
            </div>
        )
    }
}

export default App