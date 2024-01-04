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
import { db } from "./firebase";
import Swal from "sweetalert2";

const SolicitarCadastro = ({ setNomee, setEmaill, cart, nomee, emaill }) => {
  const { handleLogin, push } = useContext(UserContext);

  document.title = `Solicitar cadastro de uma empresa | Reputação 360`;

  const [user, setUser] = useState(null);
  const [empresaData, setEmpresaData] = useState({
    nome: "",
    website: "",
    contato: "",
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmpresaData({
      ...empresaData,
      [name]: value,
    });
  };

  // Função auxiliar para obter o nome do mês
  const getMonthName = (monthIndex) => {
    const monthNames = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    return monthNames[monthIndex];
  };
  
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} de ${getMonthName(currentDate.getMonth())} de ${currentDate.getFullYear()}`;



  const handleEnviarSolicitacao = async () => {
    try {
      // Verificar se os campos obrigatórios estão preenchidos
      if (!empresaData.nome || !empresaData.website || !empresaData.contato) {
        // Mostrar mensagem de erro se algum campo estiver vazio
        Swal.fire({
          icon: "warning",
          title: "Ops!",
          text: "Por favor, preencha todos os campos obrigatórios!",
        });
        return;
      }

      // Adicionar os dados da empresa à coleção "pedidos" no Firestore
      await db.collection("pedidos").add({
        nome: empresaData.nome,
        website: empresaData.website,
        contato: empresaData.contato,
        quando: formattedDate,
        // Outros campos necessários podem ser adicionados aqui
      });

      // Mensagem de sucesso
      Swal.fire({
        icon: "success",
        title: "Uhaa !",
        text: "Obrigado pela sua solicitação! Estamos avaliando a inclusão desta empresa e informaremos você assim que ela estiver disponível na plataforma. Agradecemos pela sua contribuição!",
      });

      // Limpar os campos após o envio bem-sucedido
      setEmpresaData({
        nome: "",
        website: "",
        contato: "",
      });
    } catch (error) {
      
      console.error("Erro ao enviar solicitação:");
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
      <div className="c mx-auto pb-5 body">
        <br />
        <br />
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
                  {/* Campos de entrada para nome, website e contato */}
                  <div className="col-12">
                    <label htmlFor="nome" className="text-secondary f-12">
                      Nome da empresa/entidade
                    </label>
                    <input
                      type="text"
                      name="nome"
                      className="form-control rounded-1"
                      value={empresaData.nome}
                      onChange={handleInputChange}
                    />
                  </div>
                  <br />
                  <div className="col-12">
                    <label htmlFor="website" className="text-secondary f-12">
                      Website da empresa/entidade
                    </label>
                    <input
                      type="text"
                      name="website"
                      className="form-control rounded-1"
                      value={empresaData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                  <br />
                  <div className="col-12">
                    <label htmlFor="contato" className="text-secondary f-12">
                      Email ou Telefone da empresa caso tenha
                    </label>
                    <input
                      type="text"
                      name="contato"
                      className="form-control rounded-1"
                      value={empresaData.contato}
                      onChange={handleInputChange}
                    />
                  </div>
                  <br />
                </div>
              </div>
              {/* Botão para enviar a solicitação */}
              <button
                className="d-flex w-100 rounded-1 justify-content-center btn btn-success"
                onClick={handleEnviarSolicitacao}
              >
                <span>Enviar solicitação</span>
              </button>
            </>
          </center>
        </div>
        {/* Restante do seu código... */}
      </div>
      <Footer />
    </>
  );
};

export default SolicitarCadastro;
