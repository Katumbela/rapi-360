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

const Ranking = ({ cart, nomee, emaill }) => {
  const { user, handleLogout } = useContext(UserContext);
  document.title = `Pagina Inicial | Reputação 360`;

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
          <h2 className="f-reg">Rankings</h2>
          <div className="container">
            <span className="f-16 container">
              Quer saber quais as empresas com melhor índice de solução ou as
              organizações mais reclamadas dos últimos 30 dias ou até mesmo dos
              últimos 6 meses? Tudo isso você pode encontrar aqui!
            </span>
            <br />
            <br />
            <span className="text-secondary f-14">
              A partir da avaliação que o consumidor dá para a organização nós
              construímos o nosso Ranking e, assim, ajudamos pessoas que querem
              analisar como está a situação das empresas no site, qual sua
              colocação e descobrir como vai o seu atendimento.
            </span>
          </div>
        </center>
        <br />

        <div className="publicidade text-white bg-secondary my-3 py-5 text-center">
          <br />
          <h5>Publicidade</h5>

          <br />
        </div>

        <br />

        <div className="listas-ranking container">
          <div className="row">
            <div className="col-12 my-3 col-md-6 col-lg-4">
              <div className="card-ranking  shadow-sm rounded-1 p-4">
                <div className="headd ">
                  <b className="f-reg ">Melhor índice de solução</b>
                  <br />
                  <span className="text-secondary">26/12/2023</span>
                </div>
                <br />
                <div className="boddy">
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">1º</b>
                      <img
                        src={r360}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">2º</b>
                      <img
                        src={r360}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">3º</b>
                      <img
                        src={r360}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">4º</b>
                      <img
                        src={r360}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">5º</b>
                      <img
                        src={r360}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 my-3 col-md-6 col-lg-4">
              <div className="card-ranking  shadow-sm rounded-1 p-4">
                <div className="headd ">
                  <b className="f-reg ">Melhores Índices de Voltar a Fazer Negócios</b>
                  <br />
                  <span className="text-secondary">26/12/2023</span>
                </div>
                <br />
                <div className="boddy">
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">1º</b>
                      <img
                        src={r360}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">2º</b>
                      <img
                        src={r360}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">3º</b>
                      <img
                        src={r360}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">4º</b>
                      <img
                        src={r360}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">5º</b>
                      <img
                        src={r360}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 my-3 col-md-6 col-lg-4">
              <div className="card-ranking  shadow-sm rounded-1 p-4">
                <div className="headd ">
                  <b className="f-reg ">Melhores notas médias</b>
                  <br />
                  <span className="text-secondary">26/12/2023</span>
                </div>
                <br />
                <div className="boddy">
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">1º</b>
                      <img
                        src={r360}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>8.46</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">2º</b>
                      <img
                        src={r360}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>8.46</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">3º</b>
                      <img
                        src={r360}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>8.46</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">4º</b>
                      <img
                        src={r360}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>8.46</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">5º</b>
                      <img
                        src={r360}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>8.46</span>
                    </div>
                  </div>
                </div>
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

        <div className="row">
            <div className="col-12 my-3 col-md-6 col-lg-4">
              <div className="card-ranking  shadow-sm rounded-1 p-4">
                <div className="headd ">
                  <b className="f-reg ">Piores empresas nos ultimos 30 dias</b>
                  <br />
                  <span className="text-secondary">26/12/2023</span>
                </div>
                <br />
                <div className="boddy">
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">1º</b>
                      <img
                        src={naorecomendado}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">2º</b>
                      <img
                        src={naorecomendado}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">3º</b>
                      <img
                        src={naorecomendado}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">4º</b>
                      <img
                        src={ruim}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">5º</b>
                      <img
                        src={naorecomendado}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 my-3 col-md-6 col-lg-4">
              <div className="card-ranking  shadow-sm rounded-1 p-4">
                <div className="headd ">
                  <b className="f-reg ">Mais reclamadas nos últimos 6 meses</b>
                  <br />
                  <span className="text-secondary">26/12/2023</span>
                </div>
                <br />
                <div className="boddy">
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">1º</b>
                      <img
                        src={ruim}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">2º</b>
                      <img
                        src={ruim}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">3º</b>
                      <img
                        src={ruim}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">4º</b>
                      <img
                        src={r360}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    <div className="d-flex">
                      <b className="my-auto">5º</b>
                      <img
                        src={ruim}
                        className="icon-empresa my-auto mx-1"
                        alt=""
                      />
                      <div className="empresa my-auto">
                        <NavLink
                          to="/pt/empresax"
                          className={"text-decoration-none"}
                        >
                          <AbreviarTexto
                            texto={"Kero Nova vida"}
                            largura={"200"}
                          />
                        </NavLink>
                        <NavLink
                          className={"text-secondary f-12 text-decoration-none"}
                        >
                          Ver mais informações
                        </NavLink>
                      </div>
                    </div>
                    <div className="my-auto rate text-secondary f-14">
                      <span>100.0 %</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         
          </div>



        </div>
        <br />
        <br />

        <Footer />
      </div>
    </div>
  );
};

export default Ranking;
