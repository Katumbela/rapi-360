import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Header from "../components/header";
import Footer from "../components/footer";

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

  return (
    <div className="text-center">
      <Header nomee={nomee} emaill={emaill} cart={cart} />
      <br />
      <br />
      <img className="user-p" src={use.photo} alt="" />
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
      <button className="btn btn-primary" onClick={enviarMensagem}>
        salvar
      </button>

      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Perfil;
