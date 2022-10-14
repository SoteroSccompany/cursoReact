import { FiPlus } from "react-icons/fi"
import Header from "../../components/header/Header"
import Title from "../../components/Title"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/auth"
import firebase from "../../service/firebaseConnection"
import { toast } from "react-toastify"


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('')
    const [customers, setCustumers] = useState([])
    const [customesSelect, setCustomersSelect] = useState(0)
    const [loadCustomers, setLoadCustomers] = useState(true)
    const [idCustomer, setIdCustomer] = useState(0)
    const {user} = useContext(AuthContext)

    async function handdleRegister(e){
        e.preventDefault()
        await firebase.firestore().collection('chamados')
        .add({
            created: new Date(),
            cliente: customers[customesSelect].nomeFantasia,
            clientId: customers[customesSelect].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid,
        }).then(()=>{
            setComplemento('')
            setStatus('')
            setAssunto('')
            setCustomersSelect(0)
            console.log('chamado registrado com sucesso')
            toast.success('Chamado registrado com sucesso')
        }).catch(err=>{
            toast.error('Erro ao registrar chamado, tente novamente')
            console.log(err)
        })
    }

    useEffect(() => {
        async function loadCustomers(){
            await firebase.firestore().collection('customers')
            .get()
            .then((snapshot) => {
                let lista = []

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })

                if(lista.length === 0){
                    console.log('Nenhum cliente encontrado')
                    setCustumers([{id: '1', nomeFantasia: 'FREELA'}])
                    setLoadCustomers(false)
                    return
                }

                setCustumers(lista)
                setLoadCustomers(false)
                
            }).catch(err=>{
                console.log(err)
                setLoadCustomers(false)
                setCustumers({id:'1', nomeFantasia: ''})
            })
        }
        loadCustomers()
    }, [])

    /*
    useEffect(()=>{
        console.log(customesSelect)
    },[customesSelect])*/


    return(
        <div>
            <Header />
            <div className="content">
                <Title name="Novo Chamado">
                    <FiPlus size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handdleRegister}>
                        <label>Clientes</label>
                        {
                            loadCustomers ? (
                                <input type="text" disabled={true} value="Carregando clientes..." />
                            ) : (
                                <select value={customesSelect} onChange={e=>setCustomersSelect(e.target.value)}>
                                    {
                                        customers.map((item, index) => {
                                            return(
                                                <option key={item.id} value={index}>
                                                    {item.nomeFantasia}
                                                </option>
                                            )
                                        
                                        })
                                    }
                                </select>

                            )
                        }
                        <label>Assunto</label>
                        <select value={assunto} onChange={e => setAssunto(e.target.value)}>
                            <option value='Suporte'>Suporte</option>
                            <option value='Visita Tecnica'>Visita Tecnica</option>
                            <option value='Financeiro'>Financeiro</option>
                        </select>
                        <label>Status</label>
                        <div className="status">
                            <input type="radio" name="radio" value="Aberto"  onChange={e => setStatus(e.target.value)} checked={status === "Aberto" ? true : false}/>
                            <span>Em Aberto</span>
                            <input type="radio" name="radio" value="Progesso"  onChange={e => setStatus(e.target.value)} checked={status === "Progresso" ? true : false}/>
                            <span>Em Progresso</span>
                            <input type="radio" name="radio" value="Finalizado"  onChange={e => setStatus(e.target.value)} checked={status === "Finalizado" ? true : false}/>
                            <span>Finalizado</span>
                        </div>
                        <label>Complemento</label>
                        <textarea type="text" placeholder="Descreva seu problema (opcional)" value={complemento} onChange={e => setComplemento(e.target.value)}></textarea>
                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}