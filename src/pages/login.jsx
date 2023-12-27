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

const Login = ({ setNomee, setEmaill, cart, nomee, emaill }) => {
  const { handleLogin, push } = useContext(UserContext);

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
      <div className="c l mx-auto body">
        <div className="row ">
          <div className="col-12  text-center "></div>
          <div className="col-12  ">
            <div className="text-center">
              <h4>Que bom que você vai usar o R360</h4>
              <p className="fw-light fw-400 fw-thin f-14">
                Insira o login e senha para acessar sua área do consumidor.
              </p>
            </div>
            <div className="container my-auto form">
           
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
                    <div>
                      <div className=" text-start">
                        <div className="col-12">
                          <label htmlFor="" className="text-secondary f-12">
                            Email ou Telefone{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-1"
                            placeholder="Digite o email ou telefone"
                          />
                        </div>
                        <br />
                        <div className="col-12">
                          <label htmlFor="" className="text-secondary f-12">
                            Palavra passe
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-1"
                            placeholder="Digite sua palavra passe"
                          />
                        </div>
                        <br />
                      </div>
                    </div>
                    <button
                      className="d-flex text-white w-100 btn-google btn btn-primary"
                      onClick={handleLoginWithGoogle}
                    >
                      <span>Entrar</span>
                    </button>
                  </>
                )}
              </center>
            </div>
            <br />
            <div className="container my-auto form">
             
              <center>
               
                  <>
                  <div className="pb-2">
                  <b className="text-dark">Você é uma empresa?</b>
                  
                  </div>
                    <button
                      className="d-flex  w-100 btn-google btn btn-outline-primary"
                      onClick={handleLoginWithGoogle}
                    >
                      <span>Acessar área da empresa</span>
                    </button>
                  </>
            
              </center>
            </div>
            <br />
            <div className="text-center">
                <span>Não tem uma conta ? <a href="/pt/cadastro">Cadastre-se</a> </span>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Login;
