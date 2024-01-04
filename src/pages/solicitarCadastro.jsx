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

const SolicitarCadastro = ({ setNomee, setEmaill, cart, nomee, emaill }) => {
  const { handleLogin, push } = useContext(UserContext);


  document.title = `Solicitar cadastro de uma empresa | Reputação 360`;

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);


  return (
    <>
      <Header
        style={{ marginBottom: "5rem" }}
        nomee={nomee}
        emaill={emaill}
        cart={cart}
      />
      <div className="c mx-auto pb-5 body">
        <br />
        <br />
        <br />
        <div className="row ">
          <div className="col-12  text-center pt-sm-0 pt-lg-0"></div>
          <div className="col-12  pt-sm-5 ">
            <div className="text-center">
              <h4 className="f-reg">Solicite o cadastro desta empresa</h4>
              <p className="fw-light fw-400 w-75 container fw-thin f-14">
                Caso não tenha encontrado a empresa que deseja reclamar ou
                avaliar, você pode solicitar o cadastro desta empresa no R360
                fornecendo apenas alguma informações e nós entraremos em contato
                com a empresa para os próximos procedimentos
              </p>
            </div>
            <div className="container pb-5 my-auto form">
              <center>
               
                  <>
                    <div>
                      <div className=" text-start">
                        <div className="col-12">
                          <label htmlFor="" className="text-secondary f-12">
                            Nome da empresa/entidade{" "}
                          </label>
                          <input
                            type="link"
                            className="form-control rounded-1"
                          />
                        </div>
                        <br />
                        <div className="col-12">
                          <label htmlFor="" className="text-secondary f-12">
                            Website da empresa/entidade{" "}
                          </label>
                          <input
                            type="link"
                            className="form-control rounded-1"
                          />
                        </div>
                        <br />
                        <div className="col-12">
                          <label htmlFor="" className="text-secondary f-12">
                            Email ou Telefone da empresa caso tenha
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-1"
                            placeholder=""
                          />
                        </div>
                        <br />
                      </div>
                    </div>
                    <button className="d-flex w-100 rounded-1 justify-content-center btn btn-success">
                      <span>Enviar solicitação</span>
                    </button>
                  </>
              </center>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SolicitarCadastro;
