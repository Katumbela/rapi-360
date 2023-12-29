import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { UserContext } from "../userContext";

import { NavLink } from "react-router-dom";
import "../../css/login.css";
import logo from "../../imgs/icone.png";
import logo2 from "../../imgs/logo-d.png";
import axios from "axios";
import Header from "../../components/header";
import Footer from "../../components/footer";

const CadastroEmpresa = ({ setNomee, setEmaill, cart, nomee, emaill }) => {
  const { handleLogin, push } = useContext(UserContext);

  document.title = `Cadastrar Sua Empresa | Reputação 360`;
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const handleLoginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // login bem-sucedido, faça algo aqui
        setUser(result.user);

        setEmaill(result.user.email);

        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          pictureUrl: result.user.pictureUrl,
          photo: result.user.photoURL,
          uid: result.user.uid,
          tel: result.user.phoneNumber,
        };

        localStorage.setItem("users", JSON.stringify(userData));
        setNomee(result.user.displayName);
        handleLogin(result);
        window.location.href = "/pt";
      })
      .catch((error) => {
        // erro no login, faça algo aqui
      });
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);

        setEmaill("");
        setNomee("");
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

  return (
    <>
      <Header
        style={{ marginBottom: "5rem" }}
        nomee={nomee}
        emaill={emaill}
        cart={cart}
      />
      <div className="c  mx-auto body pt-4 bg-light">
        <div className="container ">
          <div className="row ">
            <div className="col-12  text-center "></div>
            <div className="col-12  ">
              <div className="text-center">
                <br />
                <h2>
                  <b>Cadastre sua empresa no Reputação 360</b>
                </h2>
                <p className="fw-light fw-400 fw-thin f-16">
                  Obtenha ou gere leads e comunique se com seus consumidores no
                  melhor lugar.
                </p>
                <br />
              </div>
              <div className="container my-auto form-c form">
                <center>
                  {user ? (
                    <div>
                      <p className="text-primary">
                        Você está logado como <b> {user.displayName}</b> <br />
                        <span className="text-secondary">
                          Email: {user.email}
                        </span>
                      </p>

                      <button className="btn btn-danger" onClick={handleLogout}>
                        Sair
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="text-dark p-3">
                        <div className="text-start mb-4 headc">
                          {/* <b className="text-dark">
                            Preencha o formulário abaixo
                          </b> */}

                          <p>
                            <b className="text-danger">*</b>{" "}
                            <span className="text-secondary f-14">
                              Todos os campos são obrigatórios
                            </span>
                          </p>
                        </div>
                        {/* <div className="titul">
                          <div className="d-flex gap-2">
                            <i className="bi text-success bi-person-circle"></i>{" "}
                            <b>Dados pessoais</b>
                          </div>
                        </div> */}
                        <div className="row text-start">
                          <div className="col-12 col-lg-6 my-2">
                            <label htmlFor="" className="text-secondary f-12">
                              Nome da empresa <b className="text-danger">*</b>
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1"
                              placeholder="Digite seu nome e sobrenome"
                            />
                          </div>
                          <div className="col-12 col-lg-6 my-2">
                            <label htmlFor="" className="text-secondary f-12">
                              Nome fantasia
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1"
                              placeholder="Digite um outro nome (opcional) "
                            />
                          </div>
                          <br />
                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                              E-mail da empresa <b className="text-danger">*</b>
                            </label>
                            <input
                              type="email"
                              className="form-control rounded-1"
                              placeholder="Digite seu melhor email"
                            />
                          </div>
                          <br />
                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                              Outro E-mail <b className="text-danger">*</b>
                            </label>
                            <input
                              type="email"
                              className="form-control rounded-1"
                              placeholder="Digite outro email"
                            />
                          </div>
                          <div className="col-12 col-lg-6 my-2">
                            <label htmlFor="" className="text-secondary f-12">
                              <b className="text-danger">*</b> Nº BI/ NIF/
                              Passport
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1"
                              placeholder="###########"
                            />
                          </div>
                          <br />
                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                              Site da empresa <b className="text-danger">*</b>
                            </label>
                            <input
                              type="link"
                              className="form-control rounded-1"
                              placeholder="www.reputa360.ao"
                            />
                          </div>
                          <br />
                          <div className="col-12 my-2 col-lg-12">
                            <label htmlFor="" className="text-secondary f-12">
                              Endereço da empresa
                              <b className="text-danger">*</b>
                            </label>
                            <input
                              type="email"
                              className="form-control rounded-1"
                              placeholder="Digite o endereço atual da empresa"
                            />
                          </div>
                          <br />
                          <div className="col-12 col-lg-6 my-2">
                            <label htmlFor="" className="text-secondary f-12">
                              Província
                            </label>
                            <select
                              name=""
                              id=""
                              className="form-control rounded-1"
                            >
                              <option value="Bengo">Bengo</option>
                              <option value="Benguela">Benguela</option>
                              <option value="Bié">Bié</option>
                              <option value="Cabinda">Cabinda</option>
                              <option value="Cuando Cubango">
                                Cuando Cubango
                              </option>
                              <option value="Cuanza Norte">Cuanza Norte</option>
                              <option value="Cuanza Sul">Cuanza Sul</option>
                              <option value="Cunene">Cunene</option>
                              <option value="Huambo">Huambo</option>
                              <option value="Huíla">Huíla</option>
                              <option value="Luanda">Luanda</option>
                              <option value="Lunda Norte">Lunda Norte</option>
                              <option value="Lunda Sul">Lunda Sul</option>
                              <option value="Malanje">Malanje</option>
                              <option value="Moxico">Moxico</option>
                              <option value="Namibe">Namibe</option>
                              <option value="Uíge">Uíge</option>
                              <option value="Zaire">Zaire</option>
                            </select>
                          </div>

                          <br />
                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                              <b className="text-danger">*</b> Cidade / Município
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1"
                              placeholder="Digite o município / cidade atual"
                            />
                          </div>
                          <br />

                          <br />
                          <div className="titul mt-3">
                            <div className="d-flex gap-2">
                              <i className="bi text-success bi-shield-lock-fill"></i>
                              <b>Dados de acesso</b>
                            </div>
                          </div>

                          <br />
                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                            Nome do responsável 1 <b className="text-danger">*</b>
                            </label>
                            <input
                              type="email"
                              className="form-control rounded-1"
                              placeholder="Digite seu melhor email"
                            />
                          </div>

                          <br />
                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                            Nome do responsável 1 <b className="text-danger">*</b> 
                            </label>
                            <input
                              type="tel"
                              className="form-control rounded-1"
                              placeholder="Digite seu telefone atual"
                            />
                          </div>

                          <br />
                          <div className="col-12 my-2 col-lg-12">
                            <label htmlFor="" className="text-secondary f-12">
                               Crie uma senha <b className="text-danger">*</b>
                            </label>
                            <input
                              type="password"
                              className="form-control rounded-1"
                              placeholder="Crie uma senha (min 8 caracteres)"
                              minLength={8}
                            />
                          </div>
                          <br />
                        </div>
                      </div>
                      <br />
                      <button className="d-flex mb-4 text-white px-5 btn btn-primary justify-content-center rounded-1">
                        <span>Cadastrar</span>
                      </button>
                    </>
                  )}
                </center>
              </div>
              <br />
              <br />
              {/* <div className="container form-c my-auto form">
                <center>
                  <>
                    <br />
                    <div className="pb-2">
                      <b className="text-dark">
                        É uma empresa e quer responder reclamações?
                      </b>
                      <br />
                      <span className="f-12 text-secondary">
                        Acesse a área da empresa para responder seus
                        consumidores
                      </span>
                    </div>
                    <button className="d-flex  w-100 btn-google btn btn-outline-primary">
                      <span>Área da empresa</span>
                    </button>
                  </>
                </center>
              </div> */}
              <br />
              <div className="text-center">
                <span>
                  Já possui uma conta ? <a href="/pt/login">faça login</a>{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
};

export default CadastroEmpresa;
