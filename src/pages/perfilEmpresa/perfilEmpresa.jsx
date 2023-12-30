import "../../App.css";
// Bootstrap CSS
import { Modal, Button, ProgressBar } from "react-bootstrap";
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
import { NavLink, useParams } from "react-router-dom";
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
import regular from "../../imgs/regular.png";
import AbreviarTexto from "../../components/abreviarTexto";
import dadosEmpresas from "../../model/empresas";
import ScrollToTopLink from "../../components/scrollTopLink";
import Reclamacoes from "../../model/reclamacoes";

const PerfilEmpresa = ({ cart, nomee, emaill }) => {
  const { user, handleLogout } = useContext(UserContext);

  const { empresaid } = useParams();

  const empres = dadosEmpresas.filter((p) => p.id == empresaid);
  const empresaEscolhida = empres[0];
  console.log(empresaEscolhida);

  const rec = Reclamacoes.filter((p) => p.empresaid == empresaid);
  const reclamacoesEmpresa = rec;
  console.log(reclamacoesEmpresa);

  document.title = `Empresa ${empresaEscolhida.nome} | Reputação 360`;

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
    backgroundImage: `url(${empresaEscolhida.banner})`,
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

  // Mapeia a nota da empresa para a largura da barra de progresso
  const larguraProgressBar = (empresaEscolhida.avaliacao / 10) * 100;

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
          <img src={empresaEscolhida.logo} alt="" />
        </div>
      </div>
      <div className=" bg-white border-bb">
        <div className="dados-empresa mt-4 py-3 mt-md-0 container">
          <div className="row">
            <div className="col-12 col-md-2"></div>
            <div className="col-12 col-md-8">
              <b className="f-20 f-reg">{empresaEscolhida.nome}</b>
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
              <ScrollToTopLink
                to={`/pt/reclamar/${empresaEscolhida.id}`}
                className="btn btn-danger m-auto rec-b  gap-2 d-flex"
              >
                <i className="bi bi-megaphone"></i> Reclamar
              </ScrollToTopLink>
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
          <div className="col-12 col-sm-6 col-lg-3 my-3">
            <h6 className="f-reg">
              <b>{empresaEscolhida.nome} é confiável ?</b>
            </h6>

            <br />
            <div className="card-sobre-empresa border-1 bg-white ">
              <div className="p-3">
                <b className="text-dark m-3 f-reg">Reputação</b>
              </div>

              <div className="aval ">
                <div
                  className={` p-4 ${
                    empresaEscolhida.avaliacao >= 5.0 &&
                    empresaEscolhida.avaliacao <= 6.9
                      ? "regular"
                      : ""
                  } ${
                    empresaEscolhida.avaliacao >= 7.0 &&
                    empresaEscolhida.avaliacao <= 10.0
                      ? "otimo"
                      : ""
                  } ${
                    empresaEscolhida.avaliacao >= 3.0 &&
                    empresaEscolhida.avaliacao <= 4.9
                      ? "pessimo"
                      : ""
                  }  ${
                    empresaEscolhida.avaliacao <= 2.9 ? "nao-recomendado" : ""
                  } `}
                >
                  <div className="d-flex">
                    {empresaEscolhida.avaliacao >= 5.0 &&
                    empresaEscolhida.avaliacao <= 6.9 ? (
                      <img src={regular} alt="" className="logo-reputacao" />
                    ) : empresaEscolhida.avaliacao >= 7.0 &&
                      empresaEscolhida.avaliacao <= 10.0 ? (
                      <img src={otimo} alt="" className="logo-reputacao" />
                    ) : empresaEscolhida.avaliacao >= 3.0 &&
                      empresaEscolhida.avaliacao <= 4.9 ? (
                      <img src={ruim} alt="" className="logo-reputacao" />
                    ) : empresaEscolhida.avaliacao <= 2.9 ? (
                      <img
                        src={naorecomendado}
                        alt=""
                        className="logo-reputacao"
                      />
                    ) : null}

                    <div className="container">
                      <h5>
                        {empresaEscolhida.avaliacao >= 5.0 &&
                        empresaEscolhida.avaliacao <= 6.9 ? (
                          <b className="f-reg">REGULAR</b>
                        ) : empresaEscolhida.avaliacao >= 7.0 &&
                          empresaEscolhida.avaliacao <= 10.0 ? (
                          <b className="f-reg">ÓTIMO</b>
                        ) : empresaEscolhida.avaliacao >= 3.0 &&
                          empresaEscolhida.avaliacao <= 4.9 ? (
                          <b className="f-reg">RUÍM</b>
                        ) : empresaEscolhida.avaliacao <= 2.9 ? (
                          <b className="f-reg">NÃO RECOMENDADO</b>
                        ) : (
                          <b className="f-reg">SEM DADOS </b>
                        )}
                      </h5>
                      <div className="d-flex gap-2">
                        <h2 className="f-reg">{empresaEscolhida.avaliacao}</h2>
                        <span className="my-auto text-secondary"> / 10</span>
                      </div>
                    </div>
                  </div>
                  <div className="mx-auto my-2 border-1 rounded-1 text-center bg-white p-3">
                    <span className="f-12">Reclamações</span>
                    <b className="d-flex gap-2 f-reg mx-auto justify-content-center">
                      <i className="bi bi-megaphone"></i> 3496
                    </b>
                  </div>
                  {empresaEscolhida.avaliacao <= 2.9 && (
                    <>
                      <hr />
                      <div className="d-flex gap-2">
                        <i className="bi f-reg bi-exclamation-circle"></i>
                        <p>
                          A empresa se enquadra como Não Recomendada pois não
                          responde a pelo menos 50% das reclamações recebidas no
                          Reputação 360.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <br />
              <div className="p-3">
                <b className="f-re">Voltariam a fazer negócios</b>
                <br />
                <div className="d-flex mt-2 gap-2">
                  <div
                    className="progress my-auto w-100"
                    role="progressbar"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar bg-success"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <span className="f-reg my-auto">60%</span>
                </div>
              </div>

              <div className="p-3">
                <b className="f-re">Nota de consumidores</b>
                <br />
                <div className="d-flex mt-2 gap-2">
                  <div
                    className="progress my-auto w-100"
                    role="progressbar"
                    aria-valuenow={larguraProgressBar}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className={`progress-bar ${
                        empresaEscolhida.avaliacao <= 4
                          ? "bg-danger"
                          : empresaEscolhida.avaliacao >= 5.0 &&
                            empresaEscolhida.avaliacao <= 6.9
                          ? "bg-warning"
                          : "bg-success"
                      } `}
                      style={{ width: `${larguraProgressBar}%` }}
                    ></div>
                  </div>
                  <span className="f-reg my-auto">
                    {empresaEscolhida.avaliacao}
                  </span>
                </div>
              </div>
            </div>
            <br />
            <div className="quem-viu-md">
              <br />
              <hr />
              <br />

              <br />
              <div className="card-sobre-empresa border-1 bg-white p-3">
                <b className="text-dark f-reg">
                  Quem viu {empresaEscolhida.nome} também viu:
                </b>
                <br />
                <br />

                <div className="listas-lojas mb-3  d-flex gap-3 overflow-x-auto listas-descontos">
                  {dadosEmpresas.map((empresa) => (
                    <a
                      key={empresa.id}
                      href={`/pt/empresa/${empresa.id}`}
                      className="card-loja text-decoration-none text-dark text-center rounded-1 border-lightt p-3 shadow-sm"
                    >
                      <img src={empresa.logo} alt="" className="logo-empresa" />
                      <div className="bod">
                        <AbreviarTexto texto={empresa.nome} largura={"200"} />

                        <p className="d-flex justify-content-center mt-1 my-auto gap-2 f-12">
                          <AbreviarTexto
                            texto={empresa.localizacao}
                            largura={"300"}
                            className="my-auto text-secondary"
                          ></AbreviarTexto>
                        </p>
                        <hr />

                        <div className="d-flex gap-2 justify-content-center">
                          {empresa.avaliacao >= 5.0 &&
                          empresa.avaliacao <= 6.9 ? (
                            <img
                              src={regular}
                              alt=""
                              className="icon-empresa"
                            />
                          ) : empresa.avaliacao >= 7.0 &&
                            empresa.avaliacao <= 10.0 ? (
                            <img src={otimo} alt="" className="icon-empresa" />
                          ) : empresa.avaliacao >= 3.0 &&
                            empresa.avaliacao <= 4.9 ? (
                            <img src={ruim} alt="" className="icon-empresa" />
                          ) : empresa.avaliacao <= 2.9 ? (
                            <img
                              src={naorecomendado}
                              alt=""
                              className="icon-empresa"
                            />
                          ) : null}
                          <h4 className="f-reg my-auto">
                            <b>{empresa.avaliacao} </b>
                          </h4>
                          <span className="text-secondary f-12 mt-auto">
                            / 10
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <br />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-6 my-3">
            <h6 className="f-reg">
              <b>O que estão falando sobre {empresaEscolhida.nome} </b>
            </h6>

            <br />
            <div className="card-sobre-empresa border-1 bg-white p-3">
              <b className="text-dark f-reg">Reclamações de clientes </b>

              {/* O que estao falando desta empresa, card */}
              {reclamacoesEmpresa.map((reclamacao) => (
                <>
                  <div className="p-3 bg-light my-3 border- rounded-2">
                    <a href="#" className="text-decoration-none f-16">
                      {reclamacao.assunto}
                    </a>
                    <p className="text-secondary mt-2">
                      {reclamacao.reclamacao}
                    </p>
                    <div className="d-flex gap-3 justiify-content-start">
                      <div
                        className={`d-flex my-auto gap-2 ${
                          reclamacao.status == "respondido"
                            ? " bg-success"
                            : " bg-danger"
                        } w-auto rounded-pill px-3 py-1 text-white `}
                      >
                        {reclamacao.status == "respondido" ? (
                          <>
                            <i className="bi bi-emoji-laughing"></i> Respondido
                          </>
                        ) : (
                          <>
                            <i className="bi bi-emoji-frown"></i> Não respondido
                          </>
                        )}
                      </div>
                      <span className="text-secondary my-auto">Há 7h</span>
                    </div>
                  </div>
                </>
              ))}

              {reclamacoesEmpresa.lenght}

              <center>
                {reclamacoesEmpresa == "" && (
                  <>
                    <br />
                    <br />
                    <br />
                    <i className="bi bi-megaphone"></i> <br />
                    <span className="text-secondary">
                      Sem reclamações ou avaliações{" "}
                    </span>

                    <br />
                    <br />
                  </>
                )}
              </center>
            </div>
            <br />
            <br />

            <div className="publicidade text-white bg-secondary my-3 py-5 text-center">
              <br />
              <br />
              <br />
              <br />
              <h5>Publicidade</h5>

              <br />
              <br />
              <br />
              <br />
            </div>
            <br />
          </div>
          <div className="col-12 col-sm-6 col-lg-3 my-3">
            <h6 className="f-reg">
              <b>Veja mais informações sobre {empresaEscolhida.nome}</b>
            </h6>
            <br />
            <div className="card-sobre-empresa border-1 bg-white p-3">
              <b className="text-dark f-reg">Sobre</b>

              <p className="text-secondary f-14">{empresaEscolhida.sobre}</p>
              <b>
                NIF: <b className="text-success">{empresaEscolhida.nif}</b>{" "}
              </b>
              <center className="mt-2">
                <span className="text-secondary f-12">
                  Informações cadastradas pela empresa
                </span>
              </center>
              <hr />
              <center>
                <span className="d-flex gap-2 justify-content-center  f-14">
                  <i className="bi bi-calendar"></i> Cadastrado há 2 anos{" "}
                </span>
              </center>
            </div>
            <br />

            <div className="card-sobre-empresa border-1 bg-white p-3">
              <b className="text-dark f-reg">Informações de contacto</b>
              <br />
              <br />
              <b>Site:</b>
              <h5 className="p-2 info-empresa bg-light rounded-2 text-decoration-none">
                {" "}
                <a
                  className=" text-decoration-none"
                  href={`https://${empresaEscolhida.site}`}
                >
                  {empresaEscolhida.site}
                </a>
              </h5>

              <br />
              <b>Whatsapp:</b>
              <h5 className="p-2 info-empresa bg-light rounded-2 text-decoration-none">
                {" "}
                <a
                  className=" text-decoration-none"
                  href={"tel:" + empresaEscolhida.whatsapp}
                >
                  {empresaEscolhida.whatsapp}
                </a>
              </h5>

              <hr />
              <center>
                <span className="d-flex gap-3 justify-content-center  f-14">
                  <a href={"https://facebook.com/" + empresaEscolhida.fb}>
                    {" "}
                    <i className="bi bi-facebook f-20"></i>{" "}
                  </a>
                  <a href={"https://instagram.com/" + empresaEscolhida.insta}>
                    {" "}
                    <i className="bi bi-instagram f-20"></i>{" "}
                  </a>
                  <a href={"https://youtube.com/" + empresaEscolhida.fb}>
                    {" "}
                    <i className="bi bi-youtube f-20"></i>{" "}
                  </a>
                </span>
              </center>
            </div>

            <div className="quem-viu-sm">
              <br />
              <hr />
              <br />

              <br />
              <div className="card-sobre-empresa border-1 bg-white p-3">
                <b className="text-dark f-reg">
                  Quem viu {empresaEscolhida.nome} também viu:
                </b>
                <br />
                <br />

                <div className="listas-lojas mb-3  d-flex gap-3 overflow-x-auto listas-descontos">
                  {dadosEmpresas.map((empresa) => (
                    <a
                      key={empresa.id}
                      href={`/pt/empresa/${empresa.id}`}
                      className="card-loja text-decoration-none text-dark text-center rounded-1 border-lightt p-3 shadow-sm"
                    >
                      <img src={empresa.logo} alt="" className="logo-empresa" />
                      <div className="bod">
                        <AbreviarTexto texto={empresa.nome} largura={"200"} />

                        <p className="d-flex justify-content-center mt-1 my-auto gap-2 f-12">
                          <AbreviarTexto
                            texto={empresa.localizacao}
                            largura={"300"}
                            className="my-auto text-secondary"
                          ></AbreviarTexto>
                        </p>
                        <hr />

                        <div className="d-flex gap-2 justify-content-center">
                          {empresa.avaliacao >= 5.0 &&
                          empresa.avaliacao <= 6.9 ? (
                            <img
                              src={regular}
                              alt=""
                              className="icon-empresa"
                            />
                          ) : empresa.avaliacao >= 7.0 &&
                            empresa.avaliacao <= 10.0 ? (
                            <img src={otimo} alt="" className="icon-empresa" />
                          ) : empresa.avaliacao >= 3.0 &&
                            empresa.avaliacao <= 4.9 ? (
                            <img src={ruim} alt="" className="icon-empresa" />
                          ) : empresa.avaliacao <= 2.9 ? (
                            <img
                              src={naorecomendado}
                              alt=""
                              className="icon-empresa"
                            />
                          ) : null}
                          <h4 className="f-reg my-auto">
                            <b>{empresa.avaliacao} </b>
                          </h4>
                          <span className="text-secondary f-12 mt-auto">
                            / 10
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <br />
            </div>
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
