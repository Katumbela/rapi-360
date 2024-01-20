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
// import dadosEmpresas from "../../model/empresas";
import ScrollToTopLink from "../../components/scrollTopLink";
import Reclamacoes from "../../model/reclamacoes";
import obterDadosDoFirebase from "../../model/empresas2";
import EmpresaLoader from "../../components/empLoader";
import ProfileCard from "../../components/PerfilEmp";
import Comment from "../../components/skeletons/comment";
import ReclamacaoItem from "../../components/reclamacaoComponent/reclamacaoComponent";
import Pub from "../../components/publicidade";

const PerfilEmpresa = ({ cart, nomee, emaill }) => {
  const { user, handleLogout } = useContext(UserContext);

  const { empresaid } = useParams();

  const [empresaEscolhida, setEmpresaEscolhida] = useState(null);
  const [reclamacoesEmpresa, setReclamacoesEmpresa] = useState([]);

  useEffect(() => {
    const pegarEmpresa = async () => {
      try {
        const empresasRef = db.collection("empresa");
        const empresaSnapshot = await empresasRef.doc(empresaid).get();
        const empresaData = empresaSnapshot.data();

        if (empresaData) {
          setEmpresaEscolhida({
            id: empresaSnapshot.id,
            ...empresaData,
          });

          // Supondo que as reclamações estejam em uma coleção "reclamacoes"
          const reclamacoesRef = db.collection("reclamacoes");
          const reclamacoesSnapshot = await reclamacoesRef
            .where("empresaId", "==", empresaid)
            .get();

          try {
            const reclamacoesData = reclamacoesSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            setReclamacoesEmpresa(reclamacoesData);
          } catch (error) {
            console.error("Erro ao obter reclamações:", error.message);
          }
        } else {
          console.error("Empresa não encontrada.");
        }
      } catch (error) {
        console.error("Erro ao pegar empresa:", error.message);
      }
    };

    pegarEmpresa();
  }, [empresaid]);

  // Função para calcular a média das classificações
  const calcularMediaClassificacoes = () => {
    const totalClassificacoes = reclamacoesEmpresa.reduce(
      (total, reclamacao) => total + reclamacao.classificacao,
      0
    );

    const mediaClassificacoes =
      reclamacoesEmpresa.length > 0
        ? totalClassificacoes / reclamacoesEmpresa.length
        : 0;

    return mediaClassificacoes.toFixed(1);
  };

  const [reclamacoesRespondidas, setReclamacoesRespondidas] = useState(0);

  const calcularReclamacoesRespondidas = () => {
    return reclamacoesEmpresa.filter(
      (reclamacao) => reclamacao.status === "respondido"
    ).length;
  };

  useEffect(() => {
    if (empresaEscolhida && reclamacoesEmpresa.length > 0) {
      const novaAvaliacao = calcularMediaClassificacoes();

      // Adiciona a avaliação ao objeto empresaEscolhida
      setEmpresaEscolhida((prevEmpresa) => ({
        ...prevEmpresa,
        avaliacao: novaAvaliacao,
      }));

      // Obtém o número de reclamações respondidas
      const reclamacoesRespondidas = calcularReclamacoesRespondidas();

      // Atualiza o estado com o número de reclamações respondidas
      setReclamacoesRespondidas(reclamacoesRespondidas);
    }
  }, [reclamacoesEmpresa, empresaEscolhida]);

  const TotalReclamacoesRespondidas = () => {
    const totalReclamacoes = reclamacoesEmpresa.length;
    return ((reclamacoesRespondidas / totalReclamacoes) * 100).toFixed(1);
  };

  // const empres = dadosEmpresas.filter((p) => p.id === empresaid);
  // const empresaEscolhida = empres[0];
  // console.log(empresaEscolhida);

  // const rec = Reclamacoes.filter((p) => p.id == empresaid);
  // const reclamacoesEmpresa = rec;
  // console.log(reclamacoesEmpresa);

  document.title = `Empresa ${empresaEscolhida?.nomeEmpresa} | Reputação 360`;

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

  const [dadosEmpresas, setDadosEmpresas] = useState([]);

  useEffect(() => {
    const ordenarEmpresas = async () => {
      try {
        const dadosEmpresas = await obterDadosDoFirebase();

        setDadosEmpresas(dadosEmpresas);
      } catch (error) {
        console.error("Erro ao ordenar empresas:", error.message);
      }
    };

    ordenarEmpresas();
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
    backgroundImage: `url(${empresaEscolhida?.capa})`,
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
  const larguraProgressBar = (empresaEscolhida?.avaliacao / 10) * 100;

  // Função para calcular os percentuais de pessoas que solicitariam novamente e não solicitariam
  const calcularPercentuaisSolicitariamNovamente = () => {
    const totalReclamacoes = reclamacoesEmpresa.length;

    const solicitariamNovamente = reclamacoesEmpresa.filter(
      (reclamacao) => reclamacao.solicitarNovamente === "sim"
    ).length;

    const naoSolicitariamNovamente = reclamacoesEmpresa.filter(
      (reclamacao) => reclamacao.solicitarNovamente === "nao"
    ).length;

    const percentualSolicitariam =
      (solicitariamNovamente / totalReclamacoes) * 100;
    const percentualNaoSolicitariam =
      (naoSolicitariamNovamente / totalReclamacoes) * 100;

    return {
      percentualSolicitariam,
      percentualNaoSolicitariam,
    };
  };

  const mediaClassificacoes = calcularMediaClassificacoes();
  const percentuaisSolicitariam = calcularPercentuaisSolicitariamNovamente();
  
  const [reclamacoesParaExibir, setReclamacoesParaExibir] = useState(4);

  const handleVerMais = () => {
    setReclamacoesParaExibir((prevCount) => prevCount + 4);
  };

  const handleVerMenos = () => {
    setReclamacoesParaExibir((prevCount) => Math.max(prevCount - 4, 4));
  };


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
          <img src={empresaEscolhida?.logo} alt="" />
        </div>
      </div>
      <div className=" bg-white border-bb">
        <div className="dados-empresa mt-4 py-3 mt-md-0 container">
          <div className="row">
            <div className="col-12 col-md-2"></div>
            <div className="col-12 ps-md-4  pt-sm-0 col-md-8">
              {empresaEscolhida?.nomeEmpresa != null ? (
                <>
                  <b className="f-20 mt-5 f-reg">
                    {empresaEscolhida?.nomeEmpresa}
                  </b>
                  <div className="d-flex gap-4 f-14 mt-2 flex-wrap">
                    <p className="d-flex text-secondary gap-2">
                      <i className="bi bi-calendar"></i>
                      {empresaEscolhida?.quando}
                    </p>

                    {empresaEscolhida?.selo === true ? (
                      <p className="d-flex text-secondary gap-2">
                        <img src={r360} alt="" className="icon-empresa" />{" "}
                        <span className="text-secondary">
                          Certificado pelo <b>R360</b>
                        </span>
                      </p>
                    ) : null}
                  </div>
                </>
              ) : (
                <>
                  <EmpresaLoader />
                </>
              )}
            </div>
            <div className="col-12 text-center-md d-flex mt-3 mt-md-auto col-md-2">
              <ScrollToTopLink
                to={`/pt/reclamar/${empresaEscolhida?.id}`}
                className="btn btn-danger m-auto rec-b  gap-2 d-flex"
              >
                <i className="bi bi-megaphone"></i> Reclamar
              </ScrollToTopLink>
            </div>
          </div>
        </div>
        <div className="opcoes bg-white border-b-t py-2">
          <div className="d-flex justify-content-center my-auto gap-4 overflow-x-auto">
            <ScrollToTopLink
              to={"/pt/"}
              className="text-primary text-decoration-none gap-2 d-flex"
            >
              <i className="bi bi-house"></i>Pagina Inicial
            </ScrollToTopLink>
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
              <b>{empresaEscolhida?.nomeEmpresa} é confiável ?</b>
            </h6>

            <br />
            <div className="card-sobre-empresa border-1 bg-white ">
              <div className="p-3">
                <b className="text-dark m-3 f-reg">Reputação</b>
              </div>

              <div className="aval ">
                <div
                  className={` p-4 ${
                    empresaEscolhida?.avaliacao >= 5.0 &&
                    empresaEscolhida?.avaliacao <= 6.9
                      ? "regular"
                      : ""
                  } ${
                    empresaEscolhida?.avaliacao >= 7.0 &&
                    empresaEscolhida?.avaliacao <= 10.0
                      ? "otimo"
                      : ""
                  } ${
                    empresaEscolhida?.avaliacao >= 3.0 &&
                    empresaEscolhida?.avaliacao <= 4.9
                      ? "pessimo"
                      : ""
                  }  ${
                    empresaEscolhida?.avaliacao <= 2.9 ? "nao-recomendado" : ""
                  } 
                
                  `}
                >
                  <div className="d-flex">
                    {empresaEscolhida?.selo === true ? (
                      <img src={r360} alt="" className="logo-reputacao" />
                    ) : empresaEscolhida?.avaliacao >= 5.0 &&
                      empresaEscolhida?.avaliacao <= 6.9 ? (
                      <img src={regular} alt="" className="logo-reputacao" />
                    ) : empresaEscolhida?.avaliacao >= 7.0 &&
                      empresaEscolhida?.avaliacao <= 10.0 ? (
                      <img src={otimo} alt="" className="logo-reputacao" />
                    ) : empresaEscolhida?.avaliacao >= 3.0 &&
                      empresaEscolhida?.avaliacao <= 4.9 ? (
                      <img src={ruim} alt="" className="logo-reputacao" />
                    ) : empresaEscolhida?.avaliacao <= 2.9 ? (
                      <img
                        src={naorecomendado}
                        alt=""
                        className="logo-reputacao"
                      />
                    ) : null}

                    <div className="container">
                      <h5>
                        {empresaEscolhida?.selo ? (
                          <b className="f-reg f-16">R360</b>
                        ) : empresaEscolhida?.avaliacao >= 5.0 &&
                          empresaEscolhida?.avaliacao <= 6.9 ? (
                          <b className="f-reg">REGULAR</b>
                        ) : empresaEscolhida?.avaliacao >= 7.0 &&
                          empresaEscolhida?.avaliacao <= 10.0 ? (
                          <b className="f-reg">ÓTIMO</b>
                        ) : empresaEscolhida?.avaliacao >= 3.0 &&
                          empresaEscolhida?.avaliacao <= 4.9 ? (
                          <b className="f-reg">RUÍM</b>
                        ) : empresaEscolhida?.avaliacao <= 2.9 ? (
                          <b className="f-reg">NÃO RECOMENDADO</b>
                        ) : (
                          <b className="f-reg">SEM DADOS </b>
                        )}
                      </h5>
                      <div className="d-flex gap-2">
                        <h2 className="f-reg">{empresaEscolhida?.avaliacao}</h2>
                        <span className="my-auto text-secondary"> / 10</span>
                      </div>
                    </div>
                  </div>
                  <div className="mx-auto my-2 border-1 rounded-1 text-center bg-white p-3">
                    <span className="f-12">Reclamações</span>
                    <b className="d-flex gap-2 f-reg mx-auto justify-content-center">
                      <i className="bi bi-megaphone"></i>{" "}
                      {reclamacoesEmpresa?.length}
                    </b>
                  </div>
                  {empresaEscolhida?.avaliacao <= 2.9 && (
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
                      className={`progress-bar ${
                        percentuaisSolicitariam.percentualSolicitariam.toFixed(
                          1
                        ) <= 40
                          ? "bg-danger"
                          : percentuaisSolicitariam.percentualSolicitariam.toFixed(
                              1
                            ) >= 50.0 &&
                            percentuaisSolicitariam.percentualSolicitariam.toFixed(
                              1
                            ) <= 69.0
                          ? "bg-warning"
                          : "bg-success"
                      } `}
                      style={{
                        width:
                          percentuaisSolicitariam.percentualSolicitariam.toFixed(
                            1
                          ) + "%",
                      }}
                    ></div>
                  </div>
                  {empresaEscolhida?.avaliacao != null ? (
                    <span className="f-reg my-auto">
                      {percentuaisSolicitariam.percentualSolicitariam}%
                    </span>
                  ) : (
                    <span className="f-reg my-auto">0 </span>
                  )}
                </div>
              </div>

              <div className="p-3">
                <b className="f-re">Reclamações Respondidas</b>
                <br />
                <div className="d-flex mt-2 gap-2">
                  <div
                    className="progress my-auto w-100"
                    role="progressbar"
                    aria-valuenow={TotalReclamacoesRespondidas()}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className={`progress-bar bg-success `}
                      style={{
                        width: `${TotalReclamacoesRespondidas()}%`,
                      }}
                    ></div>
                  </div>
                  <span className="f-reg my-auto">
                
                    {empresaEscolhida?.avaliacao != null ? (
                    <span className="f-reg my-auto">
                          {TotalReclamacoesRespondidas()}%
                    </span>
                  ) : (
                    <span className="f-reg my-auto">0 </span>
                  )}
                  </span>
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
                        empresaEscolhida?.avaliacao <= 4
                          ? "bg-danger"
                          : empresaEscolhida?.avaliacao >= 5.0 &&
                            empresaEscolhida?.avaliacao <= 6.9
                          ? "bg-warning"
                          : "bg-success"
                      } `}
                      style={{ width: `${larguraProgressBar}%` }}
                    ></div>
                  </div>{empresaEscolhida?.avaliacao != null ? (
                    <span className="f-reg my-auto">
                      {empresaEscolhida?.avaliacao}
                    </span>
                  ) : (
                    <span className="f-reg my-auto">0 </span>
                  )}
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
                  Quem viu {empresaEscolhida?.nomeEmpresa} também viu:
                </b>
                <br />
                <br />

                <div className="listas-lojas mb-3  d-flex gap-3 overflow-x-auto listas-descontos">
                  {dadosEmpresas.length != 0 ? (
                    <>
                      {dadosEmpresas
                        .filter(
                          (empresa) => empresa.id !== empresaEscolhida?.id
                        )
                        .map((empresa) => (
                          <a
                            key={empresa.id}
                            href={`/pt/empresa/${empresa.id}`}
                            className="card-loja text-decoration-none text-dark text-center rounded-1 border-lightt p-3 shadow-sm"
                          >
                            <img
                              src={empresa.logo}
                              alt=""
                              className="logo-empresa"
                            />
                            <div className="bod">
                              <AbreviarTexto
                                texto={empresa?.nomeEmpresa}
                                largura={"190"}
                              />

                              <p className="d-flex justify-content-center mt-1 my-auto gap-2 f-12">
                                <AbreviarTexto
                                  texto={empresa?.enderecoEmpresa}
                                  largura={"300"}
                                  className="my-auto text-secondary"
                                ></AbreviarTexto>
                              </p>
                              <hr />

                              <div className="d-flex gap-2 justify-content-center">
                                {empresa?.avaliacao >= 5.0 &&
                                empresa?.avaliacao <= 6.9 ? (
                                  <img
                                    src={regular}
                                    alt=""
                                    className="icon-empresa"
                                  />
                                ) : empresa?.avaliacao >= 7.0 &&
                                  empresa?.avaliacao <= 10.0 ? (
                                  <img
                                    src={otimo}
                                    alt=""
                                    className="icon-empresa"
                                  />
                                ) : empresa?.avaliacao >= 3.0 &&
                                  empresa?.avaliacao <= 4.9 ? (
                                  <img
                                    src={ruim}
                                    alt=""
                                    className="icon-empresa"
                                  />
                                ) : empresa?.avaliacao <= 2.9 ? (
                                  <img
                                    src={naorecomendado}
                                    alt=""
                                    className="icon-empresa"
                                  />
                                ) : null}
                                <h4 className="f-reg my-auto">
                                  <b>{empresa?.avaliacao} </b>
                                </h4>
                                <span className="text-secondary f-12 mt-auto">
                                  / 10
                                </span>
                              </div>
                            </div>
                          </a>
                        ))}
                    </>
                  ) : (
                    <div className="d-flex justify-content-start">
                      <ProfileCard />
                    </div>
                  )}
                </div>
              </div>
              <br />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-6 my-3">
            <h6 className="f-reg">
              <b>O que estão falando sobre {empresaEscolhida?.nomeEmpresa} </b>
            </h6>

            <br />
            <div className="card-sobre-empresa border-1 bg-white p-3">
      <b className="text-dark f-reg">Reclamações de clientes </b>

      {/* O que estão falando desta empresa, card */}
      {reclamacoesEmpresa?.length !== 0 ? (
        <>
          {reclamacoesEmpresa.slice(0, reclamacoesParaExibir).map((reclamacao, index) => (
            <ReclamacaoItem key={index} reclamacao={reclamacao} />
          ))}
          {reclamacoesEmpresa.length > reclamacoesParaExibir && (
            <div className="text-center my-3">
              <button className="btn btn-link" onClick={handleVerMais}>
                Ver mais reclamações
              </button>
            </div>
          )}
          {reclamacoesParaExibir > 5 && (
            <div className="text-center my-3">
              <button className="btn btn-link" onClick={handleVerMenos}>
                Ver menos reclamações
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          {[...Array(reclamacoesParaExibir)].map((_, index) => (
            <Comment key={index} className="w-100" />
          ))}
          {reclamacoesParaExibir > 5 && (
            <div className="text-center my-3">
              <button className="btn btn-link" onClick={handleVerMenos}>
                Ver menos reclamações
              </button>
            </div>
          )}
          {reclamacoesParaExibir <= 5 && (
            <div className="text-center my-3">
              <button className="btn btn-link" onClick={handleVerMais}>
                Ver mais reclamações
              </button>
            </div>
          )}
        </>
      )}
    </div>
            <br />
            <br />

            <Pub />
            <br />
          </div>
          <div className="col-12 col-sm-6 col-lg-3 my-3">
            <h6 className="f-reg">
              <b>Veja mais informações sobre {empresaEscolhida?.nomeEmpresa}</b>
            </h6>
            <br />
            <div className="card-sobre-empresa border-1 bg-white p-3">
              <b className="text-dark f-reg">Sobre</b>

              <p className="text-secondary f-14">{empresaEscolhida?.sobre}</p>
              <b>
                NIF:{" "}
                <b className="text-success">{empresaEscolhida?.numeroBI}</b>{" "}
              </b>
              <center className="mt-2">
                <span className="text-secondary f-12">
                  Informações cadastradas pela empresa
                </span>
              </center>
              <hr />
              <center>
                <span className="d-flex gap-2 justify-content-center  f-14">
                  <i className="bi bi-calendar"></i> {empresaEscolhida?.quando}
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
                  href={`https://${empresaEscolhida?.siteEmpresa}`}
                >
                  {empresaEscolhida?.siteEmpresa}
                </a>
              </h5>

              <br />
              <b>Whatsapp:</b>
              <h5 className="p-2 info-empresa bg-light rounded-2 text-decoration-none">
                {" "}
                <a
                  className=" text-decoration-none"
                  href={"tel:" + empresaEscolhida?.whatsapp}
                >
                  {empresaEscolhida?.whatsapp}
                </a>
              </h5>

              <hr />
              <center>
                <span className="d-flex gap-3 justify-content-center  f-14">
                  <a href={"https://facebook.com/" + empresaEscolhida?.fb}>
                    {" "}
                    <i className="bi bi-facebook f-20"></i>{" "}
                  </a>
                  <a href={"https://instagram.com/" + empresaEscolhida?.insta}>
                    {" "}
                    <i className="bi bi-instagram f-20"></i>{" "}
                  </a>
                  <a href={"https://youtube.com/" + empresaEscolhida?.fb}>
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
                  Quem viu {empresaEscolhida?.nomeEmpresa} também viu:
                </b>
                <br />
                <br />

                <div className="listas-lojas mb-3  d-flex gap-3 overflow-x-auto listas-descontos">
                  {dadosEmpresas.length != 0 ? (
                    <>
                      {dadosEmpresas
                        .filter(
                          (empresa) => empresa.id !== empresaEscolhida?.id
                        )
                        .map((empresa) => (
                          <a
                            key={empresa.id}
                            href={`/pt/empresa/${empresa.id}`}
                            className="card-loja text-decoration-none text-dark text-center rounded-1 border-lightt p-3 shadow-sm"
                          >
                            <img
                              src={empresa.logo}
                              alt=""
                              className="logo-empresa"
                            />
                            <div className="bod">
                              <AbreviarTexto
                                texto={empresa?.nomeEmpresa}
                                largura={"190"}
                              />

                              <p className="d-flex justify-content-center mt-1 my-auto gap-2 f-12">
                                <AbreviarTexto
                                  texto={empresa?.enderecoEmpresa}
                                  largura={"300"}
                                  className="my-auto text-secondary"
                                ></AbreviarTexto>
                              </p>
                              <hr />

                              <div className="d-flex gap-2 justify-content-center">
                                {empresa?.avaliacao >= 5.0 &&
                                empresa?.avaliacao <= 6.9 ? (
                                  <img
                                    src={regular}
                                    alt=""
                                    className="icon-empresa"
                                  />
                                ) : empresa?.avaliacao >= 7.0 &&
                                  empresa?.avaliacao <= 10.0 ? (
                                  <img
                                    src={otimo}
                                    alt=""
                                    className="icon-empresa"
                                  />
                                ) : empresa?.avaliacao >= 3.0 &&
                                  empresa?.avaliacao <= 4.9 ? (
                                  <img
                                    src={ruim}
                                    alt=""
                                    className="icon-empresa"
                                  />
                                ) : empresa?.avaliacao <= 2.9 ? (
                                  <img
                                    src={naorecomendado}
                                    alt=""
                                    className="icon-empresa"
                                  />
                                ) : null}
                                <h4 className="f-reg my-auto">
                                  <b>{empresa?.avaliacao} </b>
                                </h4>
                                <span className="text-secondary f-12 mt-auto">
                                  / 10
                                </span>
                              </div>
                            </div>
                          </a>
                        ))}
                    </>
                  ) : (
                    <div className="d-flex justify-content-start">
                      <ProfileCard />
                    </div>
                  )}
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>

      <div className="s">
        <Pub />

        <br />

        <Footer />
      </div>
    </div>
  );
};

export default PerfilEmpresa;
