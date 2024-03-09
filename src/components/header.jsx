import React, { useEffect, useState } from "react";
import iconn from "../imgs/logo-new.jpeg";
import logosm from "../imgs/logo-sm.png";
import "../css/header.css";
import { NavLink } from "react-router-dom";
import firebase from "firebase/compat/app";
import AbreviarTexto from "./abreviarTexto";

import notFound from "../imgs/not-found.png";
import ScrollToTopLink from "./scrollTopLink";
// import dadosEmpresas from "../model/empresas";
import { db } from "../pages/firebase";
import obterDadosDoFirebase from "../model/empresas2";
import ProfileCard from "./PerfilEmp";
import StarRating from "./starts";
const Header = (props) => {
  const [ph, setPh] = useState("");
  const [user, setUser] = useState(null);

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
            // console.warn(
            //   "Documento não encontrado no Firestore para o e-mail do usuário."
            // );
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

    const ordenarEmpresas = async () => {
      try {
        const dadosEmpresas = await obterDadosDoFirebase();

        setDadosEmpresas(dadosEmpresas);
      } catch (error) {
        console.error("Erro ao ordenar empresas:", error.message);
      }
    };

    ordenarEmpresas();

    return () => unsubscribe();
  }, []);

  const handleLoginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // login bem-sucedido, faça algo aqui
        setUser(result.user);

        // setEmaill(result.user.email);

        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          pictureUrl: result.user.pictureUrl,
          photo: result.user.photoURL,
          uid: result.user.uid,
          tel: result.user.phoneNumber,
        };

        localStorage.setItem("users", JSON.stringify(userData));
        // setNomee(result.user.displayName);
        // handleLogin(result);
        window.location.href = "/pt";
      })
      .catch((error) => {
        // erro no login, faça algo aqui
      });
  };

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

  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  // const handleInputChange = (e) => {
  //   const searchTerm = e.target.value;
  //   setSearchTerm(searchTerm);

  //   // Filtrar empresas com base no termo de pesquisa
  //   const results = dadosEmpresas.filter((empresa) => {
  //     const lowerCasedTerm = searchTerm.toLowerCase();
  //     return (
  //       empresa.nomeEmpresa && empresa.nomeEmpresa.toLowerCase().includes(lowerCasedTerm) ||
  //       empresa.site && empresa.siteEmpresa.toLowerCase().includes(lowerCasedTerm) ||
  //       empresa.nif && empresa.numeroBI.includes(searchTerm)
  //     );
  //   });

  //   // Atualizar os resultados da pesquisa
  //   setSearchResults(results);

  //   // Exibir as sugestões
  //   setShowSuggestions(true);
  // };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filtrar empresas com base no termo de pesquisa
    const results = dadosEmpresas.filter((empresa) => {
      const lowerCasedTerm = searchTerm.toLowerCase();
      const nomeEmpresaLowerCase = empresa.nomeEmpresa
        ? empresa.nomeEmpresa.toLowerCase()
        : "";
      const siteEmpresaLowerCase = empresa.siteEmpresa
        ? empresa.siteEmpresa.toLowerCase()
        : "";
      const numeroBI = empresa.numeroBI ? empresa.numeroBI : "";

      return (
        nomeEmpresaLowerCase.includes(lowerCasedTerm) ||
        siteEmpresaLowerCase.includes(lowerCasedTerm) ||
        numeroBI.includes(searchTerm)
      );
    });

    // Atualizar os resultados da pesquisa
    setSearchResults(results);

    // Exibir as sugestões
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

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);

        const userData = {
          name: "",
          email: "",
          pictureUrl: "",
          tel: "",
        };

        localStorage.setItem("users", JSON.stringify(userData));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
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
              type="text"
              name=""
              placeholder="Busque por nome, NIF ou site"
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
                {user ? (
                  <NavLink to={'/pt/perfil'} className="btn d-flex gap-2">
                    {" "}
                    <i className="bi tex-success bi-person-circle"></i>{" "}
                    <AbreviarTexto
                      className="text-success f-reg"
                      texto={user.name}
                      largura={100}
                    />{" "}
                  </NavLink>
                ) : (
                  <NavLink className={"btn btn-outline-success"} to="/pt/login">
                    {" "}
                    Entrar
                  </NavLink>
                )}
              </li>

              {user ? (
                <li>
                  <NavLink
                    onClick={handleLogout}
                    className={"my-auto btn btn-outline-danger"}
                  >
                    Sair
                  </NavLink>
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

      <div className={`menu-sm d-flex justify-content-between`}>
        <ScrollToTopLink to={"/pt/reclamar"}>
          <button className="btn rec btn-sm btn-danger">
            <i className="bi bi-megaphone me-1"></i> Reclamar
          </button>
        </ScrollToTopLink>

        <button className="burger b1" onClick={toggleMenu}>
          Menu <i className="bi bi-list"></i>
        </button>
      </div>

      <div className={`menu-ssm bg-secondary2 ${menuAberto ? "aberto" : ""}`}>
        <div className="w-100  text-endd">
          <button className="burger " onClick={toggleMenu}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <ScrollToTopLink
          className={"text-decoration-none text-dark"}
          to={"/pt/desconto"}
        >
          Descontos
        </ScrollToTopLink>

        <ScrollToTopLink
          className={"text-decoration-none text-dark"}
          to={"/pt/ranking"}
        >
          Ranking
        </ScrollToTopLink>

        <ScrollToTopLink
          className={"text-decoration-none text-dark"}
          to={"/pt/#blog"}
        >
          Blog
        </ScrollToTopLink>

        <ScrollToTopLink
          className={"text-decoration-none text-dark"}
          to={"/pt/empresa/produtos"}
        >
          <span className="premio-md">Produtos</span>
        </ScrollToTopLink>
        {user ? (
          <>
            <span className="btn text-success f-reg d-flex gap-2">
              {" "}
              {/* <i className="bi tex-success bi-person-circle"></i>{" "} */}
              <AbreviarTexto
                className="text-success f-reg"
                texto={user.name}
                largura={100}
              />{" "}
            </span>

            <NavLink
              onClick={handleLogout}
              className={"my-auto btn btn-outline-danger"}
            >
              Sair
            </NavLink>
          </>
        ) : (
          <>
            <ScrollToTopLink to={"/pt/login"}>
              <button className="btn rec btn-sm w-100 btn-outline-success">
                Login
              </button>
            </ScrollToTopLink>
            <ScrollToTopLink to={"/pt/cadastro"}>
              <button className="btn rec btn-sm btn-success w-100">
                Cadastro
              </button>
            </ScrollToTopLink>
          </>
        )}
      </div>
      {showSuggestions && (
        <div className="suggestions container-fluid py-sm-3">
          <br />
          <h5 className="f-reg">
            {showSuggestions ? (
              searchTerm !== "" ? (
                <></>
              ) : (
                <>
                  <b>As empresas mais buscadas do R360 nas últimas 24h</b>
                  <br />
                  <br />
                </>
              )
            ) : null}
          </h5>
          {(searchResults !== "") & (searchTerm !== "") ? (
            <>
              Resultados para: <b className="f-reg">{searchTerm}</b>
              <br />
              <br />
            </>
          ) : null}
          <div className="listas-lojas mb-3  d-flex gap-3 overflow-x-auto listas-descontos">
            {searchResults != "" ? (
              searchResults.slice(0, 5).map((empresa) => (
                <a
                  onClick={handleBlur}
                  key={empresa.id}
                  href={`/pt/empresa/${empresa.id}`}
                  className="card-loja text-decoration-none text-dark text-center rounded-1 border-lightt p-3 shadow-sm"
                >
                  <img src={empresa.logo} alt="" className="logo-empresa" />
                  <div className="bod">
                    <AbreviarTexto
                      texto={empresa.nomeEmpresa}
                      largura={"190"}
                    />

                    <p className="d-flex justify-content-center mt-1 my-auto gap-2 f-12">
                      <AbreviarTexto
                        texto={empresa.enderecoEmpresa}
                        largura={"300"}
                        className="my-auto text-secondary"
                      ></AbreviarTexto>
                    </p>
                    <div className="d-flex mt-2 gap-2 justify-content-center">
                      <h5>{empresa.avaliacao}</h5>
                      <span className="text-secondary">/ 5</span>
                    </div>
                    <div className="f-16 d-flex gap-2 justify-content-center">
                      <StarRating
                        title={empresa.avaliacao}
                        className="f-16 mx-auto"
                        rating={empresa.avaliacao}
                      />
                    </div>

                    {/* <div className="d-flex gap-2 justify-content-center">
                      {empresa.avaliacao >= 5.0 && empresa.avaliacao <= 6.9 ? (
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
                      <h4 className="f-reg my-auto">
                        <b>{empresa.avaliacao} </b>
                      </h4>
                      <span className="text-secondary f-12 mt-auto">/ 5</span>
                    </div> */}
                  </div>
                </a>
              ))
            ) : showSuggestions ? (
              searchTerm !== "" ? (
                <p className="text-center py-3 w-100 mx-auto f-14">
                  <img src={notFound} style={{ height: "8em" }} alt="" />
                  <p>
                    {" "}
                    Nenhum resultado encontrado, parece que esta empresa ainda
                    não está cadastrado.{" "}
                    <a href="/pt/solicitar-cadastro">
                      Solicite o cadastro
                    </a>{" "}
                    desta empresa
                  </p>
                </p>
              ) : dadosEmpresas.length != 0 ? (
                <>
                  {dadosEmpresas.map((empresa) => (
                    <a
                      onClick={handleBlur}
                      key={empresa.id}
                      href={`/pt/empresa/${empresa.id}`}
                      className="card-loja text-decoration-none text-dark text-center rounded-1 border-lightt p-3 shadow-sm"
                    >
                      <img src={empresa.logo} alt="" className="logo-empresa" />
                      <div className="bod">
                        <AbreviarTexto
                          texto={empresa.nomeEmpresa}
                          largura={"190"}
                        />

                        <p className="d-flex justify-content-center mt-1 my-auto gap-2 f-12">
                          <AbreviarTexto
                            texto={empresa.enderecoEmpresa}
                            largura={"300"}
                            className="my-auto text-secondary"
                          ></AbreviarTexto>
                        </p>

                        <div className="d-flex  gap-2 justify-content-center">
                                <h5>{empresa.avaliacao}</h5>
                                <span className="text-secondary">/ 5</span>
                              </div>
                              <div className="f-16 d-flex gap-2 justify-content-center">
                                <StarRating
                                  title={empresa.avaliacao}
                                  className="f-16 mx-auto"
                                  rating={empresa.avaliacao}
                                />
                              </div>
                      </div>
                    </a>
                  ))}
                </>
              ) : (
                <>
                  <div className="d-flex gap-3">
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                  </div>
                </>
              )
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
