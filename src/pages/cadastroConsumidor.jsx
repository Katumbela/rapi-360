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
import ScrollToTopLink from "../components/scrollTopLink";
import { db } from "./firebase";
import Swal from "sweetalert2";

const CadastroConsumidor = ({ setNomee, setEmaill, cart, nomee, emaill }) => {
  const { handleLogin, push } = useContext(UserContext);

  document.title = `Cadastro de consumidor | Reputação 360`;
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  
  
  const handleRegister = async (userData) => {
    try {
      // Check if the email is already registered
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(
        userData.email,
        userData.password
      );

      // Send user data to Firestore if the registration is successful
      await db.collection("cliente").add({
        uid: userCredential.user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        ...userData,
      });

      console.log("User registered successfully!");

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Uhaa , Cadastrado!',
        text: 'Seu cadastro foi efectuado com sucesso, e você foi logado automáticamente.',
      });
      document.getElementsByTagName('name').value = ''; // Replace 'nomeCompleto' with the actual name attribute of the input field
      document.getElementsByTagName('bi').value = ''; // Replace 'numeroBI' with the actual name attribute of the input field
      // document.getElementsByTagName('dataNascimento').value = ''; // Replace 'dataNascimento' with the actual name attribute of the input field
      document.getElementsByTagName('phone').value = ''; // Replace 'telefone' with the actual name attribute of the input field
      // document.getElementsByTagName('provincia').value = ''; // Replace 'provincia' with the actual name attribute of the input field
      document.getElementsByTagName('address').value = ''; // Replace 'cidade' with the actual name attribute of the input field
      document.getElementsByTagName('email').value = ''; // Replace 'email' with the actual name attribute of the input field
      document.getElementsByTagName('password').value = ''; // Replace 'senha' with the actual name attribute of the input field


    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log("Email is already registered. Please log in.");

        // Show error alert
        Swal.fire({
          icon: 'warning',
          title: 'Opah !',
          text: 'Parece que seu email já se encontra em uso, faça login.',
        });
        document.getElementsByTagName('name').value = ''; // Replace 'nomeCompleto' with the actual name attribute of the input field
        document.getElementsByTagName('bi').value = ''; // Replace 'numeroBI' with the actual name attribute of the input field
        // document.getElementsByTagName('dataNascimento').value = ''; // Replace 'dataNascimento' with the actual name attribute of the input field
        document.getElementsByTagName('phone').value = ''; // Replace 'telefone' with the actual name attribute of the input field
        // document.getElementsByTagName('provincia').value = ''; // Replace 'provincia' with the actual name attribute of the input field
        document.getElementsByTagName('address').value = ''; // Replace 'cidade' with the actual name attribute of the input field
        document.getElementsByTagName('email').value = ''; // Replace 'email' with the actual name attribute of the input field
        document.getElementsByTagName('password').value = ''; // Replace 'senha' with the actual name attribute of the input field
  
      } else {
        console.error(error);

        // Show generic error alert
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'An error occurred during registration. Please try again later.',
        });
      }
    }
  };





  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      name: e.target.elements.name.value,
      bi: e.target.elements.bi.value,
      // birthdate: e.target.elements.birthdate.value,
      phone: e.target.elements.phone.value,
      // province: e.target.elements.province.value,
      city: e.target.elements.address.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };

    // Call backend to register user
    handleRegister(formData);
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
                  <b>Olá, crie uma conta no Reputação 360</b>
                </h2>
                <p className="fw-light fw-400 fw-thin f-16">
                  Com você logado conseguimos oferecer um serviço melhor e mais
                  personalizado. Navegue logado e ajude outros milhões de
                  consumidores.
                </p>
                <br />
              </div>
              <div className="container my-auto form-c form">
                <center>
                   
                    <form onSubmit={handleFormSubmit}>
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
                              name="name"
                              required
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
                              required
                              name="bi"
                              className="form-control rounded-1"
                              placeholder="###########"
                            />
                          </div>
                          <br />
                          {/* <div className="col-12 col-lg-6 my-2">
                            <label htmlFor="" className="text-secondary f-12">
                              Nascimento
                            </label>
                            <input
                            name="birthdate"
                              type="date"
                              className="form-control rounded-1"
                            />
                          </div> */}
                          {/* <br />
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
                          <br /> */}

                          <br />
                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                              <b className="text-danger">*</b> Telefone
                            </label>
                            <input
                              type="tel"
                              className="form-control rounded-1"
                              name="phone"

                              placeholder="Digite seu telefone atual"
                            />
                          </div>

                          <br />
                          {/* <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                              <b className="text-danger">*</b> Província
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1"
                              name="province"
                              placeholder="Digite sua provincia de residência"
                            />
                          </div>
                          <br /> */}
                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                              <b className="text-danger">*</b> Endereço
                            </label>
                            <input
                              type="text"
                              name="address"
                              required
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
                            required
                              type="email"
                              name="email"
                              className="form-control rounded-1"
                              placeholder="Digite seu melhor email"
                            />
                          </div>

                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                              <b className="text-danger">*</b> Crie uma senha
                            </label>
                            <input
                              type="password"
                              required
                              name="password"
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
                    </form>
                  
                </center>
              </div>
              <br />
              <br />
              <div className="container form-c my-auto form">
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
                    <ScrollToTopLink
                      to={"/pt/cadastro/empresa"}
                      className="d-flex gap-2 text-decoration-none w-100 btn-google btn btn-outline-primary"
                    >
                      <span>Cadastre sua empresa</span>{" "}
                      <i className="bi my-auto bi-arrow-right-short"></i>
                    </ScrollToTopLink>
                  </>
                </center>
              </div>
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

export default CadastroConsumidor;
