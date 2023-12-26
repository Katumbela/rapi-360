import '../App.css';
// Bootstrap CSS
import { Modal, Button } from 'react-bootstrap';
// Bootstrap Bundle JS
import logo from '../imgs/icone.png';
import Header from '../components/header';
import Footer from '../components/footer';
import Banners from '../components/banners';
import Banner from '../components/banner/banner';
import CookieConsent from 'react-cookie-consent';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from './userContext';
import firebase from 'firebase/compat/app';
import { db } from './firebase';
import okupa from '../imgs/arobot.png'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import v1 from '../imgs/anims/av1.mp4'
import peq_eng from '../imgs/banner-p.png';
import arduino from '../imgs/arduino.jpeg';
import eletronica from '../imgs/eletronica.jpeg';
import a1 from '../imgs/anims/a1.jpg'
import a2 from '../imgs/anims/a2.jpg'
import a3 from '../imgs/anims/a3.jpg'
import { Fade } from 'react-awesome-reveal';
import video from '../video/av1.mp4'
import BodyHome from '../components/corpo_home/body_home';
import Navba from '../components/nav';


const Home = ({ cart, nomee, emaill }) => {

  const { user, handleLogout } = useContext(UserContext);
  document.title = `Pagina Inicial | D'Aluguel`;


  useEffect(() => {
    // Adicione um listener para o estado da autenticação
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // Se não houver usuário autenticado, redirecione para a página de login

        const userData = {
          name: '',
          email: '',
          pictureUrl: '',
          tel: '',
          uid: '',
        }

        localStorage.setItem('users', JSON.stringify(userData));

      }

    });


    // Retorne uma função de limpeza para remover o listener quando o componente for desmontado
    return unsubscribe;
  }, []);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowModal(true);
      localStorage.setItem('hasVisited', true);
    }



    fetchPlayers();

  }, []);



  const handleCloseModal = () => {
    setShowModal(false);
  };



  const handleClose = () => setShowModal(false);


  const [players, setPlayers] = useState([]);

  // Função para buscar os jogadores ordenados por pontuação
  const fetchPlayers = async () => {
    try {
      const snapshot = await db.collection('players').where('pontos', '>', 15).orderBy('pontos', 'desc').limit(3).get();
      const playerData = snapshot.docs.map((doc) => doc.data());
      setPlayers(playerData);
    } catch (error) {
      console.error('Erro ao buscar os jogadores:', error);
    }
  };




  const [use, setUser] = useState([]);

  useEffect(() => {
    // Obtém o valor de 'users' do local storage quando o componente for montado
    const userString = localStorage.getItem('users');
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
    }
    else {
      const userData = {
        name: '',
        email: '',
        pictureUrl: '',
        tel: '',
      }
      setUser(userData);
    }
  }, []);


  const [backgroundImage, setBackgroundImage] = useState(0);
  const images = ['a1.jpg', 'a7.jpg', 'a3.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/${images[backgroundImage]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(35%)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '70vh',
  };

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);


  return (
    <div className="w-100">

{/*  */}
      {/* <Navba/> */}
      < Header style={{ marginBottom: '5rem' }} nomee={nomee} emaill={emaill} cart={cart} />
     <Banner></Banner>
     
      <div className="s">
       
        <br />
        <br />

        <br />

        <br />
        <br />

       
        < Footer />
      </div>
      <CookieConsent
        location="bottom"
        buttonText="Aceitar"
        cookieName="myAwesomeCookieConsent"
        style={{ background: "#1C4587" }}
        buttonStyle={{ color: "#003885", background: 'white', marginTop: 'auto', fontSize: "13px" }}
        expires={150}
      >
        Este site usa cookies para melhorar sua experiência de navegação e interação com o nosso site.
      </CookieConsent>
      {/* O resto do seu componente aqui */}

      {/* Conteúdo do seu componente aqui */}
      {showModal && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className='text-primary'>Uhaaa!. Temos um novo visual</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Estamos em actualização, esperamos que tenha melhor experiencia com o novo visual do nosso site,
            <br />
            <br />
            <center>

              <img src={logo} style={{ height: '2.5em' }} alt="" />

              <br />
              <br />
              <i className="bi bi-check2-circle text-primary f-50"></i>
            </center>
            <br />
            <br />

          </Modal.Body>
          <Modal.Footer>

            <Button variant="primary" onClick={handleClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Home;
