import "../App.css";
// Bootstrap CSS
import { Modal, Button } from "react-bootstrap";
// Bootstrap Bundle JS
import logo from "../imgs/icone.png";
import Header from "../components/header";
import Footer from "../components/footer";
import Banners from "../components/banners";
import Banner from "../components/banner/banner";
import CookieConsent from "react-cookie-consent";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./userContext";
import firebase from "firebase/compat/app";
import { db } from "./firebase";
import okupa from "../imgs/arobot.png";
import axios from "axios";
import { NavLink } from "react-router-dom";
import v1 from "../imgs/anims/av1.mp4";
import peq_eng from "../imgs/banner-p.png";
import arduino from "../imgs/arduino.jpeg";
import eletronica from "../imgs/eletronica.jpeg";
import a1 from "../imgs/anims/a1.jpg";
import a2 from "../imgs/anims/a2.jpg";
import a3 from "../imgs/anims/a3.jpg";
import { Fade } from "react-awesome-reveal";
import "../css/ranking.css";
import video from "../video/av1.mp4";
import BodyHome from "../components/corpo_home/body_home";
import Navba from "../components/nav";

import userSignup from "../imgs/user-signup.png";
import company from "../imgs/company.png";
import arreiou from "../imgs/arreiou.jpeg";
import bomm from "../imgs/bomm.webp";
import maxi from "../imgs/maxi.png";
import naorecomendado from "../imgs/naorecomendado.webp";
import otimo from "../imgs/otimo.webp";
import xyami from "../imgs/xyami.jpeg";
import shoprite from "../imgs/shoprite.jpeg";
import unitel from "../imgs/unitel.png";
import r360 from "../imgs/r360.png";
import ruim from "../imgs/ruim.webp";
import icon from "../imgs/icon.png";
import desconto from "../imgs/descontos.webp";
import desc from "../imgs/desc.png";
import blog from "../imgs/blog.png";
import b1 from "../imgs/blog/1.png";
import b2 from "../imgs/blog/2.png";
import b3 from "../imgs/blog/3.png";
import b4 from "../imgs/blog/4.png";
import africa from "../imgs/africa.png";
import AbreviarTexto from "../components/abreviarTexto";
import Pub2 from "../components/publicidade2";

const Cadastro = ({ cart, nomee, emaill }) => {
  const { user, handleLogout } = useContext(UserContext);
  document.title = `Cadastre uma conta | Reputação 360`;

  useEffect(() => {
    // Adicione um listener para o estado da autenticação
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // Se não houver usuário autenticado, redirecione para a página de login

        const userData = {
          name: "",
          email: "",
          pictureUrl: "",
          tel: "",
          uid: "",
        };

        localStorage.setItem("users", JSON.stringify(userData));
      }
    });

    // Retorne uma função de limpeza para remover o listener quando o componente for desmontado
    return unsubscribe;
  }, []);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowModal(true);
      localStorage.setItem("hasVisited", true);
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
      const snapshot = await db
        .collection("players")
        .where("pontos", ">", 15)
        .orderBy("pontos", "desc")
        .limit(3)
        .get();
      const playerData = snapshot.docs.map((doc) => doc.data());
      setPlayers(playerData);
    } catch (error) {
      console.error("Erro ao buscar os jogadores:", error);
    }
  };

  const [use, setUser] = useState([]);

  useEffect(() => {
    // Obtém o valor de 'users' do local storage quando o componente for montado
    const userString = localStorage.getItem("users");
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
    } else {
      const userData = {
        name: "",
        email: "",
        pictureUrl: "",
        tel: "",
      };
      setUser(userData);
    }
  }, []);

  const [backgroundImage, setBackgroundImage] = useState(0);
  const images = ["a1.jpg", "a7.jpg", "a3.jpg"];

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
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(35%)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "70vh",
  };

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="w-100 bg-light">
      {/*  */}
      {/* <Navba/> */}
      <Header
        style={{ marginBottom: "5rem" }}
        nomee={nomee}
        emaill={emaill}
        cart={cart}
      />

      <div className="s">
        <br />
        <br />
        <center className="container">
          <h1 className="f-reg">
            <b>Olá, crie uma conta no Reputação 360</b>
          </h1>
          <div className="container">
            <span className="f-16 text-secondary container">
              Com você logado conseguimos oferecer um serviço melhor e mais
              personalizado.Navegue logado e ajude outros milhões de
              consumidores.
            </span>
            <br />
          </div>
        </center>
        <br />

        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-1 col-lg-2"></div>
            <div className="col-12 col-sm-5 col-lg-4 my-3">
              <div className="card-cadastro c-c-c bg-white p-4">
                <center>
                  <img src={userSignup} className="logo" alt="" />
                </center>
                <center>
                  <h3>
                    <b className="text-success">Sou consumidor</b>
                  </h3>

                  <p>
                    Faça seu cadastro e publique reclamações para as empresas e
                    ajude outros consumidores
                  </p>
                  <br />
                  <NavLink
                    to={"/pt/cadastro/consumidor"}
                    className="btn mt-auto btn-outline-success w-100 rounded-1"
                  >
                    Fazer cadastro
                  </NavLink>
                </center>
              </div>
            </div>
            <div className="col-12 col-sm-5 col-lg-4 my-3">
              <div className="card-cadastro c-c-e bg-white p-4">
                <center>
                  <img src={company} className="logo" alt="" />
                </center>
                <center>
                  <h3>
                    <b className="text-primary">Sou empresa</b>
                  </h3>

                  <p>
                    Cadastre sua empresa no Reputação 360. Responda suas
                    reclamações e trabalhe sua reputação, ou reclame de outras
                    empresas.
                  </p>
                  <br />
                  <NavLink
                    to={"/pt/cadastro/empresa"}
                    className="btn btn-primary w-100 rounded-1"
                  >
                    Conheça as soluções
                  </NavLink>
                </center>
              </div>
            </div>

            <div className="col-12 col-sm-1  col-lg-2"></div>
          </div>
        </div>

        <br />

        <Pub2 />

        <br />

        <br />

        <Footer />
      </div>
    </div>
  );
};

export default Cadastro;
