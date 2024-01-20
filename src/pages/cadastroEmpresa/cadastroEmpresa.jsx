import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { v4 as uuidv4 } from "uuid";

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
  const [load, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Inicialize os campos do formulário com os names apropriados
    nomeEmpresa: "",
    emailEmpresa: "",
    numeroBI: "",
    siteEmpresa: "",
    whatsapp: "",
    enderecoEmpresa: "",
    sobre: "",
    nomeResponsavel: "",
    senha: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [capaFile, setCapaFile] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
  };

  const handleCapaChange = (e) => {
    const file = e.target.files[0];
    setCapaFile(file);
  };

  // Função auxiliar para obter o nome do mês
  const getMonthName = (monthIndex) => {
    const monthNames = [
      "jan",
      "fev",
      "mar",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "set",
      "out",
      "nov",
      "dez",
    ];
    return monthNames[monthIndex];
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} de ${getMonthName(
    currentDate.getMonth()
  )} de ${currentDate.getFullYear()}`;

  const handleCadastroEmpresa = async () => {
    setLoading(true);
    try {
      const { emailEmpresa, senha } = formData;

      // Verificar se as imagens foram selecionadas
      if (!logoFile || !capaFile) {
        setLoading(false);
        Swal.fire({
          icon: "info",
          title: "Imagens não selecionadas!",
          text: "Por favor, selecione a logo e a capa da empresa.",
        });
        return;
      }
      // Verificar se o e-mail já está registrado no Firebase Authentication
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailEmpresa, senha);
      const user = userCredential.user;

      // Upload de logo e capa para o Storage
      const logoFileName = `empresas/${uuidv4()}_${logoFile.name}`;
      const capaFileName = `empresas/${uuidv4()}_${capaFile.name}`;

      const storageRef = firebase.storage().ref();

      // Upload de logo
      const logoFileRef = storageRef.child(logoFileName);
      await logoFileRef.put(logoFile);
      const logoFileURL = await logoFileRef.getDownloadURL();

      // Upload de capa
      const capaFileRef = storageRef.child(capaFileName);
      await capaFileRef.put(capaFile);
      const capaFileURL = await capaFileRef.getDownloadURL();

      // Enviar dados para a coleção "empresa" no Firestore
      const empresaRef = firebase.firestore().collection("empresa");
      await empresaRef.add({
        ...formData,
        conta: "empresa",
        insta: "",
        youtube: "",
        fb: "",
        selo: false,
        userId: user.uid,
        logo: logoFileURL,
        capa: capaFileURL,
        quando: formattedDate,
      });

      // Mostrar mensagem de sucesso usando o SweetAlert
      Swal.fire({
        icon: "success",
        title: "Cadastro bem-sucedido!",
        text: "Sua empresa foi cadastrada com sucesso!",
      });
      setLoading(false);

      // Limpar os campos do formulário após o sucesso
      setFormData({
        // ... nomeEmpresa: "",
        emailEmpresa: "",
        numeroBI: "",
        siteEmpresa: "",
        whatsapp: "",
        enderecoEmpresa: "",
        sobre: "",
        nomeResponsavel: "",
        senha: "",
        categoria: "",
      });
      setLogoFile(null);
      setCapaFile(null);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao cadastrar empresa:", error);
    }
  };

  const handleCategoriaChange = (event) => {
    setFormData({
      ...formData,
      categoria: event.target.value,
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
                  <>
                    <div className="text-dark p-3">
                      <div className="text-start mb-4 headc">
                        <p>
                          <b className="text-danger">*</b>{" "}
                          <span className="text-secondary f-14">
                            Todos os campos são obrigatórios
                          </span>
                        </p>
                      </div>

                      <div className="row text-start">
                        <div className="col-12 my-2 col-lg-6">
                          <label htmlFor="" className="text-secondary f-12">
                            Logo da empresa <b className="text-danger">*</b>
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            className="form-control rounded-1"
                            onChange={handleLogoChange}
                          />
                        </div>

                        <div className="col-12 my-2 col-lg-6">
                          <label htmlFor="" className="text-secondary f-12">
                            Capa da empresa <b className="text-danger">*</b>
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            className="form-control rounded-1"
                            onChange={handleCapaChange}
                          />
                        </div>

                        <div className="col-12 col-lg-6 my-2">
                          <label htmlFor="" className="text-secondary f-12">
                            Nome da empresa <b className="text-danger">*</b>
                          </label>
                          <input
                            required
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

                        <div className="col-12 my-2 col-lg-6">
                          <label htmlFor="" className="text-secondary f-12">
                            E-mail da empresa <b className="text-danger">*</b>
                          </label>
                          <input
                            required
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

                        <div className="col-12 col-lg-6 my-2">
                          <label htmlFor="" className="text-secondary f-12">
                            <b className="text-danger">*</b> Nº BI/ NIF/
                            Passport
                          </label>
                          <input
                            required
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
                          <input
                            required
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
                            Sobre a empresa <b className="text-danger">*</b>
                          </label>
                          <textarea
                            required
                            className="form-control rounded-1"
                            placeholder="Forneça uma breve descrição da empresa"
                            name="sobre"
                            value={formData.sobre}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                sobre: e.target.value,
                              })
                            }
                          ></textarea>
                        </div>
                        <br />
                        <div className="col-12 my-2 col-md-6">
                          <label htmlFor="" className="text-secondary f-12">
                            Endereço da empresa <b className="text-danger">*</b>
                          </label>
                          <input
                            required
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

                        <br />
                        <div className="col-12 my-2 col-md-6">
                          <label htmlFor="" className="text-secondary f-12">
                            Telefone (Whatsapp preferêncial){" "}
                            <b className="text-danger">*</b>
                          </label>
                          <input
                            required
                            type="email"
                            className="form-control rounded-1"
                            placeholder="Digite o endereço atual da empresa"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                whatsapp: e.target.value,
                              })
                            }
                          />
                        </div>
                        <br />
                        <br />
                        <div className="col-12 my-2 col-md-12">
                          <label htmlFor="" className="text-secondary f-12">
                            Categoria da empresa / Negócio
                            <b className="text-danger">*</b>
                          </label>
                          <select
                            id="categoria"
                            name="categoria"
                            className="form-select"
                            value={formData.categoria}
                            onChange={handleCategoriaChange}
                          >
                            {/* Opções do select */}
                            <option value="">Selecione uma categoria</option>
                            <option value="Educacao">Educação & EdTech</option>
                            <option value="Startup">Startup</option>
                            <option value="supermercados">Supermercados</option>
                            <option value="bancos">Bancos</option>
                            <option value="telefoniaETV">
                              Telefonia, TV & Internet
                            </option>
                            <option value="belezaEEstetica">
                              Beleza & Estética
                            </option>
                            <option value="seguradoras">Seguradoras</option>
                            <option value="sitesEPortais">
                              Sites & Portais
                            </option>
                            <option value="LojaOnline">Loja Online</option>
                            <option value="Pagina">Pagina </option>
                            <option value="softwares">Softwares</option>
                            <option value="Saas">Saas</option>
                            <option value="ecommerce">E-commerce</option>
                            <option value="Outro">Outro</option>
                          </select>
                        </div>
                        <br />

                        <br />
                        <div className="titul mt-3">
                          <div className="d-flex gap-2">
                            <i className="bi text-success bi-shield-lock-fill"></i>
                            <b>Outros Dados</b>
                          </div>
                        </div>

                        <br />
                        <div className="col-12 my-2 col-lg-6">
                          <label htmlFor="" className="text-secondary f-12">
                            Nome do responsável <b className="text-danger">*</b>
                          </label>
                          <input
                            required
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
                          <input
                            required
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
                      disabled={load}
                      onClick={handleCadastroEmpresa}
                      className="d-flex mb-4 text-white px-5 btn btn-primary justify-content-center rounded-1"
                    >
                      {load ? (
                        <span>Cadastrando...</span>
                      ) : (
                        <span>Cadastrar</span>
                      )}
                    </button>
                  </>
                </center>
              </div>
              <br />
              <br />

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
