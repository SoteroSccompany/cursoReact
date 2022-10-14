import { useState, useEffect } from 'react'
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Title from '../../components/Title';
import './dasboard.css'
import firebase from '../../service/firebaseConnection'
import { format } from 'date-fns'
import Modal from '../../components/modal';




function Dashboard() {

  const [chamados, setChamados] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [lastDocs, setLastDocs] = useState()
  const [showPostModal, setShowPostModal] = useState(false)
  const [detail, setDetail] = useState()


  const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc')

  useEffect(() => {
    async function loadCalls() {

      await firebase.firestore().collection('chamados').orderBy('created', 'desc').limit(5).get()
          .then((snapshot) => {
            updateState(snapshot)

           

          }).catch(err => {
            console.log(err)
            setLoadingMore(false)
          })
      setLoading(false)
    }


    loadCalls()


    //Lembre que isso e para quando o componente for desmontado
    return () => {

    }

  }, [])

  async function updateState(snapshot) {
    const isCollectionEmpty = snapshot.size === 0
    if (!isCollectionEmpty) {

      let lista = []

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          cliente: doc.data().cliente,
          assunto: doc.data().assunto,
          status: doc.data().status,
          created: doc.data().created,
          createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          complemento: doc.data().complemento

        })
      })

      const lastDoc = snapshot.docs[snapshot.docs.length - 1]

      if (lista.length === 0) {
        console.log('Nenhum chamado encontrado')
        setChamados(0)
        setLoading(false)
        return
      }
      setChamados(chamados => [...chamados, ...lista])
      setLastDocs(lastDoc)
      setLoading(false)

    } else {
      setIsEmpty(true)
      setLoading(false)
    }
    setLoadingMore(false)

  }




  if (loading) {

    return (
      <div>
        <Header />
        <div className="content">
          <Title name="Atendimentos">
            <FiMessageSquare size={25} />
          </Title>
          <div className="container dashboard">
            <span>Buscando chamados...</span>
          </div>
        </div>
      </div>
    )

  }

  async function handdleMore() {
    setLoadingMore(true)
    await listRef.startAfter(lastDocs).limit(5).get()
      .then((snapshot) => {
        updateState(snapshot)
      })
  }

  function toggglePostModal(item) {
    setShowPostModal(!showPostModal)
    setDetail(item)

  }


  return (
    <div className="App">
      <Header />
      <div className="content">
        <Title name="Dashboard">
          <FiMessageSquare size={25} />
        </Title>

        {
          chamados.length === 0 ? (
            <div className="container dashboard">
              <span>Nenhum chamado registrado...</span>
              <Link to='/new' className='new'>
                <FiPlus size={25} color="#FFF" />
                Novo chamado
              </Link>

            </div>
          ) : (
            <>
              <Link to='/new' className='new'>
                <FiPlus size={25} color="#FFF" />
                Novo chamado
              </Link>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Assunto</th>
                    <th scope="col">Status</th>
                    <th scope="col">Criado em</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>


                  {
                    chamados.map((client, index) => {
                      console.log(client)
                      console.log(index)
                      return (
                        <tr key={index} >
                          <td data-label="Cliente">{client.cliente}</td>
                          <td data-label="Assunto">{client.assunto}</td>
                          <td data-label="Status">
                            <span className="badge" style={{ backgroundColor: client.status === "Aberto" ? "#5cb85c" : "#999" }}>{client.status}</span>
                          </td>
                          <td data-label="Criado em">{client.createdFormated}</td>
                          <td data-label="#">
                            <button className="action" style={{ backgroundColor: '#3583f6' }} onClick={() => toggglePostModal(client)}><FiSearch size={17} /></button>
                            <Link className="action" style={{ backgroundColor: '#f6a935' }} to={`/new/${client.id}`}><FiEdit2 size={17} /></Link>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              {
                loadingMore && <h3 style={{ textAlign: 'center', marginTop: 15 }}>Buscando dados...</h3>
              }
              {
                !loadingMore && !isEmpty && <button className='btn-more' onClick={handdleMore}>Buscar mais..</button>
              }

            </>
          )
        }
      </div>
      {
        showPostModal && (<Modal
          content={detail}
          close={toggglePostModal}
        />) 
      }
    </div>
  );
}

export default Dashboard;
