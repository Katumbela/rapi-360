import "../../App.css";
// Bootstrap CSS
import { Modal, Button } from "react-bootstrap";
// Bootstrap Bundle JS
import logo from "../../imgs/icone.png";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Banners from "../../components/banners";
import Banner from "../../components/banner/banner";
import CookieConsent from "react-cookie-consent";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../userContext";
import firebase from "firebase/compat/app";
import { db } from "../firebase";
import okupa from "../../imgs/arobot.png";
import axios from "axios";
import { NavLink } from "react-router-dom";
import v1 from "../../imgs/anims/av1.mp4";
import peq_eng from "../../imgs/banner-p.png";
import arduino from "../../imgs/arduino.jpeg";
import eletronica from "../../imgs/eletronica.jpeg";
import a1 from "../../imgs/anims/a1.jpg";
import a2 from "../../imgs/anims/a2.jpg";
import a3 from "../../imgs/anims/a3.jpg";
import { Fade } from "react-awesome-reveal";
import "../../css/ranking.css";
import video from "../../video/av1.mp4";
import BodyHome from "../../components/corpo_home/body_home";
import Navba from "../../components/nav";

import bom from "../../imgs/bom.png";
import mau from "../../imgs/mau.png";
import arreiou from "../../imgs/arreiou.jpeg";
import bomm from "../../imgs/bomm.webp";
import maxi from "../../imgs/maxi.png";
import naorecomendado from "../../imgs/naorecomendado.webp";
import otimo from "../../imgs/otimo.webp";
import xyami from "../../imgs/xyami.jpeg";
import shoprite from "../../imgs/shoprite.jpeg";
import "./style.css";
import unitel from "../../imgs/unitel.png";
import r360 from "../../imgs/r360.png";
import ruim from "../../imgs/ruim.webp";
import icon from "../../imgs/icon.png";
import desconto from "../../imgs/descontos.webp";
import desc from "../../imgs/desc.png";
import blog from "../../imgs/blog.png";
import b1 from "../../imgs/blog/1.png";
import bannerUnitel from "../../imgs/banner_unitel.png";
import b2 from "../../imgs/blog/2.png";
import b3 from "../../imgs/blog/3.png";
import b4 from "../../imgs/blog/4.png";
import africa from "../../imgs/africa.png";
import AbreviarTexto from "../../components/abreviarTexto";

const PerfilEmpresa = ({ cart, nomee, emaill }) => {
  const { user, handleLogout } = useContext(UserContext);
  document.title = `Empresa Unitel Perfil | Reputação 360`;

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
    backgroundImage: `url(${bannerUnitel})`,
    backgroundSize: "100% auto",
    backgroundPosition: "center center",
    // filter: "brightness(75%)",
    position: "relative",
    height: "12rem",
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

      <div className="banner_perfil l" style={backgroundStyle}>
        <div className="foto-perfil-empresa">
          <img src={unitel} alt="" />
        </div>
      </div>
      <div className=" bg-white border-bb">
        <div className="dados-empresa mt-4 py-3 mt-md-0 container">
          <div className="row">
            <div className="col-12 col-md-2"></div>
            <div className="col-12 col-md-8">
              <b className="f-20 f-reg">UNITEL SA</b>
              <br />
              <div className="d-flex gap-4 f-14 mt-2 flex-wrap">
                <p className="d-flex text-secondary gap-2">
                  <i className="bi bi-calendar"></i> Há 3 anos no <b>R360</b>
                </p>
                <p className="d-flex text-secondary gap-2">
                  <i className="bi bi-eye-fill"></i> +340 mil visualizações
                </p>
              </div>
            </div>
            <div className="col-12 text-center-md d-flex mt-3 mt-md-auto col-md-2">
              <button className="btn btn-danger m-auto  gap-2 d-flex">
                <i className="bi bi-megaphone"></i> Reclamar
              </button>
            </div>
          </div>
        </div>
        <div className="opcoes bg-white border-b-t py-2">
          <div className="d-flex justify-content-center my-auto gap-4 overflow-x-auto">
            <p className="text-primary gap-2 d-flex">
              <i className="bi bi-house"></i>Pagina Inicial
            </p>
            <p className="text-secondary gap-2 d-flex">
              <i className="bi bi-megaphone"></i>Reclamações
            </p>
            <p className="text-secondary gap-2 d-flex">
              <i className="bi bi-file-earmark-person"></i>Sobre
            </p>
          </div>
        </div>
      </div>

<br />
<br />
      <div className="tabela-infoo container-fluid">
        <div className="row">
            <div className="col-12 col-sm-6 col-lg-4 my-3">
                <h5 className="f-reg"><b>UNITEL SA é confiável ?</b></h5>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 my-3">
                <h5 className="f-reg"><b>O que estão falando sobre UNITEL SA </b></h5>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 my-3">
                <h5 className="f-reg"><b>Veja mais informações sobre UNITEL SA</b></h5>
            </div>
        </div>
      </div>

      <div className="s">
        <div className="publicidade text-white bg-secondary my-3 py-5 text-center">
          <br />
          <h5>Publicidade</h5>

          <br />
        </div>

        <br />

        <Footer />
      </div>
    </div>
  );
};

export default PerfilEmpresa;
