import { useState } from 'react'
import { FiUser } from "react-icons/fi"
import Header from "../../components/header/Header"
import Title from "../../components/Title"
import "./customers.css"
import firebase from "../../service/firebaseConnection"
import { toast } from 'react-toastify'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [nomeFantasia, setNomeFantasia] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')

    async function handleAdd(e) {
        e.preventDefault()
        if (nomeFantasia !== '' && cnpj !== '' && endereco !== '') {
            await firebase.firestore().collection('customers')
            .add({
                nomeFantasia: nomeFantasia,
                cnpj: cnpj,
                endereco: endereco
            }).then(value=>{
                setNomeFantasia('')
                setCnpj('')
                setEndereco('')
                console.log(value)
                toast.success('Cliente cadastrado com sucesso')
            }).catch(err=>{
                setNomeFantasia('')
                setCnpj('')
                setEndereco('')
                console.log(err)
                toast.error('Erro ao cadastrar cliente')
            })
        }else{
            toast.error('Preencha todos os campos')
        }
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Clientes">
                    <FiUser size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile customers" onSubmit={handleAdd}>
                        <label>Nome Fantasia</label>
                        <input type="text" placeholder="Nome da empresa do cliente" value={nomeFantasia} onChange={e => setNomeFantasia(e.target.value)} />
                        <label>CNPJ</label>
                        <input type="text" placeholder="CNPJ do cliente" value={cnpj} onChange={e => setCnpj(e.target.value)} />
                        <label>Endereço</label>
                        <input type="text" placeholder="Endereço do cliente" value={endereco} onChange={e => setEndereco(e.target.value)} />
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )

}