
import React, { Component } from "react"
//import Membro from "./components/member"
//import Lista from "./components/list"

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      form: {
        nome: "",
        email: "",
        senha: "",
        sexo: "masculino"
      }
    }
    this.submit = this.submit.bind(this)
    this.changeData = this.changeData.bind(this)
  }

  changeData(e){
    let form = this.state.form
    //Se o nome do input for igual ao nome do objeto, ele vai pegar o valor do input e colocar no objeto.
    form[e.target.name] = e.target.value
    this.setState({form: form})
  }
  
  submit(e) {
    alert(`caddastrar? ${this.state.nome} ${this.state.email} ${this.state.senha} ${this.state.sexo}`)
    alert(e)
  }

  render() {
    return (
      <div>
        <h1>Novo usuario</h1>
        {this.state.form.nome}<br></br>
        <label>Nome:</label>
        <input type="text" name="nome" id="nome" placeholder="Digite seu nome" value={this.state.nome} onChange={this.changeData} /><br></br>
        {/*Assim se coloca o erro, coloca um span ou algo9 do tipo.*/}
        {this.state.form.email}<br></br>
        <label>Email:</label>
        <input type="text" name="email" id="email" placeholder="Digite seu email" value={this.state.email} onChange={this.changeData} /><br></br>
        {this.state.form.senha}<br></br>
        <label>Senha:</label>
        <input type="password" name="senha" id="senha" placeholder="Digite sua senha" value={this.state.senha} onChange={this.changeData} /><br></br>
        {this.state.form.sexo}<br></br>
        <label>Sexo:</label>
        <select name="sexo" id="sexo" value={this.state.form.sexo} onChange={this.changeData}>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select><br></br>
        <button type="submit" onClick={this.submit}>Cadastrar</button>

      </div>
    )
  }
}