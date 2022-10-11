import React, {useState} from "react"

export default props => {
    //Aqui teria que ter o state dentro do usestate com as props que vem do pai

    const [prop, setProps] = useState(...props)

    return(
        <button onClick={() => setProps([...prop, 'Novo Item'])}>Adicionar</button>
    )

}