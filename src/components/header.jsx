import React, { useContext, useEffect, useState } from "react";
import logo from "../imgs/logo-d.png";
import cart from "../imgs/carrinho.png";
import iconn from "../imgs/iconn.png";
import logosm from "../imgs/logo-sm.png";
import "../css/header.css";
import { NavLink } from "react-router-dom";
import firebase from "firebase/compat/app";
import AbreviarTexto from "./abreviarTexto";

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
import ScrollToTopLink from "./scrollTopLink";
import dadosEmpresas from "../model/empresas";
const Header = (props) => {
  const [use, setUser] = useState([]);

  const [ph, setPh] = useState("");

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

  useEffect(() => {
    // Obtém o valor de 'users' do local storage quando o componente for montado
    const userString = localStorage.getItem("users");
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
      setPh(user.photo);
    } else {
      const userData = {
        name: "",
        email: "",
        pictureUrl: "",
        tel: "",
        uid: "",
      };
      setUser(userData);
    }
  }, []);

  const { nomee, emaill, cart } = props;

  let preco = 0;
  let qnt = 0;
  cart.map((item) => (preco += item.preco * item.qty));
  cart.map((item) => (qnt += item.qty));
  const [nav, setNav] = useState(0);

  const abrirMenu = () => {
    setNav(1);
    console.log("Menu Aberto!");
  };

  const fecharMenu = () => {
    setNav(!nav);
  };

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([
    "Sugestão 1",
    "Sugestão 2",
    "Sugestão 3",
  ]); // Adicione sugestões reais aqui

  // const handleInputChange = (e) => {
  //   setSearchTerm(e.target.value);
  //   setShowSuggestions(true);
  // };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    // Adicione lógica para lidar com a seleção da sugestão (por exemplo, redirecionamento)
  };

  // const handleBlur = () => {
  //   // Aguarde um curto período antes de fechar as sugestões para permitir o clique nas sugestões
  //   setTimeout(() => {
  //     setShowSuggestions(true);
  //   }, 200);
  // };

  // const handleInputClick = () => {
  //   // Exibir sugestões ao clicar no input
  //   setShowSuggestions(true);
  // };

  useEffect(() => {
    const handleOverflow = () => {
      // Adicione a classe para ocultar a rolagem vertical do corpo
      document.body.style.overflowY = showSuggestions ? "hidden" : "auto";
    };

    // Adicione um ouvinte de evento quando showSuggestions muda
    handleOverflow();

    // Limpe o ouvinte de evento ao desmontar o componente
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showSuggestions]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    // Aguarde um curto período antes de fechar as sugestões para permitir o clique nas sugestões
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleInputClick = () => {
    // Exibir sugestões ao clicar no input
    setShowSuggestions(true);
  };

  return (
    // <div className={`navbar ${visible ? 'navbar-show' : 'navbar-hide'}`}>

    <div className={` ${showSuggestions === true ? "nav-fixo" : ""}`}>
      <div
        onClick={handleBlur}
        className={` ${showSuggestions === true ? "backdrop" : ""}`}
      ></div>
      <div className={`nav bg-white py-2`}>
        <div className="d-flex container-lg container-fluid justify-content-between">
          <div className="logo">
            <NavLink to="/pt">
              <img src={iconn} alt="" className="logo-md" />
            </NavLink>
          </div>{" "}
          <div className="pesquisa pesquisa-md">
            <NavLink to="/pt">
              <img src={logosm} alt="" className="logo-sm" />
            </NavLink>
            <input
              type="search"
              name=""
              placeholder="Pesquise por empresa, NIF ou site"
              id=""
              value={searchTerm}
              onChange={handleInputChange}
              onClick={handleInputClick}
            />
            <i className="bi bi-search"></i>
          </div>
          <div className="item-menu menu-md">
            <ul>
              <li>
                <NavLink className={"btn btn-outline-success"} to="/pt/login">
                  {" "}
                  Entrar
                </NavLink>
              </li>

              {use.name !== "" ? (
                <li>
                  <NavLink to="/pt/add-artigo"> Add Artigo</NavLink>
                </li>
              ) : (
                <span></span>
              )}

              {use.name !== "" ? (
                <li>
                  <NavLink to="/pt/perfil">{use.name?.split(" ")[0]}</NavLink>
                </li>
              ) : (
                <li>
                  <NavLink className={"btn btn-success"} to="/pt/cadastro">
                    {" "}
                    Cadastro
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="menu-sm d-flex justify-content-between overflow-x-auto">
        <NavLink to={"/pt/login"}>Entrar</NavLink>

        <NavLink to={"/pt/cadastro"}>Cadastro</NavLink>

        <NavLink>
          <span className="premio-md">Prêmios</span>
        </NavLink>

        <NavLink to={"/pt/reclamar"}>
          <button className="btn rec btn-sm btn-danger">
            <i className="bi bi-megaphone me-1"></i> Reclamar
          </button>
        </NavLink>
      </div>
      {showSuggestions && (
        <div className="suggestions container-fluid py-sm-3">
          <br />
          <h5 className="f-reg">
            <b>As empresas mais buscadas do R360 nas últimas 24h</b>
          </h5>
          <br />
          <div className="listas-lojas mb-3  d-flex gap-3 overflow-x-auto listas-descontos">
       
            {dadosEmpresas.map((empresa) => (
            <a onClick={handleBlur} key={empresa.id} href={`/pt/empresa/${empresa.id}`} className="card-loja text-decoration-none text-dark text-center rounded-1 border-lightt p-3 shadow-sm">
              
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
                  <img src={otimo} alt="" className="icon-empresa" />
                  <h4 className="f-reg my-auto">
                    <b>{empresa.avaliacao} </b>
                  </h4>
                  <span className="text-secondary f-12 mt-auto">/ 10</span>
                </div>
              </div>
            </a>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
