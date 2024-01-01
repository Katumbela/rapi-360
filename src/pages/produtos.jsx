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
import notFound from "../imgs/not-found.png";
import regular from "../imgs/regular.png";
import eletronica from "../imgs/eletronica.jpeg";
import a1 from "../imgs/anims/a1.jpg";
import a2 from "../imgs/anims/a2.jpg";
import a3 from "../imgs/anims/a3.jpg";
import { Fade } from "react-awesome-reveal";
import "../css/ranking.css";
import video from "../video/av1.mp4";
import BodyHome from "../components/corpo_home/body_home";
import Navba from "../components/nav";

import bom from "../imgs/bom.png";
import mau from "../imgs/mau.png";
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
import banp from "../imgs/ban-products.png";
import desconto from "../imgs/descontos.webp";
import desc from "../imgs/desc.png";
import blog from "../imgs/blog.png";
import b1 from "../imgs/blog/1.png";
import b2 from "../imgs/blog/2.png";
import b3 from "../imgs/blog/3.png";
import b4 from "../imgs/blog/4.png";
import africa from "../imgs/africa.png";
import AbreviarTexto from "../components/abreviarTexto";
import dadosEmpresas from "../model/empresas";
import ScrollToTopLink from "../components/scrollTopLink";

// Produtos

import bp from "../imgs/logo-bp.png";
import lc from "../imgs/logo-customer.png";
import ads from "../imgs/logo-ads.png";
import ed from "../imgs/logo-eduka.png";
import api from "../imgs/logo-api.png";

const Produtos = ({ cart, nomee, emaill }) => {
  const { user, handleLogout } = useContext(UserContext);
  document.title = `Soluções para empresas | Reputação 360`;

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
  }, []);

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
    <div className="w-100">
      {/*  */}
      {/* <Navba/> */}
      <Header
        style={{ marginBottom: "5rem" }}
        nomee={nomee}
        emaill={emaill}
        cart={cart}
      />

      <div className="s l">
        <div className="desconto container">
          <div className="row flex-row-reverse">
            <div className="col-12 imm col-md-6">
              <img src={banp} alt="" className=" my-auto -100" />
            </div>
            <div className="col-12 tt col-md-6">
              <div className="my-auto">
                <h1 className="fw-bold f-reg">
                  Esteja presente em toda a jornada do seu cliente
                </h1>

                <span className="f-18">
                  <b>
                    {" "}
                    Todo mundo pesquisa antes de comprar, inclusive quem compra
                    da sua empresa!
                  </b>{" "}
                  Saiba como o Reputa 360 pode ajudar a sua empresa a gerar
                  mais credibilidade, confiança e ter uma boa reputação online.
                </span>

                <br />
                <br />
                <a
                  
                  href={"#solucoes"}
                  className="btn rounded-1  btn-outline-success"
                >
                  Veja nossas soluções
                </a>
              </div>
            </div>
          </div>
        </div>
        <br />

        <br />

        <div itemID="solucoes" id="solucoes" className=" bg-light my-3 py-5 text-center">
          <h2 className="f-reg">Soluções do Reputa 360 para empresas</h2>
          <br />
          <br />
          <div className="lista-solucoes flex-wrap d-flex gap-5 justify-content-center text-start">
            <div className="card-solucao">
              <center>
                <img src={bp} alt="" />
              </center>
              <br />
              <ul>
                <li>
                  <i className="bi bi-check text-success f-22"></i>
                  Tenha o selo de verificação do Reputa 360
                </li>
                <li>
                  <i className="bi bi-check text-success f-22"></i>
                  Gere confiança e credibilidade para quem busca pela sua
                  empresa
                </li>
                <li>
                  <i className="bi bi-check text-success f-22"></i>
                  Personalize a página com sua identidade
                </li>
              </ul>
              <br />
              <center>
                <button className="btn btn-primary disable" disabled>
                  {" "}
                  Indisponível
                </button>
              </center>
            </div>
            <div className="card-solucao">
              <center>
                <img src={lc} alt="" />
              </center>
              <br />
              <ul>
                <li>
                  <i className="bi bi-check text-success f-22"></i>
                  Ganhe mais agilidade e economia com uma gestão centralizada
                </li>
                <li>
                  <i className="bi bi-check text-success f-22"></i>
                  Gerencie o Reputa 360, redes sociais e outros canais
                </li>
                <li>
                  <i className="bi bi-check text-success f-22"></i>
                  Gere relatórios personalizados e automatize os fluxos de
                  atendimento
                </li>
              </ul>
              <br />
              <center>
                <button className="btn btn-primary disable" disabled>
                  {" "}
                  Indisponível
                </button>
              </center>
            </div>
            <div className="card-solucao">
              <center>
                <img src={api} alt="" />
              </center>
              <br />
              <ul>
                <li>
                  <i className="bi bi-check text-success f-22"></i>
                  Responda o Reputa 360 com sua ferramenta de CRM
                </li>
                <li>
                  <i className="bi bi-check text-success f-22"></i>
                  Otimize seu atendimento
                </li>
                <li>
                  <i className="bi bi-check text-success f-22"></i>
                  Integre as reclamações e clientes ao seu sistema
                </li>
              </ul>
              <br />
              <center>
                <button className="btn btn-primary disable" disabled>
                  {" "}
                  Indisponível
                </button>
              </center>
            </div>
            <div className="card-solucao">
              <center>
                <img src={ads} alt="" />
              </center>
              <br />
              <ul>
                <li>
                  <i className="bi bi-check text-success f-22"></i>
                  Apareça para quem está buscando por seu produto ou serviço


                </li>
                <li>
                  <i className="bi bi-check text-success f-22"></i>
                  Aumente a visibilidade da sua empresa
                </li>
                <li>
                  <i className="bi bi-check text-success f-22"></i>
                  Oportunidade para estabelecer confiança e credibilidade
                </li>
              </ul>
              <br />
              <center>
                <button className="btn btn-primary disable" disabled>
                  {" "}
                  Indisponível
                </button>
              </center>
            </div>
            <div className="card-solucao">
              <center>
                <img src={ed} alt="" />
              </center>
              <br />
              <ul>
                <li>
                  <i className="bi bi-check text-success f-22"></i>
                  Conhecimento 100% focado em confiança, reputação e atendimento de excelência.
                </li>
                <li>
                  <i className="bi bi-check text-success f-22"></i>
                  Aprenda sobre reputação, confiança e Reputa 360 com o R360 Educa!
                </li>
              </ul>
              <br />
              <center>
                <button className="btn btn-primary disable" disabled>
                  {" "}
                  Indisponível
                </button>
              </center>
            </div>
          </div>
          <br />
        </div>

        <br />

        <Footer />
      </div>
    </div>
  );
};

export default Produtos;
