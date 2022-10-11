
import React, { Component } from "react"
//import Membro from "./components/member"
//import Lista from "./components/list"

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      horas: 50,
      status: 1,
      email: "uaiauai@gmail.com",
      password: "123456",
      sexo: "masculino",
      feed: [
        { id: 1, username: "Gabriel", curtidas: 10, comentarios: 2 },
        { id: 2, username: "João", curtidas: 20, comentarios: 1 },
        { id: 3, username: "Maria", curtidas: 30, comentarios: 3 },
      ]
    }
    this.trocaEmail = this.trocaEmail.bind(this)
  }

  trocaEmail(event) {
    const digit = event.target.value
    this.setState({ email: digit })
  }

  /* componentDidMount(){
     this.setState({horas: 100})
   }
 
   componentDidUpdate(){
 
 
   }*/



  render() {
    return (
      <div>
        <h1>App{this.state.horas}</h1>
        {
          this.state.email
        }<br>
        </br>
        Email:
        <input type="text" name="email" id="email" onChange={this.trocaEmail} placeholder="Digite seu email" value={this.state.email} /><br></br>
        {this.state.password}<br></br>
        Senha:
        <input type="password" name="senha" id="senha" onChange={(e) => { this.setState({ password: e.target.value }) }} placeholder="Digite sua senha" value={this.state.password} /><br></br>
        Sexo
        <select name="sexo" id="sexo" value={this.state.sexo} onChange={e => this.setState({sexo: e.target.value}) }>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select><br></br>



        <button>Entrar</button>



        {
          /*
        <Lista object={this.state.feed}/>*/
        }

        {/*
                  this.state.status === 1 ? <Membro nome="Visitante"/> : <h2>Deslogado</h2>
                */}
      </div>
    )
  }
}