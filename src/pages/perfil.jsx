import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import user from '../imgs/default.png';
import Header from "../components/header";
import Footer from "../components/footer";
import { db } from "./firebase";
import ReclamacaoItem from "../components/reclamacaoComponent/reclamacaoComponent";
import Comment from "../components/skeletons/comment";

function Perfil({ nomee, emaill, cart }) {
  const { uid } = useParams();
  const [mensagem, setMensagem] = useState("");
  const [use, setUser] = useState({});
  const [ph, setPh] = useState("");

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
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

    return unsubscribe;
  }, []);

  useEffect(() => {
    const userString = localStorage.getItem("users");
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
      setPh(user.photo);

      obterTelefonePorEmail(user.email);
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

  const verificarEAtualizar = async () => {
    console.log("Chamando verificarEAtualizar");

    const usersRef = firebase.firestore().collection("users");

    // Verifique se já existe um documento com o mesmo e-mail e UID
    const existingUser = await usersRef
      .where("email", "==", use.email)
      .where("uid", "==", use.uid)
      .get();

    if (!existingUser.empty) {
      // Se o documento existir, atualize
      await existingUser.docs[0].ref.update({
        tel: mensagem,
      });

      Swal.fire({
        icon: "success",
        title: "Dados atualizados com sucesso!",
      });
    } else {
      // Se o documento não existir, adicione
      await usersRef.add({
        uid: use.uid,
        email: use.email,
        tel: mensagem,
      });

      Swal.fire({
        icon: "success",
        title: "Dados adicionados com sucesso!",
      });
    }
  };

  // Função para obter o telefone com base no e-mail
  const obterTelefonePorEmail = async (email) => {
    try {
      const usersRef = firebase.firestore().collection("users");
      const snapshot = await usersRef.where("email", "==", email).get();

      if (!snapshot.empty) {
        const documento = snapshot.docs[0].data();
        const telefone = documento.tel;

        // Atualize o estado com o telefone obtido
        setUser((prevState) => ({
          ...prevState,
          tel: telefone,
        }));
      }
    } catch (error) {
      console.error("Erro ao obter telefone por e-mail:", error);
    }
  };

  const enviarMensagem = () => {
    verificarEAtualizar();
  };
  


  const [reclamacoesEmpresa, setReclamacoesEmpresa] = useState([]);

  useEffect(() => {
    const pegarEmpresa = async () => {
      try {
       
        

          // Supondo que as reclamações estejam em uma coleção "reclamacoes"
          const reclamacoesRef = db.collection("reclamacoes");
          const reclamacoesSnapshot = await reclamacoesRef
            .where("emailCliente", "==", use.email)
            .get();

          try {
            const reclamacoesData = reclamacoesSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            setReclamacoesEmpresa(reclamacoesData);
          } catch (error) {
            console.error("Erro ao obter reclamações:", error.message);
          }
      } catch (error) {
        console.error("Erro ao pegar empresa:", error.message);
      }
    };

    pegarEmpresa();
  }, [use]);


  const [reclamacoesParaExibir, setReclamacoesParaExibir] = useState(4);

  const handleVerMais = () => {
    setReclamacoesParaExibir((prevCount) => prevCount + 4);
  };

  const handleVerMenos = () => {
    setReclamacoesParaExibir((prevCount) => Math.max(prevCount - 4, 4));
  };

  return (
    <div className="text-center c">
      <Header nomee={nomee} emaill={emaill} cart={cart} />
      <br />
      <br />
      <img className="user-p " src={use.photo ?? user} alt="" />
      <h2>{use.name}</h2>
      <p className="f-12">{use.email}</p>
      <NavLink to={'/pt/login'} className="f-16 navlink">Sair</NavLink>
      <div className="text-start w-50 mx-auto">
        <br />
        <label htmlFor="" className="f-12 text-secondary">
          Adicione seu telefone
        </label>
        <input
          value={mensagem}
          type="tel"
          className=" mx-auto form-control"
          onChange={(e) => setMensagem(e.target.value)}
          placeholder={use.tel}
        />
      </div>
      <button className="btn btn-success" onClick={enviarMensagem}>
        salvar
      </button>

      <br />

      <center className="container">


      <br />
      <div className="container">
            <div className="card-sobre-empresa border-1 text-start  bg-white p-3">
              <b className="text-dark f-reg">Reclamações de clientes </b>

              {/* O que estão falando desta empresa, card */}
              {use.email ? (
                <>
                  {reclamacoesEmpresa?.length != 0 ? (
                    reclamacoesEmpresa
                      .slice(0, reclamacoesParaExibir)
                      .map((reclamacao, index) => (
                        <ReclamacaoItem key={index} reclamacao={reclamacao} />
                      ))
                  ) : (
                    <>
                      <center>
                        <br />
                        <br />
                        <i className="bi bi-megaphone f-24 text-secondary"></i>{" "}
                        <br />
                        <br />
                        <span className="text-secondary f-14 w-75">
                          Não há ainda reclamações ou avaliações pfeitas por sí
                        </span>
                       
                      </center>
                      <br />
                    </>
                  )}
                  {reclamacoesEmpresa.length > reclamacoesParaExibir && (
                    <div className="text-center my-3">
                      <button className="btn btn-link" onClick={handleVerMais}>
                        Ver mais Avaliações
                      </button>
                    </div>
                  )}
                  {reclamacoesParaExibir > 5 && (
                    <div className="text-center my-3">
                      <button className="btn btn-link" onClick={handleVerMenos}>
                        Ver menos Avaliações
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {[...Array(reclamacoesParaExibir)].map((_, index) => (
                    <Comment key={index} className="w-100" />
                  ))}
                  {reclamacoesParaExibir > 5 && (
                    <div className="text-center my-3">
                      <button className="btn btn-link" onClick={handleVerMenos}>
                        Ver menos Avaliações
                      </button>
                    </div>
                  )}
                  {reclamacoesParaExibir <= 5 && (
                    <div className="text-center my-3">
                      <button className="btn btn-link" onClick={handleVerMais}>
                        Ver mais Avaliações
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

      </div>
        
      </center>
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Perfil;
