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
import ScrollToTopLink from "../components/scrollTopLink";

const ReclamarBuscar = ({ cart, nomee, emaill }) => {
  const { user, handleLogout } = useContext(UserContext);
  document.title = `Busque a empresa a reclamar | Reputação 360`;

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

  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filtrar empresas com base no termo de pesquisa
    const results = dadosEmpresas.filter((empresa) => {
      const lowerCasedTerm = searchTerm.toLowerCase();
      return (
        empresa.nome.toLowerCase().includes(lowerCasedTerm) ||
        empresa.site.toLowerCase().includes(lowerCasedTerm) ||
        empresa.nif.includes(searchTerm)
      );
    });

    // Atualizar os resultados da pesquisa
    setSearchResults(results);

    // Exibir as sugestões
  };


  const [showSuggestions, setShowSuggestions] = useState(false);
  

  const handleInputClick = () => {
    // Exibir sugestões ao clicar no input
    setShowSuggestions(true);
  };


  const handleBlur = () => {
    // Aguarde um curto período antes de fechar as sugestões para permitir o clique nas sugestões
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };


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
          <h2 className="f-reg">Fazer Reclamação</h2>
          <div className="container">
            <span className="f-16 container">
              Busque pela empresa que deseja reclamar
              {searchResults.length}

            </span>
            <br />
            <br />
            <div className="pesquisa pesq-busca pesquisa-md">
              {/* <img src={logosm} alt="" className="logo-sm" /> */}
              <input
                type="text"
                name=""
                value={searchTerm}
                onClick={handleInputClick}
                onBlur={handleBlur}
                onChange={handleInputChange}
                placeholder="Pesquise por empresa, NIF ou site"
                id=""
              />
              <i className="bi bi-search"></i>
            </div>
            <div className="res-pesquisa pesquisa pesquisa-md pesq-busca">
              {searchResults.length > 0 && searchTerm !== "" ? (
                searchResults.map((empresa, index) => (
                  <ScrollToTopLink
                    key={empresa.id}
                    to={`/pt/empresa/${empresa.id}`}
                    title={"Clique para ver empresa"}
                    className="empresa w-100 text-decoration-none my-1 shadow-sm d-flex gap-2 border-lightt p-2 rounded-1"
                  >
                    <img src={empresa.logo} className="logo-empresa" alt="" />
                    <div className="de my-auto">
                      <b>{empresa.nome}</b>
                      <p className="d-flex mt-1 my-auto gap-2 f-14">
                        {empresa.selo ? (
                          <img src={r360} alt="" className="icon-empresa" />
                        ) : empresa.avaliacao >= 5.0 &&
                          empresa.avaliacao <= 6.9 ? (
                          <img src={regular} alt="" className="icon-empresa" />
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

                        {empresa.selo ? (
                          <b className="my-auto f-12 text-secondary"> R360</b>
                        ) : empresa.avaliacao >= 5.0 &&
                          empresa.avaliacao <= 6.9 ? (
                          <b className="my-auto f-12 text-secondary">REGULAR</b>
                        ) : empresa.avaliacao >= 7.0 &&
                          empresa.avaliacao <= 10.0 ? (
                          <b className="my-auto f-12 text-secondary">ÓTIMO</b>
                        ) : empresa.avaliacao >= 3.0 &&
                          empresa.avaliacao <= 4.9 ? (
                          <b className="my-auto f-12 text-secondary">RUÍM</b>
                        ) : empresa.avaliacao <= 2.9 ? (
                          <AbreviarTexto
                            className="my-auto f-12 text-secondary"
                            texto={"NÃO RECOMENDADO"}
                            largura={90}
                          />
                        ) : (
                          <b className="my-auto f-12 text-secondary">
                            SEM DADOS{" "}
                          </b>
                        )}
                      </p>
                    </div>
                  </ScrollToTopLink>
                ))
              ) : showSuggestions && searchTerm !== "" ? (
                <>
                  <p className="text-center py-3 w-100 mx-auto f-14">
                    <img src={notFound} style={{ height: "8em" }} alt="" />
                    <p>
                      Nenhum resultado encontrado, parece que esta empresa ainda
                      não está cadastrada.{" "}
                      <a href="/pt/solicitar-cadastro">Solicite o cadastro</a>{" "}
                      desta empresa
                    </p>
                  </p>
                </>
              ) : null }
            </div>
          </div>
        </center>
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

export default ReclamarBuscar;
