import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth'
import './profile.css'
import Header from '../../components/header/Header'
import Title from '../../components/Title'
import { FiSettings, FiUpload } from 'react-icons/fi'
import AvatarDef from '../../assets/avatar.png'
import firebase from '../../service/firebaseConnection'

export default function Profile() {
    const { user, signOut, setUser, storageUser } = useContext(AuthContext)


    //Colocando o user assim, se faz um if dentro do chamado 
    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null)


    async function handdleUpload() {   
        const currentId = user.uid
        await firebase.storage()
        .ref(`images/${currentId}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then(async ()=>{
            console.log("imagem criada com sucesso")
            await firebase.storage().ref(`images/${currentId}`)
            .child(imageAvatar.name).getDownloadURL()
            .then(async url =>{
                const urlFoto = url
                await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    avatarUrl: urlFoto,
                    nome: nome
                }).then(()=>{
                    let data = {
                        ...user,
                        avatarUrl: urlFoto,
                        nome: nome
                    }
                    setUser(data)
                    storageUser(data)

                }).catch((error)=>{console.log(error)})
            })
        })
        .catch(err =>{
            console.log(err)
        })


    }

    async function handdleFileUp(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0]

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image)
                //Ele cria uma URL para a imagem asim que ela é selecionada
                setUser({avatarUrl: URL.createObjectURL(e.target.files[0])})
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            } else {
                alert('Envie uma imagem do tipo PNG ou JPEG')
                setImageAvatar(null)
                return null
            }
        }
    }


    async function handleFile(e) {
        e.preventDefault()
        if (imageAvatar == null && nome !== "") {
            await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    nome: nome
                })
                .then(() => {
                    const data = {
                        ...user,
                        nome: nome
                    }
                    setUser(data)
                    storageUser(data)
                    console.log("Nome atualizado com sucesso")
                })
                .catch((error) => {
                    console.log(error)
                })

        } else if (imageAvatar !== null) {
            await handdleUpload()
        }
    }


    return (
        <div className="profile">
            <Header />
            <div className='content'>
                <Title name='meu perfil'>
                    <FiSettings size={25} />
                </Title>

                <div className='container'>
                    <form className="form-profile" onSubmit={handleFile}>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#fff' size={25} />
                            </span>
                            <input type="file" accept="image/*" onChange={handdleFileUp} />
                            {
                                avatarUrl === null ? <img src={AvatarDef} width='250' height='250' alt='foto de perfil' /> : <img src={avatarUrl} width='250' height='250' alt='foto de perfil' />
                            }
                        </label>
                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite seu nome" />
                        <label>Email:</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email" disabled={true} />
                        <button type="submit">Salvar</button>
                    </form>
                </div>

                <div className='container'>
                    <button className='logOutBtn' onClick={() => { signOut() }}>Sair</button>

                </div>
            </div>
        </div>
    )

}
