import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { UserContext } from "./userContext";

import { NavLink } from "react-router-dom";
import "../css/login.css";
import logo from "../imgs/icone.png";
import logo2 from "../imgs/logo-d.png";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";

const CadastroConsumidor = ({ setNomee, setEmaill, cart, nomee, emaill }) => {
  const { handleLogin, push } = useContext(UserContext);

  document.title = `Cadastro de consumidor | Reputação 360`;
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
      <div className="c l mx-auto body pt-4 bg-light">
        <div className="container ">
          <div className="row ">
            <div className="col-12  text-center "></div>
            <div className="col-12  ">
              <div className="text-center">
                <br />
                <h2><b>Olá, crie uma conta no Reputação 360</b></h2>
                <p className="fw-light fw-400 fw-thin f-16">
                  Com você logado conseguimos oferecer um serviço melhor e mais
                  personalizado. Navegue logado e ajude outros milhões de
                  consumidores.
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
                      <div className="text-dark">
                        <div className="text-start mb-3 headc">
                          <b className="text-dark">
                            Preencha o formulário abaixo
                          </b>

                          <p>
                            <b className="text-danger">*</b>{" "}
                            <span className="text-secondary f-14">
                              Todos os campos são obrigatórios
                            </span>
                          </p>
                        </div>
                        <div className="titul">
                          <div className="d-flex gap-2">
                            <i className="bi text-success bi-person-circle"></i>{" "}
                            <b>Dados pessoais</b>
                          </div>
                        </div>
                        <div className="row text-start">
                          <div className="col-12 col-lg-6 my-2">
                            <label htmlFor="" className="text-secondary f-12">
                              <b className="text-danger">*</b> Nome completo
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1"
                              placeholder="Digite seu nome e sobrenome"
                            />
                          </div>
                          <br />
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
                          <div className="col-12 col-lg-6 my-2">
                            <label htmlFor="" className="text-secondary f-12">
                              <b className="text-danger">*</b> Data de
                              Nascimento
                            </label>
                            <input
                              type="date"
                              className="form-control rounded-1"
                            />
                          </div>
                          <br />
                          <div className="col-12 col-lg-6 my-2">
                            <label htmlFor="" className="text-secondary f-12">
                              Gênero
                            </label>
                            <select
                              name=""
                              id=""
                              className="form-control rounded-1"
                            >
                              <option value="Masculino">Masculino</option>
                              <option value="Feminino">Feminino</option>
                              <option value="Outro">Outro</option>
                            </select>
                          </div>
                          <br />
                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                              <b className="text-danger">*</b> Província
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1"
                              placeholder="Digite sua provincia de residência"
                            />
                          </div>
                          <br />
                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                              <b className="text-danger">*</b> Cidade
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1"
                              placeholder="Digite sua cidade atual"
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
                              <b className="text-danger">*</b> E-mail
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
                              <b className="text-danger">*</b> Telefone
                            </label>
                            <input
                              type="tel"
                              className="form-control rounded-1"
                              placeholder="Digite seu telefone atual"
                            />
                          </div>

                          <br />
                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                              <b className="text-danger">*</b> Crie uma senha
                            </label>
                            <input
                              type="password"
                              className="form-control rounded-1"
                              placeholder="Crie uma senha (min 8 caracteres)"
                              minLength={8}
                            />
                          </div>
                          <br />
                          <br />
                        </div>
                      </div>
                      <br />
                      <br />
                      <button className="d-flex text-white w-100  btn btn-success justify-content-center rounded-1">
                        <span>Cadastrar</span>
                      </button>
                    </>
                  )}
                </center>
              </div>
              <br />
              <br />
              <div className="container my-auto form">
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
                    <button
                      className="d-flex  w-100 btn-google btn btn-outline-primary"
                      onClick={handleLoginWithGoogle}
                    >
                      <span>Área da empresa</span>
                    </button>
                  </>
                </center>
              </div>
              <br />
              <div className="text-center">
                <span>
                  Já possui uma conta ? <a href="/pt/cadastro">faça login</a>{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      <br />
      <br />
      <br />
      </div>
      <Footer/>
    </>
  );
};

export default CadastroConsumidor;
