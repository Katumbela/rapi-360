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

const ReclamarEmpresa = ({ cart, nomee, emaill }) => {
  const { user, handleLogout } = useContext(UserContext);
  const { empresa } = useParams();

  const empres = dadosEmpresas.filter((p) => p.id == empresa);
  const empresaEscolhida = empres[0];
  console.log(empresaEscolhida);


  const [avaliacaoUsuario, setAvaliacaoUsuario] = useState(null);

  const handleAvaliacaoChange = (avaliacao) => {
    setAvaliacaoUsuario(avaliacao);
  };



  document.title = `Reclamar de ${empresaEscolhida.nome} | Reputação 360`;

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

      <div className="s bg-light">
        <div className="bg-white  pt-5 mt-sm-5 mt-md-0 pt-lg-3 rounded-3 container pb-3">
          <div className="d-flex justify-content-between mt-sm-5 mt-md-0 gap-3">
            <div className="d-flex gap-3">
              <img src={empresaEscolhida.logo} alt="" className="logo-rec" />
              <div className="my-auto">
                <h5 className="f-reg">{empresaEscolhida.nome}</h5>
                <p className="d-flex mt-1 my-auto gap-2 f-14">
                  {empresaEscolhida.avaliacao >= 5.0 &&
                  empresaEscolhida.avaliacao <= 6.9 ? (
                    <img src={regular} alt="" className="icon-empresa" />
                  ) : empresaEscolhida.avaliacao >= 7.0 &&
                    empresaEscolhida.avaliacao <= 10.0 ? (
                    <img src={otimo} alt="" className="icon-empresa" />
                  ) : empresaEscolhida.avaliacao >= 3.0 &&
                    empresaEscolhida.avaliacao <= 4.9 ? (
                    <img src={ruim} alt="" className="icon-empresa" />
                  ) : empresaEscolhida.avaliacao <= 2.9 ? (
                    <img src={naorecomendado} alt="" className="icon-empresa" />
                  ) : null}
                  {empresaEscolhida.avaliacao >= 5.0 &&
                  empresaEscolhida.avaliacao <= 6.9 ? (
                    <b className="my-auto text-secondary">REGULAR</b>
                  ) : empresaEscolhida.avaliacao >= 7.0 &&
                    empresaEscolhida.avaliacao <= 10.0 ? (
                    <b className="my-auto text-secondary">ÓTIMO</b>
                  ) : empresaEscolhida.avaliacao >= 3.0 &&
                    empresaEscolhida.avaliacao <= 4.9 ? (
                    <b className="my-auto text-secondary">MUITO RUÍM</b>
                  ) : empresaEscolhida.avaliacao <= 2.9 ? (
                    <b className="my-auto text-secondary">NÃO RECOMENDADO</b>
                  ) : (
                    <b className="my-auto text-secondary">SEM DADOS </b>
                  )}
                </p>
              </div>
            </div>
            <a href="/pt/reclamar" className="my-auto alterar text-decoration-none">
              Alterar empresa
            </a>
          </div>
        </div>
        <br />

        <br />
        <div className="container my-auto form-c form">
          <center>
            {user ? (
              <div>
                <p className="text-primary">
                  Você está logado como <b> {user.displayName}</b> <br />
                  <span className="text-secondary">Email: {user.email}</span>
                </p>

                <button className="btn btn-danger" onClick={handleLogout}>
                  Sair
                </button>
              </div>
            ) : (
              <>
                <div className="text-dark py-2">
                  <div className="text-center mb-3 headc">
                    <h2 className="text-dark">Vamos começar. <b className="text-success">Conte sua história</b></h2>

                    <p>
                     
                      <span className="text-secondary f-14">
                      Descreva o seu problema com a empresa.
                      </span>
                    </p>
                  </div>
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
                        placeholder="Escolha um titulo para sua historia"
                      />
                    </div>
                    <br />
                    <div className="col-12 col-lg-12 my-2">
                      <label htmlFor="" className=" f-reg">
                         Conte sua história
                      </label>
                     <textarea name="" id="" placeholder={`Descreva sua experiênciar com produtos ou serviços da ${empresaEscolhida.nome}`} className="w-100 form-control mt-1" cols="30" rows="3" maxLength={1000}></textarea>
                        <div className="alert alert-info alert-sm f-12 p-2 mt-2">
                        Nunca inclua dados pessoais no texto. A empresa receberá seus dados junto com a reclamação.
                        </div>
                    </div>
                    <br />
                    <div className="col-12 my-2">
                      <label htmlFor="" className="f-16 f-reg ">
                      Qual o telefone que a empresa pode entrar em contato?
                      </label> <br />
                      <span className="f-12 mb-1 text-secondary">Fique tranquilo, só a empresa poderá ver seu contacto</span>
                     
                      <input type="tel" className="form-control mt-1 rounded-1" placeholder="244 921 234 567"/>
                    </div>
                    <br />
                    <div className="col-12  my-3">
                     <label htmlFor="auth" className=" px-3 py-2 d-flex gap-3 auth cursor-pointer">
                     <input type="checkbox" name="" className="input-check" id="auth" />
                     <b>Autorizo receber notificações do Reputação 360 Aqui pelo Whatsapp</b>
                     </label>
                    <br />
                    </div>
                    <hr />

                    <div className="titul mt-3">
                      <div className="d-flex f-reg gap-2">
                        <i className="bi text-success bi-archive"></i>
                        <b>Anexos  <span className="text-secondary">(Opcional)</span></b>
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
                        
                      />
                    <br />
                    </div>

<hr />
                    <div className="titul mt-3">
                      <div className="d-flex f-reg gap-2">
                        <i className="bi text-success bi-star"></i>
                        <b>Classifique a história / Empresa  <span className="text-danger">*</span></b>
                      </div>
                    </div>

                    <br />
                    <br />
                    <div className="col-12 text-center my-2">
                     <AvaliacaoComponent className="" onAvaliacaoChange={handleAvaliacaoChange} />

                    
                    <br />
</div>
<hr />
                    <div className="col-12 my-2 ">
                     
                    <div className="titul mt-3">
                      <div className="d-flex f-reg gap-2">
                        <i className="bi text-success bi-hand-thumbs-up"></i>
                        <b>Solicitaria novamente esta Empresa  <span className="text-danger">*</span></b>
                      </div>
                    </div> <label htmlFor="" className="text-secondary f-12">
                        Para o caso de resolverem o seu problema, pode voltar a responder mais tarde 
                      </label>
                      <br />
                      <br />
                      <div className="d-flex justify-content-around">

                     <label htmlFor="sim" className="f-18">
                        <input type="radio" checked name="negocio" id="sim" /> Sim
                     </label>
                     <label htmlFor="nao" className="f-18">
                        <input type="radio" name="negocio" id="nao" /> Não
                     </label>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
                <br />
                <br />
                <button className="d-flex text-white w-100  btn btn-success justify-content-center rounded-1">
                  <span>Enviar Reclamação</span>
                </button>
              </>
            )}
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
