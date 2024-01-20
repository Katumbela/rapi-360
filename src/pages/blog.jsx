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
import articles from "../model/artigos";

const Blog = ({ cart, nomee, emaill }) => {
  const { user, handleLogout } = useContext(UserContext);

 const {blog} = useParams();

 const blo = articles.filter((p) => p.id == blog);
 const blogPost = blo[0];
 console.log(blogPost);

  document.title = `${blogPost.title} | Reputação 360`;

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
    background: `linear-gradient(180deg, #00000000, #0000004e, #000000ca), url(${blogPost.coverImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "400px",
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
        empresa.nomeEmpresa.toLowerCase().includes(lowerCasedTerm) ||
        empresa.siteEmpresa.toLowerCase().includes(lowerCasedTerm) ||
        empresa.numeroBI.includes(searchTerm)
      );
    });

    // Atualizar os resultados da pesquisa
    setSearchResults(results);

    // Exibir as sugestões
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

        <div style={backgroundStyle} className="bannerBlogg">

            <div className="tittt container">
                <h1 className="text-white mt-auto f-reg">
                    {blogPost.title}
                </h1>
            </div>
        </div>
      <div className="s">
        <br />
        <br />
        <div className="container">
        <div className="row">
            <div className="col-12 col-md-7">
                <br />
                <h1>
                <b className="f-reg text-success">
                    {blogPost.title}
                </b>
                </h1>
                <br />
                <br />
                <p>
                    {blogPost.content}
                </p>
            </div>
            <div className="col-12 col-md-5">
                
        <div className="publicidade h-100 text-white bg-secondary my-3 py-5 text-center">
          <br />
          <h5>Publicidade</h5>

          <br />
        </div>
            </div>
        </div>
   
        </div>

        <br />
        <br />
        <br />
        <br />

        <div className="lista-blog container">
          <div className="d-flex overflow-x-auto scroll-md gap-4">
            {/* <div className="card-blog rounded-1 border-lightt shadow-sm">
              <img src={b1} alt="" className="logo-blog" />
              <div className="bod px-3 pb-3">
                <br />
                <AbreviarTexto
                  texto={
                    "'Informacoa oode kwhewwhechjwbebcmegwmg wehggwe mugewmgduge2ufweg egwhjc  hegwfjgwehh evchj.egwfhgwefwe'"
                  }
                  largura={"350"}
                />

                <p className="d-flex pb-2 mt-1 my-auto gap-2 f-14">
                  <span className="my-auto text-secondary">23/12/2023</span>
                </p>
                <a className=" ">
                  Ler mais <i className="bi bi-arrow-right-short"></i>
                </a>
              </div>
            </div> */}
            {articles.map((artigo) => (
              <div className="card-blog rounded-1 border-lightt shadow-sm">
                <img src={artigo.coverImage} alt="" className="logo-blog" />
                <div className="bod px-3 pb-3">
                  <br />
                  <AbreviarTexto
                    texto={artigo.title}
                    largura={"390"}
                  />

                  <p className="d-flex pb-2 mt-1 my-auto gap-2 f-14">
                    <span className="my-auto text-secondary">{artigo.date}</span>
                  </p>
                  <a href={'/pt/blog/'+artigo.id} className=" ">
                    Ler matéria <i className="bi bi-arrow-right-short"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="publicidade text-white bg-secondary my-3 py-5 text-center">
          <br />
          <h5>Publicidade</h5>

          <br />
        </div>


        <Footer />
      </div>
    </div>
  );
};

export default Blog;
