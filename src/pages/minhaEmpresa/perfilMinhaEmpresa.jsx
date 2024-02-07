import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import user from "../../imgs/default.png";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { db } from "../firebase";
import ReclamacaoItem from "../../components/reclamacaoComponent/reclamacaoComponent";
import Comment from "../../components/skeletons/comment";
import ReclamacaoIt from "../../components/reclamacaoComponent/reclamacaoItem2";

function PerfilMinhaEmpresa({ nomee, emaill, cart }) {
  const { uid } = useParams();
  const [mensagem, setMensagem] = useState("");
  const [use, setUser] = useState({});
  const [empresa, setEmpresa] = useState({});
  const [ph, setPh] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [outrosDados, setOutrosDados] = useState({
    cidade: "",
    site: "",
    fb: "-",
    insta: "-",
    youtube: "-",
    sobre: "",
  });

  useEffect(() => {
    const userString = localStorage.getItem("empresa");
    if (userString) {
      const empresa = JSON.parse(userString);
      setEmpresa(empresa);

      // Preencher os campos de entrada com os dados existentes
      setTelefone(empresa.tel);
      //   console.log(empresa);
      setOutrosDados({
        cidade: empresa.city,
        site: empresa.site,
        sobre: empresa.sobre,
      });
    } else {
      const empresaData = {
        name: "",
        email: "",
        pictureUrl: "",
        tel: "",
        uid: "",
      };
      setEmpresa(empresaData);
    }
  }, []);

  const atualizarInformacoes = async () => {
    setPh(true);
    try {
      // Consulta para obter o documento com base no email da empresa
      const empresaRef = firebase
        .firestore()
        .collection("empresa")
        .where("emailEmpresa", "==", empresa.email);
      const querySnapshot = await empresaRef.get();

      // Verificar se a consulta retornou algum documento
      if (!querySnapshot.empty) {
        // Atualizar o primeiro documento retornado pela consulta
        const doc = querySnapshot.docs[0];
        await doc.ref.update({
          tel: telefone,
          ciendereoEmpresaty: outrosDados.cidade,
          site: outrosDados.site,
          fb: outrosDados.fb,
          site: outrosDados.site,
          insta: outrosDados.insta,
          youtube: outrosDados.youtube,
          sobre: outrosDados.sobre,
          // Adicione outros campos conforme necessário
        });
        setPh(false);
        Swal.fire({
          icon: "success",
          title: "Informações atualizadas com sucesso!",
        });
      } else {
        // Se não houver nenhum documento correspondente ao email
        setPh(false);
        Swal.fire({
          icon: "error",
          title: "Erro ao atualizar informações",
          text: "Não foi possível encontrar um documento com o email da empresa.",
        });
      }
    } catch (error) {
      setPh(false);
      console.error("Erro ao atualizar informações:", error);
      Swal.fire({
        icon: "warning",
        title: "Erro ao atualizar informações",
        text: "Ocorreu um erro ao tentar atualizar as informações , preencha todos os campos.",
      });
    }
  };

  const verificarEAtualizar = async () => {
    console.log("Chamando verificarEAtualizar");

    const usersRef = firebase.firestore().collection("empresa");

    // Verifique se já existe um documento com o mesmo e-mail e UID
    const existingUser = await usersRef
      .where("emailEmpresa", "==", empresa.email)
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
      const usersRef = firebase.firestore().collection("empresa");
      const snapshot = await usersRef
        .where("emailEmpresa", "==", empresa.email)
        .get();

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
      //   console.error("Erro ao obter telefone por e-mail:", error);
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
          .where("nomeEmpresa", "==", empresa.nome)
          .get();

        try {
          const reclamacoesData = reclamacoesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log(reclamacoesData[0])
          setReclamacoesEmpresa(reclamacoesData);
        } catch (error) {
          //   console.error("Erro ao obter reclamações:", error.message);
        }
      } catch (error) {
        // console.error("Erro ao pegar empresa:", error.message, use.userId);
      }
    };

    pegarEmpresa();
  }, [empresa]);

  const [reclamacoesParaExibir, setReclamacoesParaExibir] = useState(4);

  const handleVerMais = () => {
    setReclamacoesParaExibir((prevCount) => prevCount + 4);
  };

  const handleVerMenos = () => {
    setReclamacoesParaExibir((prevCount) => Math.max(prevCount - 4, 4));
  };

  return (
    <>
      <Header nomee={nomee} emaill={emaill} cart={cart} />

      <div className="text-center c">
        <img className="user-p " src={empresa.pictureUrl ?? user} alt="" />
        <h2>{empresa.nome}</h2>
        <span className="f-12 text-secondary">
          ID:{" "}
          <b>
            <a href={"/pt/empresa/" + empresa.uid}>{empresa.uid}</a>
          </b>
        </span>
        <p className="f-12">{empresa.email}</p>
        <NavLink to={"/pt/login"} className="f-16 navlink">
          Terminar Sesssão
        </NavLink>

        {/* Formulário para atualizar informações */}

        <div className="row container mx-auto">
          <div className="col-12 col-md-5">
            <div className="text-start">
              <br />
              <label htmlFor="" className="f-12 text-secondary">
                Telefone
              </label>
              <input
                value={telefone}
                type="tel"
                className=" mx-auto form-control"
                onChange={(e) => setTelefone(e.target.value)}
              />

              {/* Adicione outros campos conforme necessário */}
              <label htmlFor="" className="f-12 text-secondary">
                Cidade
              </label>
              <input
                value={outrosDados.cidade}
                type="text"
                className=" mx-auto form-control"
                onChange={(e) =>
                  setOutrosDados({ ...outrosDados, cidade: e.target.value })
                }
              />

              <label htmlFor="" className="f-12 text-secondary">
                Site
              </label>
              <input
                value={outrosDados.site}
                type="text"
                className=" mx-auto form-control"
                onChange={(e) =>
                  setOutrosDados({ ...outrosDados, site: e.target.value })
                }
              />

              <label htmlFor="" className="f-12 text-secondary">
                Sobre
              </label>
              <textarea
                value={outrosDados.sobre}
                className=" mx-auto form-control"
                onChange={(e) =>
                  setOutrosDados({ ...outrosDados, sobre: e.target.value })
                }
              />

              {/* Inputs para os campos adicionais */}
              <label htmlFor="" className="f-12 text-secondary">
                Facebook
              </label>
              <input
                value={outrosDados.fb}
                type="text"
                className=" mx-auto form-control"
                onChange={(e) =>
                  setOutrosDados({ ...outrosDados, fb: e.target.value })
                }
              />

              <label htmlFor="" className="f-12 text-secondary">
                Instagram
              </label>
              <input
                value={outrosDados.insta}
                type="text"
                className=" mx-auto form-control"
                onChange={(e) =>
                  setOutrosDados({ ...outrosDados, insta: e.target.value })
                }
              />

              <label htmlFor="" className="f-12 text-secondary">
                YouTube
              </label>
              <input
                value={outrosDados.youtube}
                type="text"
                className=" mx-auto form-control"
                onChange={(e) =>
                  setOutrosDados({ ...outrosDados, youtube: e.target.value })
                }
              />
            </div>
            <button
              disabled={ph}
              className="btn btn-sm btn-success"
              onClick={atualizarInformacoes}
            >
              {ph ? "Atualizando..." : "Atualizar"}
            </button>

            {/* Restante do código para exibição de reclamações e outras informações */}

            <br />
          </div>

          <div className="col-12 col-md-7">
            <center className="">
              <br />
              <div className="container">
                <div className="card-sobre-empresa border-1 text-start  bg-white p-3">
                  <b className="text-dark f-reg">Reclamações de clientes </b>

                  {/* O que estão falando desta empresa, card */}
                  {empresa.email ? (
                    <>
                      {reclamacoesEmpresa?.length != 0 ? (
                        reclamacoesEmpresa
                          .sort((a, b) => {
                            // Função para converter a string de data em um objeto Date
                            const dateA = new Date(a.quando);
                            const dateB = new Date(b.quando);

                            // Classificar as datas pelo mais recente
                            return dateA - dateB;
                          })
                          .slice(0, reclamacoesParaExibir)
                          .map((reclamacao, index) => (
                            <ReclamacaoIt key={index} reclamacao={reclamacao} />
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
                              Não há ainda reclamações ou avaliações feitas por
                              sí
                            </span>
                          </center>
                          <br />
                        </>
                      )}
                      {reclamacoesEmpresa.length > reclamacoesParaExibir && (
                        <div className="text-center my-3">
                          <button
                            className="btn btn-link"
                            onClick={handleVerMais}
                          >
                            Ver mais Avaliações
                          </button>
                        </div>
                      )}
                      {reclamacoesParaExibir > 5 && (
                        <div className="text-center my-3">
                          <button
                            className="btn btn-link"
                            onClick={handleVerMenos}
                          >
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
                          <button
                            className="btn btn-link"
                            onClick={handleVerMenos}
                          >
                            Ver menos Avaliações
                          </button>
                        </div>
                      )}
                      {reclamacoesParaExibir <= 5 && (
                        <div className="text-center my-3">
                          <button
                            className="btn btn-link"
                            onClick={handleVerMais}
                          >
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
          </div>
        </div>

        <br />
        <Footer />
      </div>
    </>
  );
}

export default PerfilMinhaEmpresa;
