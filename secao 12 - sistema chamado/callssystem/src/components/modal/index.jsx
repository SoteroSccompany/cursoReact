import { FiX } from 'react-icons/fi'
import './modal.css'


// eslint-disable-next-line import/no-anonymous-default-export
export default ({ content, close }) => {
    console.log(content)

    return (
        <div className='modal'>
            <div className='container'>
                <button className='close' onClick={close}>
                    <FiX size={23} color='#000' />
                </button>

                <div>
                    <h2>Detalhes do chamado</h2>

                    <div className='row'>
                        <span>
                            Cliente: <i>{content.cliente}</i>
                        </span>
                    </div>
                    <div className='row'>
                        <span>
                            Assunto: <i>{content.assunto}</i>
                        </span>
                        <span>
                            Cadastrado Em: <i >{content.createdFormated}</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            Status: <i style={{ color: '#fff', backgroundColor: content.status === "Aberto" ? "#5cb85c" : "#999" }}>{content.assunto}</i>
                        </span>
                    </div>

                    {
                        content.complemento !== '' && (
                            <>
                                <h3>Complemento</h3>
                                <p>{content.complemento}</p>
                            </>
                        )
                    }

                </div>
            </div>
        </div>
    )
}