import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { UserContext } from "../userContext";

import { NavLink } from "react-router-dom";
import "../../css/login.css";
import Header from "../../components/header";
import ScrollToTopLink from "../../components/scrollTopLink";
import Swal from "sweetalert2";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/loader";

const LoginEmpresa = ({ setNomee, setEmaill, cart, nomee, emaill }) => {
  const { handleLogin, push } = useContext(UserContext);

  document.title = `Entrar para sua conta | Reputação 360`;

  const [user, setUser] = useState(null);

  // verificar login do usuario
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Consultar o Firestore para obter o documento do usuário com base no e-mail
          const querySnapshot = await db
            .collection("empresa")
            .where("email", "==", user.email)
            .get();

          if (!querySnapshot.empty) {
            // Se houver um documento correspondente, obter os dados
            const userData = {
              name: querySnapshot.docs[0].get("empresaNome"),
              email: querySnapshot.docs[0].get("emailEmpresa"),
              pictureUrl: user.logo,
              uid: user.userId,
              conta: querySnapshot.docs[0].get("conta"),
              categoria: querySnapshot.docs[0].get("categoria"),
              tel: querySnapshot.docs[0].get("whatsapp"),
              // Adicione outros campos conforme necessário
              nome: querySnapshot.docs[0].get("empresaNome"),
              city: querySnapshot.docs[0].get("enderecoEmpresa"),
              site: querySnapshot.docs[0].get("siteEmpresa"),
              sobre: querySnapshot.docs[0].get("sobre"),
              // Adicione outros campos conforme necessário
            };

            // Atualizar o estado do usuário com os dados
            setUser(userData);

            // Salvar dados no localStorage
            localStorage.setItem("users", JSON.stringify(userData));
          } else {
            console.warn(
              "Documento não encontrado no Firestore para o e-mail do usuário."
            );
          }
        } catch (error) {
          console.error("Erro ao buscar dados do Firestore:", error);
        }
      } else {
        // Se o usuário não estiver logado, defina o estado do usuário como null
        setUser(null);
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

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

  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  //   const handleLoginWithEmailAndPassword = () => {
  //     setLoad(true);
  //     firebase
  //       .auth()
  //       .signInWithEmailAndPassword(email, password)
  //       .then((result) => {
  //         // Login bem-sucedido, faça algo aqui
  //         setEmaill(result.user.email);
  //         setNomee(result.user.displayName);

  //         const userData = {
  //           name: result.user.displayName,
  //           email: result.user.email,
  //           // Adicione outros dados do usuário conforme necessário
  //         };

  //         setLoad(false);
  //         localStorage.setItem("users", JSON.stringify(userData));
  //         window.location.href = "/pt";
  //       })
  //       .catch((error) => {
  //         if (
  //           error.code === "auth/invalid-login-credentials" ||
  //           error.code === "auth/invalid-email"
  //         ) {
  //           // Verificar se o usuário existe
  //           firebase
  //             .auth()
  //             .fetchSignInMethodsForEmail(email)
  //             .then((signInMethods) => {
  //               if (signInMethods.includes("google.com")) {
  //                 setLoad(false);
  //                 // Usuário registrado com Google, mostre a mensagem apropriada
  //                 Swal.fire({
  //                   icon: "info",
  //                   title: "Conta registrada com Google",
  //                   text: "Esta conta foi registrada com o Google. Faça login com o Google.",
  //                 });
  //               } else {
  //                 setLoad(false);
  //                 // Usuário registrado com e-mail e senha, mostre a mensagem de erro padrão
  //                 Swal.fire({
  //                   icon: "error",
  //                   title: "Ops!",
  //                   text: error.message,
  //                 });
  //               }
  //             })
  //             .catch((fetchError) => {
  //               setLoad(false);
  //               toast.warning(fetchError.message.split(":")[1]);
  //               console.error(fetchError);
  //             });
  //         } else {
  //           // Erro padrão
  //           Swal.fire({
  //             icon: "error",
  //             title: "Erro de sistema!",
  //             text: "Ocorreu um erro no sistema, por favor tente novamente mais tarde.",
  //           });
  //         }
  //       });
  //   };
  
  const handleLoginWithEmailAndPassword = () => {
    setLoad(true);
  
    // Autenticação pelo Firestore
    firebase
      .firestore()
      .collection("empresa")
      .where("emailEmpresa", "==", email)
      .where("senha", "==", password)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Se houver um documento correspondente, obter os dados
          const userData = {
            name: querySnapshot.docs[0].get("nomeEmpresa"),
            email: querySnapshot.docs[0].get("emailEmpresa"),
            pictureUrl: querySnapshot.docs[0].get("logo"), // Verifique o nome correto do campo para a URL da imagem
            uid: querySnapshot.docs[0].id, // Obtém o ID do documento como UID
            conta: querySnapshot.docs[0].get("conta"),
            categoria: querySnapshot.docs[0].get("categoria"),
            tel: querySnapshot.docs[0].get("whatsapp"),
            nome: querySnapshot.docs[0].get("nomeEmpresa"),
            city: querySnapshot.docs[0].get("enderecoEmpresa"),
            site: querySnapshot.docs[0].get("siteEmpresa"),
            sobre: querySnapshot.docs[0].get("sobre"),
            nif: querySnapshot.docs[0].get("numeroBI"),
            quando: querySnapshot.docs[0].get("quando"),
            fb: querySnapshot.docs[0].get("fb"),
            insta: querySnapshot.docs[0].get("insta"),
            youtube: querySnapshot.docs[0].get("youtube"),
            // Adicione outros campos conforme necessário
          };
  
          // Salvar dados no localStorage empresa
          localStorage.setItem("empresa", JSON.stringify(userData));
  
          setEmaill(userData.email);
          setNomee(userData.name);
  
          // Redirecionar para a página de perfil da empresa
          window.location.href = "/pt/perfil/minha-empresa";
        } else {
          // Credenciais inválidas
          Swal.fire({
            icon: "error",
            title: "Credenciais Inválidas!",
            text: "Por favor, verifique seu e-mail e senha e tente novamente.",
          });
        }
        setLoad(false);
      })
      .catch((error) => {
        // Erro de sistema
        Swal.fire({
          icon: "error",
          title: "Erro de sistema!",
          text: "Ocorreu um erro no sistema, por favor tente novamente mais tarde.",
        });
        setLoad(false);
        console.error(error);
      });
  };
  

  return (
    <>
      <ToastContainer />
      <Header
        style={{ marginBottom: "5rem" }}
        nomee={nomee}
        emaill={emaill}
        cart={cart}
      />
      <div className="c mx-auto pb-5 body">
        <div className="row ">
          <div className="col-12  text-center pt-sm-0 pt-lg-0"></div>
          <div className="col-12  pt-sm-5 ">
            <div className="text-center">
              <h4 className="f-reg">Acesse sua empresa</h4>
              <p className="fw-light fw-400 fw-thin f-14">
                Responda consumidores e utilize os dados a seu favor e melhore a
                experiência do seu cliente
              </p>
            </div>
            <div className="container pb-4 my-auto form">
              <center>
                {user ? (
                  <div>
                    <p className="text-primary">
                      Você está logado como <b></b> <br />
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
                            Email ou Telefone
                          </label>
                          <input
                            type="email"
                            className="form-control rounded-1"
                            placeholder="Digite o email"
                            value={email}
                            onChange={handleChangeEmail}
                          />
                        </div>
                        <br />
                        <div className="col-12">
                          <label htmlFor="" className="text-secondary f-12">
                            Palavra passe
                          </label>
                          <input
                            type="password"
                            className="form-control rounded-1"
                            placeholder="Digite sua palavra passe"
                            value={password}
                            onChange={handleChangePassword}
                          />
                        </div>
                        <br />
                      </div>
                    </div>

                    {/* Botão de login */}
                    <button
                      disabled={load}
                      className="d-flex w-100 rounded-1 justify-content-center btn btn-primary"
                      onClick={handleLoginWithEmailAndPassword}
                    >
                      {load ? <Loader /> : <span>Entrar</span>}
                    </button>
                    <br />
                    <a href="/pt/login">Entrar como cliente</a>
                  </>
                )}
              </center>
            </div>
            <br />
            <div className="container my-auto form">
              <center>
                <>
                  <div className="pb-2">
                    <b className="text-dark">Não tem uma conta ?</b>
                  </div>
                  <ScrollToTopLink
                    to={"/pt/cadastro"}
                    className="d-flex  w-100 btn-google btn btn-outline-primary"
                  >
                    <span>Faça seu cadastro</span>
                  </ScrollToTopLink>
                </>
              </center>
            </div>
            <br />
            {/* <div className="text-center">
              <span>
                Não tem uma conta ? <a href="/pt/cadastro">Cadastre-se</a>{" "}
              </span>
            </div> */}
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default LoginEmpresa;
