import { db, auth } from './firebaseConection'
import './app.css';
import { useState, useEffect } from 'react'
import { doc, setDoc, getDoc, addDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from 'firebase/auth'

function App() {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]);
  const [idPost, setIdPost] = useState('');
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [user, setUser] = useState(false);
  const [detail, setDetail] = useState({});


  async function handleAdd() {
    /*await setDoc(doc(db, 'post', '1351asdasd685'), {
      titulo: titulo,
      autor: autor
    }).then(() => {
      console.log('dados salvos com sucesso')
      setAutor('');
      setTitulo('');
    }).catch(err=>{
      console.log(err);
    })*/

    await addDoc(collection(db, 'post'), {
      titulo: titulo,
      autor: autor
    }).then(() => {
      console.log('dados salvos com sucesso')
      setAutor('');
      setTitulo('');
      handleAdd2();
    }).catch(err => {
      console.log(err);
    })


  }

  async function handleAdd2() {

    /* const postRef = doc(db, 'post', '1351asdasd685');
     await getDoc(postRef).then(doc => {
       setAutor(doc.data().autor);
       setTitulo(doc.data().titulo);
     }
     ).catch(err => {
       console.log("erro ao buscar dados");
     }
     )*/

    const postRef = collection(db, 'post');
    await getDocs(postRef).then(snapshot => {
      let array = [];
      snapshot.forEach(doc => {
        //aqui percorre todos os itens, coloca o id e todos os outros atributos que tives, js ecma script. sempre se lembre
        array.push({ id: doc.id, ...doc.data() })
      })
      setPosts(array);
    }).catch(err => {
      console.log("erro ao buscar dados");
    })




  }

  async function handleDelete() {

    const docRef = doc(db, 'post', idPost);
    await updateDoc(docRef, {
      autor: autor,
      titulo: titulo
    }).then(() => {
      console.log('dados atualizados com sucesso')
      setAutor('');
      setTitulo('');
      setIdPost('');
      handleAdd2();
    }).catch(err => {
      console.log("erro ao atualizar dados");
    })




  }

  async function excluirPost(id) {
    const docRef = doc(db, 'post', id);
    await deleteDoc(docRef).then(() => {
      console.log('dados excluidos com sucesso')
      handleAdd2();
    }).catch(err => {
      console.log("erro ao excluir dados");
    })
  }

  useEffect(() => {
    handleAdd2();
  }, [])

  function editar(item) {
    setAutor(item.autor);
    setTitulo(item.titulo);
    setIdPost(item.id);

  }

  async function newUser() {
    await createUserWithEmailAndPassword(auth, email, senha).then(() => {
      console.log("usuario criado com sucesso");
      setEmail('')
      setSenha('')
    }).catch(err => {
      console.log(err);
    })
  }

  async function login(){
    await signInWithEmailAndPassword(auth, email, senha).then((value)=>{
      console.log("usuario logado com sucesso");
      setDetail({
        email: value.user.email,
        uid: value.user.uid,

      });
      setUser(true);
      setSenha('')
      setEmail('')
    }).catch(err=>{
      console.log(err);
    })
  }

  async function logout(){
    await signOut(auth).then(()=>{
      setUser(false);
      setDetail({});
    }).catch(err=>{
      console.log(err);
    })

  }


return (
  <div className="App">
    <h1>Hello Firebase</h1>

    <div className='container'>
      {
        user === false ? (<h3>Logind de usuario</h3>) : (<div><h3>Id: {detail.uid} <br></br> Email: {detail.email}</h3><br></br><button onClick={logout}>Sair da conta</button> </div>)
      }
      <label>Email</label>
      <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Digite seu e-mail' />
      <label>Senha</label>
      <input type='password' value={senha} onChange={(e) => setSenha(e.target.value)} placeholder='Digite sua senha' />
      <button onClick={newUser}>Cadastrar</button>
      <button onClick={login}>Login</button>
    </div>

    <br></br>
    <hr />

    <div className='container'>
      <label >Id do post</label>
      <input type="text" value={idPost} onChange={(e) => setIdPost(e.target.value)} />
      <label>Titulo:</label>
      <textarea
        type="text"
        placeholder='Digite o titulo'
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
      />

      <label>Autor:</label>
      <textarea
        type="text"
        placeholder='Digite o autor'
        value={autor}
        onChange={e => setAutor(e.target.value)}
      />

      <button onClick={handleAdd}>Salvar</button>
      <button onClick={handleAdd2}>Buscar posts</button>
      <button onClick={handleDelete}>Editar post posts</button>

      <ul>
        {
          posts.map(item => (
            <li key={item.id}>
              <strong>{item.id}</strong>
              <h3>{item.titulo}</h3>
              <p>{item.autor}</p>
              <button onClick={() => excluirPost(item.id)}>Excluir o post</button>
              <button onClick={() => { editar(item) }}>Editar o post</button>
            </li>
          ))
        }
      </ul>


    </div>
  </div>
);
}

export default App;
