
import React, {Component} from "react"

// eslint-disable-next-line import/no-anonymous-default-export
 class Feed extends Component {

    constructor(props){
        super(props)
        this.state = {
            object: props.object
        }   
    }


    render(){
        return(
            <>
            {
                this.state.object.map((item)=>{
                    return(
                        <div key={item.id}>
                            <h2>{item.username}</h2>
                            <h3>Curtidas: {item.curtidas}</h3>
                            <h3>Comentários: {item.comentarios}</h3>
                            <hr></hr>
                        </div>
                    )
                })
            }
            </>
        )

    }
}

export default Feed;

