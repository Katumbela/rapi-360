import React, { useContext, useEffect, useState } from "react";
import logo from "../imgs/logo-d.png";
import cart from "../imgs/carrinho.png";
import iconn from "../imgs/iconn.png";
import logosm from "../imgs/logo-sm.png";
import "../css/header.css";
import { NavLink } from "react-router-dom";
import firebase from "firebase/compat/app";

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

  return (
    // <div className={`navbar ${visible ? 'navbar-show' : 'navbar-hide'}`}>
    <>
      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Navbar scroll</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{"--bs-scroll-height": " 100px;"}}>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Link
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/">Action</a></li>
                                    <li><a className="dropdown-item" href="/">Another action</a></li>
                                    <li><a className="dropdown-item" href="/">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true">Link</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> */}
      <div className="nav bg-white py-2">
        <div className="d-flex container-lg container-fluid justify-content-between">
          <div className="logo">
            <NavLink to="/pt">
              <img src={iconn} alt="" className="logo-md" />
              <img src={logosm} alt="" className="logo-sm" />
            </NavLink>
          </div>
          <div className="pesquisa pesquisa-md">
            <input
              type="search"
              name=""
              placeholder="Pesquise por empresa, NIF ou site"
              id=""
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
                  <NavLink className={"btn btn-success"} to="/pt/login">
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
        <NavLink>Entrar</NavLink>

        <NavLink>Cadastro</NavLink>

        <NavLink>Prêmios R360</NavLink>

        <button className="btn rec btn-sm btn-danger">
          <i className="bi bi-megaphone me-2"></i> Reclamar
        </button>
      </div>
    </>
  );
};

export default Header;
