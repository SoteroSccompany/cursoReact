import React,{ Component } from "react"


class Membro extends Component{
    constructor(props){
        super(props)
        this.state = {
            nome: props.nome
        }
        this.entrar = this.entrar.bind(this)
        this.sair = this.sair.bind(this)
    }

    entrar(){
        this.setState({nome: "Gabriel"})
    }

    sair(){
        this.setState({nome: "Visitante"})
    }

    render(){
        return(
            <div>
                <button onClick={this.entrar}>Clica ai filha da puta</button>
                <button onClick={this.sair}>Sai ai filha da puta</button>
                <h2>Bem vindo(a) {this.state.nome}</h2>
            </div>
        )
    }
}

export default Membro