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
import regular from "../imgs/regular.png";
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
import dadosEmpresas from "../model/empresas";

const Descontos = ({ cart, nomee, emaill }) => {
  const { user, handleLogout } = useContext(UserContext);
  document.title = `Cupons & Descontos  | Reputação 360`;

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
    <div className="w-100">
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
          <h2 className="f-reg">
            Cupons de Desconto em mais de{" "}
            <b className="text-success">1500 empresas</b>!
          </h2>
          <div className="container">
            <span className="f-16 container">
              Economize aproveitando ofertas, promoções e cupons de empresas
              confiáveis
            </span>
            <br />
          </div>
        </center>
        <br />

        <br />
        <div className="container">
          <div className="lista-lojas container lista-descontos">
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {/* <div className="card-loja text-center rounded-1 border-lightt p-3 shadow-sm">
                <img src={arreiou} alt="" className="logo-empresa" />
                <div className="bod">
                  <br />
                  <AbreviarTexto texto={"Arreiou Ta Barato"} largura={"200"} />

                  <p className="d-flex justify-content-center mt-1 my-auto gap-2 f-14">
                    <img src={r360} className="icon-empresa" alt="" />
                    <span className="my-auto text-secondary">R360</span>
                  </p>
                  <button className="btn mt-2 btn-sm btn-outline-success">
                    Acessar <i className="bi bi-arrow-right-short"></i>
                  </button>
                </div>
              </div>
              */}

                  
                       {dadosEmpresas.map((empresa) => (
                          <div  key={empresa.id}
                          className="card-loja text-center rounded-1 border-lightt p-3 shadow-sm">
                          <img src={empresa.logo} alt="" className="logo-empresa" />
                          <div className="bod">
                            <br />
                            <AbreviarTexto texto={empresa.nomeEmpresa} largura={"200"} />
          
                            <p className="d-flex justify-content-center mt-1 my-auto gap-2 f-14">
                                
                                  {empresa.avaliacao >= 5.0 &&
                              empresa.avaliacao <= 6.9 ? (
                                <img
                                  src={regular}
                                  alt=""
                                  className="icon-empresa"
                                />
                              ) : empresa.avaliacao >= 7.0 &&
                                empresa.avaliacao <= 10.0 ? (
                                <img
                                  src={otimo}
                                  alt=""
                                  className="icon-empresa"
                                />
                              ) : empresa.avaliacao >= 3.0 &&
                                empresa.avaliacao <= 4.9 ? (
                                <img
                                  src={ruim}
                                  alt=""
                                  className="icon-empresa"
                                />
                              ) : empresa.avaliacao <= 2.9 ? (
                                <img
                                  src={naorecomendado}
                                  alt=""
                                  className="icon-empresa"
                                />
                              ) : null}
                              {empresa.avaliacao >= 5.0 &&
                              empresa.avaliacao <= 6.9 ? (
                                <b className="my-auto f-12 text-secondary">
                                  REGULAR
                                </b>
                              ) : empresa.avaliacao >= 7.0 &&
                                empresa.avaliacao <= 10.0 ? (
                                <b className="my-auto f-12 text-secondary">ÓTIMO</b>
                              ) : empresa.avaliacao >= 3.0 &&
                                empresa.avaliacao <= 4.9 ? (
                                <b className="my-auto f-12 text-secondary">
                                  RUÍM
                                </b>
                              ) : empresa.avaliacao <= 2.9 ? (
                                <AbreviarTexto className="my-auto f-12 text-secondary"  texto={'NÃO RECOMENDADO'} largura={90}/>
                                  
                              ) : (
                                <b className="my-auto f-12 text-secondary">
                                  SEM DADOS{" "}
                                </b>
                              )}
                            </p>
                            <a href={`https://${empresa.siteEmpresa}`} className="btn mt-2 btn-sm btn-outline-success">
                              Acessar <i className="bi bi-arrow-right-short"></i>
                            </a>
                          </div>
                        </div>
                       
                        // <div
                        //   key={empresa.id}
                         
                        //   className="card-loja text-decoration-none text-dark text-center rounded-1 border-lightt p-3 shadow-sm"
                        // >
                        //   <img
                        //     src={empresa.logo}
                        //     alt=""
                        //     className="logo-empresa"
                        //   />
                        //   <div className="bod">
                        //     <AbreviarTexto
                        //       texto={empresa.nomeEmpresa}
                        //       largura={"200"}
                        //     />

                        //     <p className="d-flex justify-content-center mt-1 my-auto gap-2 f-12">
                        //       <AbreviarTexto
                        //         texto={empresa.enderecoEmpresa}
                        //         largura={"300"}
                        //         className="my-auto text-secondary"
                        //       ></AbreviarTexto>
                        //     </p>
                        //     <hr />

                        //     <div className="d-flex gap-2 justify-content-center">
                        //       {empresa.avaliacao >= 5.0 &&
                        //       empresa.avaliacao <= 6.9 ? (
                        //         <img
                        //           src={regular}
                        //           alt=""
                        //           className="icon-empresa"
                        //         />
                        //       ) : empresa.avaliacao >= 7.0 &&
                        //         empresa.avaliacao <= 10.0 ? (
                        //         <img
                        //           src={otimo}
                        //           alt=""
                        //           className="icon-empresa"
                        //         />
                        //       ) : empresa.avaliacao >= 3.0 &&
                        //         empresa.avaliacao <= 4.9 ? (
                        //         <img
                        //           src={ruim}
                        //           alt=""
                        //           className="icon-empresa"
                        //         />
                        //       ) : empresa.avaliacao <= 2.9 ? (
                        //         <img
                        //           src={naorecomendado}
                        //           alt=""
                        //           className="icon-empresa"
                        //         />
                        //       ) : null}
                        //       <h4 className="f-reg my-auto">
                        //         <b>{empresa.avaliacao} </b>
                        //       </h4>
                        //       <span className="text-secondary f-12 mt-auto">
                        //         / 10
                        //       </span>
                        //     </div>
                        //   </div>
                        // </div>
                      ))}
            </div>
          </div>
        </div>

        <br />

        <div className="publicidade text-white bg-secondary my-3 py-5 text-center">
          <br />
          <h5>Publicidade</h5>

          <br />
        </div>

        <br />

        <br />

        <Footer />
      </div>
    </div>
  );
};

export default Descontos;
