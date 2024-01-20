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
import { NavLink, useParams } from "react-router-dom";
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
import regular from "../imgs/regular.png";
import AbreviarTexto from "../components/abreviarTexto";
import dadosEmpresas from "../model/empresas";
import AvaliacaoComponent from "../components/avaliacaoComponent";
import Swal from "sweetalert2";
import ScrollToTopLink from "../components/scrollTopLink";
import EmpresaLoader from "../components/empLoader";
import Loader from "../components/loader";

const ReclamarEmpresa = ({ cart, nomee, emaill }) => {
  // const { user, handleLogout } = useContext(UserContext);

  const [user, setUser] = useState("");
  const [load, setLoader] = useState(false);

  const { empresa } = useParams();

  // const empres = dadosEmpresas.filter((p) => p.id == empresa);
  // const empresaEscolhida = empres[0];
  // console.log(empresaEscolhida);

  const [empresaEscolhida, setEmpresaEscolhida] = useState(null);
  const [reclamacoesEmpresa, setReclamacoesEmpresa] = useState([]);

  useEffect(() => {
    const pegarEmpresa = async () => {
      try {
        const empresasRef = db.collection("empresa");
        const empresaSnapshot = await empresasRef.doc(empresa).get();
        const empresaData = empresaSnapshot.data();

        if (empresaData) {
          setEmpresaEscolhida({
            id: empresaSnapshot.id,
            ...empresaData,
          });

          // Supondo que as reclamações estejam em uma coleção "reclamacoes" dentro do documento da empresa
          const reclamacoesRef = empresasRef
            .doc(empresa)
            .collection("reclamacoes");
          const reclamacoesSnapshot = await reclamacoesRef.get();
          const reclamacoesData = reclamacoesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setReclamacoesEmpresa(reclamacoesData);
        } else {
          console.error("Empresa não encontrada.");
        }
      } catch (error) {
        console.error("Erro ao pegar empresa:", error.message);
      }
    };

    pegarEmpresa();
  }, [empresa]);

  // const [avaliacaoUsuario, setAvaliacaoUsuario] = useState(null);

  // const handleAvaliacaoChange = (avaliacao) => {
  //   setAvaliacaoUsuario(avaliacao);
  // };

  document.title = `Reclamar de ${empresaEscolhida?.nomeEmpresa} | Reputação 360`;

  const [showModal, setShowModal] = useState(false);

  const [players, setPlayers] = useState([]);

  // Função auxiliar para obter o nome do mês
  const getMonthName = (monthIndex) => {
    const monthNames = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];
    return monthNames[monthIndex];
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} de ${getMonthName(
    currentDate.getMonth()
  )} de ${currentDate.getFullYear()}`;

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

  useEffect(() => {
    // verificar login do usuario
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Consultar o Firestore para obter o documento do usuário com base no e-mail
          const querySnapshot = await db
            .collection("cliente")
            .where("email", "==", user.email)
            .get();

          if (!querySnapshot.empty) {
            // Se houver um documento correspondente, obter os dados
            const userData = {
              name: user.displayName
                ? user.displayName
                : querySnapshot.docs[0].get("name"),
              email: user.email,
              pictureUrl: user.photoURL,
              uid: user.uid,
              tel: user.phoneNumber
                ? user.phoneNumber
                : querySnapshot.docs[0].get("phone"),
              // Adicione outros campos conforme necessário
              bi: querySnapshot.docs[0].get("bi"),
              city: querySnapshot.docs[0].get("city"),
              // Adicione outros campos conforme necessário
            };

            // Atualizar o estado do usuário com os dados
            setUser(userData);

            // Salvar dados no localStorage
            localStorage.setItem("users", JSON.stringify(userData));
          } else {
            console.warn(
              "Documento não encontrado no Firestore para o e-mail do usuário."
            );
          }
        } catch (error) {
          console.error("Erro ao buscar dados do Firestore:", error);
        }
      } else {
        // Se o usuário não estiver logado, defina o estado do usuário como null
        setUser(null);
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const [formData, setFormData] = useState({
    classificacao: 0,
    solicitarNovamente: null,
    titulo: "",
    historia: "",
    
    anexos: [], // Certifique-se de inicializar como um array vazio
  });

  const handleAvaliacaoChange = (avaliacao) => {
    setFormData({
      ...formData,
      classificacao: avaliacao,
    });
  };

  const handleSolicitacaoChange = (solicitacao) => {
    setFormData({
      ...formData,
      solicitarNovamente: solicitacao,
    });
  };

  const handleTituloChange = (e) => {
    setFormData({
      ...formData,
      titulo: e.target.value,
    });
  };

  const handleHistoriaChange = (e) => {
    setFormData({
      ...formData,
      historia: e.target.value,
    });
  };

  const handleAnexosChange = (e) => {
    const files = e.target.files;
    setFormData({
      ...formData,
      anexos: Array.from(files), // Certifique-se de converter para um array
    });
  };
  const handleEnviarReclamacao = async () => {
    setLoader(true);
    try {
      // Verificar se os campos obrigatórios estão preenchidos
      if (
        formData.solicitarNovamente === null ||
        formData.titulo.trim() === "" ||
        formData.historia.trim() === ""
      ) {
        setLoader(false);
        Swal.fire({
          icon: "warning",
          title: "Campos obrigatórios não preenchidos",
          text: "Por favor, preencha todos os campos obrigatórios.",
        });
        return; // Interrompe o envio se algum campo estiver vazio
      }

      const reclamacaoRef = firebase.firestore().collection("reclamacoes");

      // Upload de arquivos para o Storage
      const anexosURLs = await Promise.all(
        formData.anexos.map(async (anexo) => {
          const storageRef = firebase.storage().ref();
          const fileRef = storageRef.child(`reclamacoes/${anexo.name}`); // Pasta "reclamacoes"
          await fileRef.put(anexo);
          return fileRef.getDownloadURL();
        })
      );

      // Adiciona URLs dos anexos aos dados da reclamação
      const reclamacaoData = {
        ...formData,
        anexos: anexosURLs,
        empresaId: empresaEscolhida?.id,
        nomeEmpresa: empresaEscolhida?.nomeEmpresa,
        cliente: user.name,
        emailCliente: user.email,
        status: "nao-respondido",
        quando: formattedDate,
        // Adicione outros campos necessários, como data, usuário, etc.
      };

      // Adiciona a reclamação ao Firestore
      await reclamacaoRef.add(reclamacaoData);

      Swal.fire({
        icon: "success",
        title: "Reclamação enviada com sucesso!",
        text: `Sua reclamação foi registrada com sucesso, ${user.name}!`,
      });

      setLoader(false);
      // Limpa os campos do formulário após o envio bem-sucedido
      setFormData({
        classificacao: 0,
        solicitarNovamente: null,
        titulo: "",
        historia: "",
        anexos: [],
      });
    } catch (error) {
      setLoader(false);
      console.error("Erro ao enviar reclamação:", error);
    }
  };

  return (
    <div className="w-100">
      <Header
        style={{ marginBottom: "5rem" }}
        nomee={nomee}
        emaill={emaill}
        cart={cart}
      />

      <div className="s bg-light">
        <div className="bg-white  pt-5 mt-sm-5 mt-md-0 pt-lg-3 rounded-3 container pb-3">
          <div className="d-flex justify-content-between mt-sm-5 mt-md-0 gap-3">
            <div className="d-flex gap-3">
              {empresaEscolhida?.nomeEmpresa != null ? (
                <>
                  <img
                    src={empresaEscolhida?.logo}
                    alt=""
                    className="logo-rec"
                  />
                  <div className="my-auto">
                    <ScrollToTopLink
                      to={"/pt/empresa/" + empresaEscolhida.id}
                      className={"text-decoration-none"}
                    >
                      <h5 className="f-reg">{empresaEscolhida?.nomeEmpresa}</h5>
                    </ScrollToTopLink>
                    <p className="d-flex mt-1 my-auto gap-2 f-14">
                      {empresaEscolhida?.avaliacao >= 5.0 &&
                      empresaEscolhida?.avaliacao <= 6.9 ? (
                        <img src={regular} alt="" className="icon-empresa" />
                      ) : empresaEscolhida?.avaliacao >= 7.0 &&
                        empresaEscolhida?.avaliacao <= 10.0 ? (
                        <img src={otimo} alt="" className="icon-empresa" />
                      ) : empresaEscolhida?.avaliacao >= 3.0 &&
                        empresaEscolhida?.avaliacao <= 4.9 ? (
                        <img src={ruim} alt="" className="icon-empresa" />
                      ) : empresaEscolhida?.avaliacao <= 2.9 ? (
                        <img
                          src={naorecomendado}
                          alt=""
                          className="icon-empresa"
                        />
                      ) : null}
                      {empresaEscolhida?.avaliacao >= 5.0 &&
                      empresaEscolhida?.avaliacao <= 6.9 ? (
                        <b className="my-auto text-secondary">REGULAR</b>
                      ) : empresaEscolhida?.avaliacao >= 7.0 &&
                        empresaEscolhida?.avaliacao <= 10.0 ? (
                        <b className="my-auto text-secondary">ÓTIMO</b>
                      ) : empresaEscolhida?.avaliacao >= 3.0 &&
                        empresaEscolhida?.avaliacao <= 4.9 ? (
                        <b className="my-auto text-secondary">RUÍM</b>
                      ) : empresaEscolhida?.avaliacao <= 2.9 ? (
                        <b className="my-auto text-secondary">
                          NÃO RECOMENDADO
                        </b>
                      ) : (
                        <b className="my-auto text-secondary">SEM DADOS </b>
                      )}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <EmpresaLoader />
                </>
              )}
            </div>
            <a
              href="/pt/reclamar"
              className="my-auto alterar text-decoration-none"
            >
              Alterar empresa
            </a>
          </div>
        </div>
        <br />

        <br />
        <div className="container my-auto form-c form">
          <center>
            <>
              <div className="text-dark py-2">
                <div className="text-center mb-3 headc">
                  <h2 className="text-dark">
                    Vamos começar.{" "}
                    <b className="text-success">Conte sua história</b>
                  </h2>

                  <p>
                    <span className="text-secondary f-14">
                      Descreva o seu problema com a empresa.
                    </span>
                  </p>
                </div>

                <div className="titul mt-3">
                  <div className="d-flex f-reg gap-2">
                    <i className="bi text-success bi-star"></i>
                    <b>
                      Classifique a história / Empresa{" "}
                      <span className="text-danger">*</span>
                    </b>
                  </div>
                </div>

                <br />
                <div className="col-12 text-center my-2">
                  <AvaliacaoComponent
                    className=""
                    onAvaliacaoChange={handleAvaliacaoChange}
                  />
                </div>
                <hr />
                <div className="col-12 my-2 ">
                  <div className="titul mt-3">
                    <div className="d-flex f-reg gap-2">
                      <i className="bi text-success bi-hand-thumbs-up"></i>
                      <b>
                        Solicitaria novamente esta Empresa
                        <span className="text-danger">*</span>
                      </b>
                    </div>
                  </div>{" "}
                  <label htmlFor="" className="text-secondary f-12">
                    Para o caso de resolverem o seu problema, pode voltar a
                    responder mais tarde
                  </label>
                  <br />
                  <br />
                  <div className="d-flex justify-content-around">
                    <label htmlFor="sim" className="f-18">
                      <input
                        type="radio"
                        checked={formData.solicitarNovamente === "sim"}
                        onChange={() => handleSolicitacaoChange("sim")}
                        id="sim"
                      />
                      Sim
                    </label>

                    <label htmlFor="nao" className="f-18">
                      <input
                        type="radio"
                        checked={formData.solicitarNovamente === "nao"}
                        onChange={() => handleSolicitacaoChange("nao")}
                        id="nao"
                      />
                      Não
                    </label>
                  </div>
                </div>
                <hr />
                <div className="titul">
                  <div className="d-flex gap-2">
                    <i className="bi text- f-reg bi-megaphone"></i>{" "}
                    <b>Título da história</b>
                  </div>
                </div>
                <div className="row text-start">
                  <div className="col-12  my-2">
                    <input
                      type="text"
                      className="form-control rounded-1"
                      placeholder="Escolha um título para sua história"
                      value={formData.titulo}
                      onChange={handleTituloChange}
                    />
                  </div>
                  <br />
                  <div className="col-12 col-lg-12 my-2">
                    <label htmlFor="" className=" f-reg">
                      Conte sua história,
                    </label>
                    <textarea
                      name=""
                      id=""
                      placeholder={`Descreva sua experiência com produtos ou serviços da ${empresaEscolhida?.nomeEmpresa}`}
                      className="w-100 form-control mt-1"
                      cols="30"
                      rows="3"
                      maxLength={1000}
                      value={formData.historia}
                      onChange={handleHistoriaChange}
                    ></textarea>

                    <div className="alert alert-info alert-sm f-12 p-2 mt-2">
                      Nunca inclua dados pessoais no texto. A empresa receberá
                      seus dados junto com a reclamação.
                    </div>
                  </div>

                  <div className="titul mt-3">
                    <div className="d-flex f-reg gap-2">
                      <i className="bi text-success bi-archive"></i>
                      <b>
                        Anexos{" "}
                        <span className="text-secondary">(Opcional)</span>
                      </b>
                    </div>
                  </div>

                  <br />
                  <div className="col-12 my-2 ">
                    <label htmlFor="" className="text-secondary f-12">
                      No máximo 3 ficheiros
                    </label>
                    <input
                      type="file"
                      className="form-control rounded-1"
                      onChange={handleAnexosChange}
                      multiple
                    />
                    <br />
                  </div>
                </div>
              </div>
              <br />
              <br />

              {user ? (
                <button
                  disabled={load}
                  onClick={handleEnviarReclamacao}
                  className="d-flex text-white w-100  btn btn-success justify-content-center rounded-1"
                >
                  {load ? (
                    <>
                      <Loader />
                    </>
                  ) : (
                    <span>Enviar Reclamação</span>
                  )}
                </button>
              ) : (
                <>
                  <center>
                    <i className="bi bi-exclamation-triangle"></i>
                    <p className="text-secondary">
                      Faça{" "}
                      <ScrollToTopLink to={"/pt/login"}>login</ScrollToTopLink>{" "}
                      ou cadastre se para fazer uma reclamação ou avaliação!
                    </p>
                  </center>
                </>
              )}
            </>
          </center>
        </div>
        <br />

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

export default ReclamarEmpresa;
