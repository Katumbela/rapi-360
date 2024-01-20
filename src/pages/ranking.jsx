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
import obterDadosDoFirebase from "../model/empresas2";
import EmpresaLoader from "../components/empLoader";
import { format } from "date-fns";

const Ranking = ({ cart, nomee, emaill }) => {
  const { user, handleLogout } = useContext(UserContext);
  document.title = `Ranking R360 | Reputação 360`;

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

  const [melhoresMediaEmpresas, setmelhoresMediaEmpresas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dados = await obterDadosDoFirebase();
        setDadosEmpresas(dados);
      } catch (error) {
        console.error("Erro ao obter dados do Firebase:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calcularMediaAvaliacoes = () => {
      const empresasComMediaMaiorQue6 = dadosEmpresas.filter(
        (empresa) => parseFloat(empresa.avaliacao) > 6
      );

      setmelhoresMediaEmpresas(empresasComMediaMaiorQue6);
    };

    calcularMediaAvaliacoes();
  }, [dadosEmpresas]);

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

  const [empresasOrdenadasVoltarAComprar, setempresasOrdenadasVoltarAComprar] =
    useState([]);
  const [empresasOrdenadasMelhorSolucao, setEmpresasOrdenadasMelhorSolucao] =
    useState([]);

  useEffect(() => {
    const ordenarEmpresas = async () => {
      try {
        const empresasComIndices = await Promise.all(
          dadosEmpresas.map(async (empresa) => {
            const reclamacoes = await buscarReclamacoesPorEmpresa(empresa.id);
            const reclamacoesRespondidas = reclamacoes.filter(
              (reclamacao) => reclamacao.status === "respondido"
            );
            const porcentagemSolucao =
              (reclamacoesRespondidas.length / reclamacoes.length) * 100 || 0;
    
            // Garante que a porcentagem de solução é maior ou igual a 50%
            if (porcentagemSolucao >= 50) {
              return {
                ...empresa,
                porcentagemSolucao: porcentagemSolucao.toFixed(1) + " %",
              };
            } else {
              return null; // Se a porcentagem é menor que 50%, não incluir na lista
            }
          })
        );
    
        const empresasOrdenadas = empresasComIndices
          .filter((empresa) => empresa !== null) // Remove as empresas com porcentagem < 50%
          .sort((a, b) => {
            const porcentagemA = parseFloat(a.porcentagemSolucao);
            const porcentagemB = parseFloat(b.porcentagemSolucao);
            return porcentagemB - porcentagemA;
          })
          .slice(0, 5);
    
        setEmpresasOrdenadasMelhorSolucao(empresasOrdenadas);
      } catch (error) {
        console.error("Erro ao ordenar empresas:", error.message);
      }
    };
    

    ordenarEmpresas();
  }, [dadosEmpresas]);

  const buscarReclamacoesPorEmpresa = async (empresaId) => {
    try {
      const reclamacoesRef = db.collection("reclamacoes");
      const reclamacoesSnapshot = await reclamacoesRef
        .where("empresaId", "==", empresaId)
        .get();

      return reclamacoesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Erro ao obter reclamações:", error.message);
      return [];
    }
  };

  const calcularPorcentagemSatisfacao = async (empresa) => {
    const reclamacoesDaEmpresa = await buscarReclamacoesPorEmpresa(empresa.id);
    const totalReclamacoes = reclamacoesDaEmpresa.length;

    if (totalReclamacoes === 0) {
      return "N/A";
    }

    const reclamacoesSolicitariamNovamente = reclamacoesDaEmpresa.filter(
      (reclamacao) => reclamacao.solicitarNovamente === "sim"
    );

    const totalSolicitariamNovamente = reclamacoesSolicitariamNovamente.length;

    const porcentagemSatisfacao =
      (totalSolicitariamNovamente / totalReclamacoes) * 100;

    return `${porcentagemSatisfacao.toFixed(1)}%`;
  };

  useEffect(() => {
    const ordenarEmpresas = async () => {
      try {
        const empresasComPorcentagens = await Promise.all(
          dadosEmpresas.map(async (empresa) => ({
            ...empresa,
            porcentagemSatisfacao: await calcularPorcentagemSatisfacao(empresa),
          }))
        );

        const empresasOrdenadasVoltarAComprar = empresasComPorcentagens
          .sort((a, b) => {
            const porcentagemA = parseFloat(a.porcentagemSatisfacao);
            const porcentagemB = parseFloat(b.porcentagemSatisfacao);
            return porcentagemB - porcentagemA;
          })
          .slice(0, 5);

        setempresasOrdenadasVoltarAComprar(empresasOrdenadasVoltarAComprar);
      } catch (error) {
        console.error("Erro ao ordenar empresas:", error.message);
      }
    };

    ordenarEmpresas();
  }, [dadosEmpresas]);

  const [dataAtual, setDataAtual] = useState("");

  useEffect(() => {
    const hoje = new Date();
    const dataFormatada = format(hoje, "dd/MM/yyyy");
    setDataAtual(dataFormatada);
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


        <br />

        <div className="listas-ranking container">
          <div className="row">
            <div className="col-12 my-3 col-md-6 col-lg-6 col-xl-4">
            <div className="card-ranking shadow-sm rounded-1 p-4">
      <div className="headd">
        <b className="f-reg">Melhor índice de solução</b>
        <br />
        <span className="text-secondary">{dataAtual}</span>
      </div>
      <br />
      <div className="boddy">
        {
          empresasOrdenadasMelhorSolucao?.length != 0 
          ?
          (
            <>
            {empresasOrdenadasMelhorSolucao.slice(0,6).map((empresa, index) => (
          <div key={empresa.id} className="emp-rank my-4 d-flex justify-content-between">
            <div className="d-flex">
              <b className="my-auto">{index + 1}º</b>
              <img src={r360} className="icon-empresa my-auto mx-1" alt="" />
              <div className="empresa my-auto">
                <NavLink to={`/pt/empresa/${empresa.id}`} className={"text-decoration-none"}>
                  <AbreviarTexto texto={empresa.nomeEmpresa} largura={"200"} />
                </NavLink>
                <NavLink className={"text-secondary f-12 text-decoration-none"} to={`/pt/empresa/${empresa.id}`}>
                  Ver mais informações
                </NavLink>
              </div>
            </div>
            <div className="my-auto rate text-secondary f-14">
              <span>{empresa.porcentagemSolucao}</span>
            </div>
          </div>
        ))}
            </>
          ):

          (
            <div className="flex-column d-flex gap-3">
              <EmpresaLoader className="w-100" />

              <EmpresaLoader />

              <EmpresaLoader />
              <EmpresaLoader />
              <EmpresaLoader />
            </div>
          )
          }
      </div>
    </div>
            </div>
            <div className="col-12 my-3 col-md-6 col-lg-6 col-xl-4">
              <div className="card-ranking shadow-sm rounded-1 p-4">
                <div className="headd">
                  <b className="f-reg">
                    Melhores Índices de Voltar a Fazer Negócios
                  </b>
                  <br />
                  <span className="text-secondary">{dataAtual}</span>
                </div>
                <br />
                <div className="boddy">
                  {empresasOrdenadasVoltarAComprar?.length != 0 ? (
                    <>
                      {empresasOrdenadasVoltarAComprar.slice(0,6).map((empresa, index) => (
                        <div
                          key={empresa.id}
                          className="emp-rank my-4 d-flex justify-content-between"
                        >
                          <div className="d-flex">
                            <b className="my-auto">{index + 1}º</b>
                            <img
                              src={r360}
                              className="icon-empresa my-auto mx-1"
                              alt=""
                            />
                            <div className="empresa my-auto">
                              <NavLink
                                to={`/pt/empresa/${empresa.id}`}
                                className={"text-decoration-none"}
                              >
                                <AbreviarTexto
                                  texto={empresa.nomeEmpresa}
                                  largura={"200"}
                                />
                              </NavLink>
                              <NavLink
                                className={
                                  "text-secondary f-12 text-decoration-none"
                                }
                                to={`/pt/empresa/${empresa.id}`}
                              >
                                Ver mais informações
                              </NavLink>
                            </div>
                          </div>
                          <div className="my-auto rate text-secondary f-14">
                            <span>{empresa.porcentagemSatisfacao}</span>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="flex-column d-flex gap-3">
                      <EmpresaLoader className="w-100" />

                      <EmpresaLoader />

                      <EmpresaLoader />
                      <EmpresaLoader />
                      <EmpresaLoader />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 my-3 col-md-6 col-lg-6 col-xl-4">
              <div className="card-ranking  shadow-sm rounded-1 p-4">
                <div className="headd ">
                  <b className="f-reg ">Melhores notas médias</b>
                  <br />
                  <span className="text-secondary">{dataAtual}</span>
                </div>
                <br />
                <div className="boddy">
                  <div className="emp-rank my-4 d-flex justify-content-between">
                    {melhoresMediaEmpresas?.length != 0 ? (
                      <>
                        {melhoresMediaEmpresas.map((empresa, index) => (
                          <div
                            key={empresa.id}
                            className="d-flex justify-content-between"
                          >
                            <div className="d-flex">
                              <b className="my-auto">{index + 1}º</b>
                              <img
                                src={empresa.logo}
                                className="icon-empresa my-auto mx-1"
                                alt=""
                              />
                              <div className="empresa my-auto">
                                <NavLink
                                  to={`/pt/empresa/${empresa.id}`}
                                  className={"text-decoration-none "}
                                >
                                  <AbreviarTexto
                                    texto={empresa.nomeEmpresa}
                                    largura={"200"}
                                  />
                                </NavLink>
                                <NavLink
                                  className={
                                    "text-secondary f-12 text-decoration-none"
                                  }
                                  to={`/pt/empresa/${empresa.id}`}
                                >
                                  Ver mais informações
                                </NavLink>
                              </div>
                            </div>
                            <div className="my-auto ms-1 rate text-secondary f-14">
                              <span>{empresa.avaliacao}</span>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="flex-column d-flex gap-3">
                        <EmpresaLoader className="w-100" />

                        <EmpresaLoader />

                        <EmpresaLoader />
                        <EmpresaLoader />
                        <EmpresaLoader />
                      </div>
                    )}
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

          {/* <div className="row">
            <div className="col-12 my-3 col-md-6 col-lg-6 col-xl-4">
              <div className="card-ranking  shadow-sm rounded-1 p-4">
                <div className="headd ">
                  <b className="f-reg ">Piores empresas nos ultimos 30 dias</b>
                  <br />
                  <span className="text-secondary">{dataAtual}</span>
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
            <div className="col-12 my-3 col-md-6 col-lg-6 col-xl-4">
              <div className="card-ranking  shadow-sm rounded-1 p-4">
                <div className="headd ">
                  <b className="f-reg ">Mais reclamadas nos últimos 6 meses</b>
                  <br />
                  <span className="text-secondary">{dataAtual}</span>
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
          </div> */}
        </div>
        <br />
        <br />

        <Footer />
      </div>
    </div>
  );
};

export default Ranking;
