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
import Swal from "sweetalert2";

const CadastroEmpresa = ({ setNomee, setEmaill, cart, nomee, emaill }) => {
  const { handleLogin, push } = useContext(UserContext);

  document.title = `Cadastrar Sua Empresa | Reputação 360`;
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    // Inicialize os campos do formulário com os names apropriados
    nomeEmpresa: "",
    nomeFantasia: "",
    emailEmpresa: "",
    outroEmail: "",
    numeroBI: "",
    siteEmpresa: "",
    enderecoEmpresa: "",
    provincia: "",
    cidade: "",
    nomeResponsavel: "",
    senha: "",
  });

  const handleCadastroEmpresa = async () => {
    try {
      const { emailEmpresa, senha } = formData;

      // Verificar se o e-mail já está registrado no Firebase Authentication
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailEmpresa, senha);

      // Obter o usuário autenticado
      const user = userCredential.user;

      // Enviar dados para a coleção "empresa" no Firestore
      const empresaRef = firebase.firestore().collection("empresa");
      await empresaRef.add({
        ...formData,
        userId: user.uid, // Adicione o UID do usuário, se necessário
      });

      // Mostrar mensagem de sucesso usando o SweetAlert
      Swal.fire({
        icon: "success",
        title: "Cadastro bem-sucedido!",
        text: "Sua empresa foi cadastrada com sucesso!",
      });

      // Limpar os campos do formulário após o sucesso
      setFormData({
        // ...
      });
    } catch (error) {
      // Se o e-mail já estiver registrado, tratar como uma situação diferente
      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "info",
          title: "E-mail já registrado!",
          text: "Este e-mail já está associado a uma conta. Faça login ou use outro e-mail.",
        });
      } else {
        // Mostrar mensagem de erro padrão usando o SweetAlert
        Swal.fire({
          icon: "error",
          title: "Ops!",
          text: " Por favor, preencha todos os campos e tente novamente.",
        });
      }

      console.error("Erro ao cadastrar empresa:", error);
    }
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
                            <input required
                              type="text"
                              className="form-control rounded-1"
                              placeholder="Digite seu nome e sobrenome"
                              name="nomeEmpresa"
                              value={formData.nomeEmpresa}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  nomeEmpresa: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="col-12 col-lg-6 my-2">
                            <label htmlFor="" className="text-secondary f-12">
                              Nome fantasia
                            </label>
                            <input required
                              type="text"
                              className="form-control rounded-1"
                              placeholder="Digite um outro nome (opcional) "
                              name="nomeFantasia"
                              value={formData.nomeFantasia}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  nomeFantasia: e.target.value,
                                })
                              }
                            />
                          </div>
                          <br />
                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                              E-mail da empresa <b className="text-danger">*</b>
                            </label>
                            <input required
                              type="email"
                              className="form-control rounded-1"
                              placeholder="Digite seu melhor email"
                              name="emailEmpresa"
                              value={formData.emailEmpresa}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  emailEmpresa: e.target.value,
                                })
                              }
                            />
                          </div>
                          <br />
                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                              Outro E-mail <b className="text-danger">*</b>
                            </label>
                            <input required
                              type="email"
                              className="form-control rounded-1"
                              placeholder="Digite outro email"
                              name="outroEmail"
                              value={formData.outroEmail}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  outroEmail: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="col-12 col-lg-6 my-2">
                            <label htmlFor="" className="text-secondary f-12">
                              <b className="text-danger">*</b> Nº BI/ NIF/
                              Passport
                            </label>
                            <input required
                              type="text"
                              className="form-control rounded-1"
                              placeholder="###########"
                              name="numeroBI"
                              value={formData.numeroBI}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  numeroBI: e.target.value,
                                })
                              }
                            />
                          </div>
                          <br />
                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                              Site da empresa <b className="text-danger">*</b>
                            </label>
                            <input required
                              type="link"
                              className="form-control rounded-1"
                              placeholder="www.reputa360.ao"
                              name="siteEmpresa"
                              value={formData.siteEmpresa}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  siteEmpresa: e.target.value,
                                })
                              }
                            />
                          </div>
                          <br />
                          <div className="col-12 my-2 col-lg-12">
                            <label htmlFor="" className="text-secondary f-12">
                              Endereço da empresa{" "}
                              <b className="text-danger">*</b>
                            </label>
                            <input required
                              type="email"
                              className="form-control rounded-1"
                              placeholder="Digite o endereço atual da empresa"
                              name="enderecoEmpresa"
                              value={formData.enderecoEmpresa}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  enderecoEmpresa: e.target.value,
                                })
                              }
                            />
                          </div>
                          <br />
                          <div className="col-12 col-lg-6 my-2">
                            <label htmlFor="" className="text-secondary f-12">
                              Província
                            </label>
                            <select
                              name="provincia"
                              id=""
                              className="form-control rounded-1"
                              value={formData.provincia}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  provincia: e.target.value,
                                })
                              }
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
                              <b className="text-danger">*</b> Cidade /
                              Município
                            </label>
                            <input required
                              type="text"
                              className="form-control rounded-1"
                              placeholder="Digite o município / cidade atual"
                              name="cidade"
                              value={formData.cidade}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  cidade: e.target.value,
                                })
                              }
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
                              Nome do responsável 1{" "}
                              <b className="text-danger">*</b>
                            </label>
                            <input required
                              type="email"
                              className="form-control rounded-1"
                              placeholder="Digite o nome completo"
                              name="nomeResponsavel"
                              value={formData.nomeResponsavel}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  nomeResponsavel: e.target.value,
                                })
                              }
                            />
                          </div>

                          <br />
                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                              Crie uma senha <b className="text-danger">*</b>
                            </label>
                            <input required
                              type="password"
                              className="form-control rounded-1"
                              placeholder="Crie uma senha (min 8 caracteres)"
                              minLength={8}
                              name="senha"
                              value={formData.senha}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  senha: e.target.value,
                                })
                              }
                            />
                          </div>
                          <br />
                        </div>
                    </div>
                    <br />
                    <button
                      onClick={handleCadastroEmpresa}
                      className="d-flex mb-4 text-white px-5 btn btn-primary justify-content-center rounded-1"
                    >
                      <span>Cadastrar</span>
                    </button>
                  </>
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
