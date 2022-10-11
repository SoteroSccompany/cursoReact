/* eslint-disable jsx-a11y/alt-text */

import React, { Component } from "react"
//import Membro from "./components/member"
//import Lista from "./components/list"
import './style.css'
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      horas: 0,
      botaoVai : "VAI",

    }
    this.taimer = null
    this.vai = this.vai.bind(this)
    this.zerar = this.zerar.bind(this)

  }

  vai() {
    let state = this.state
    if (this.timer !== null) {
      clearInterval(this.timer)
      this.timer = null
      state.botaoVai = "VAI"
    } else {
      this.timer = setInterval(() => {
        let state = this.state
        state.horas += 0.1
        this.setState(state)

      }, 100);
      state.botaoVai = "PAUSAR"
    }
    this.setState(state)


  }

  zerar() {
    if(this.timer !== null){
      clearInterval(this.timer)
      this.timer = null
    }
    let state = this.state
    state.horas = 0
    state.botaoVai = "VAI"
    this.setState(state)


  }



  render() {
    return (
      <div className="container">
        <img className="img" src={require("../src/assets/cronometro.png")} />
        <a className="timer">{this.state.horas.toFixed(1)}</a>
        <div className="areaBtn">
          <a className="botao" onClick={this.vai}>{this.state.botaoVai}</a>
          <a className="botao" onClick={this.zerar}>REINICIAR</a>
        </div>
      </div>
    )
  }

}



export default App