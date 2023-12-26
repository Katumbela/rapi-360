import { useEffect, useState } from "react";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Header from "../components/header";
import Footer from "../components/footer";
import { toast } from "react-toastify";
import { db } from "./firebase";
import firebase from "firebase/compat/app";
import { v4 as uuidv4 } from "uuid";
import BannerPreto from "../components/banner_preto";
import { NavLink } from "react-router-dom";

function SubmitP({ nomee, emaill, cart }) {
  const [fotoUrl, setFotoUrl] = useState("");
  document.title = "Adicionar material/equipamento | D'Aluguel";

  const [use, setUser] = useState([]);

  useEffect(() => {
    // Adicione um listener para o estado da autenticação
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // Se não houver usuário autenticado, redirecione para a página de login

        const userData = {
          name: "",
          email: "",
          tel: "",
          uid: "",
        };

        localStorage.setItem("users", JSON.stringify(userData));
      }
    });

    // Retorne uma função de limpeza para remover o listener quando o componente for desmontado
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Obtém o valor de 'users' do local storage quando o componente for montado
    const userString = localStorage.getItem("users");
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);

      // Aqui você pode chamar uma função para obter o telefone com base no e-mail
      obterTelefonePorEmail(user.email);
    } else {
      const userData = {
        name: "",
        email: "",
        pictureUrl: "",
        tel: "",
      };
      setUser(userData);
    }
  }, []);

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

  const uiid = uuidv4();

  const [projeto, setProjeto] = useState({
    nome: "",
    ano: "",
    marca: "",
    modelo: "",
    endereco: "",
    descricao: "",
    oitoh: "",
    dia: "",
    semana: "",
    ummes: "",
    minimo: "",
    id: uiid,
  });

  // Adiciona um estado para rastrear se todos os campos estão preenchidos
  const [todosCamposPreenchidos, setTodosCamposPreenchidos] = useState(false);

  const handleChange = (event) => {
    setProjeto({
      ...projeto,
      [event.target.name]: event.target.value,
    });
    const camposPreenchidos = Object.values(projeto).every((campo) => {
      // Verifica se o campo é uma string antes de chamar trim()
      if (typeof campo === "string") {
        return campo.trim() !== "";
      }
      // Se não for uma string, considera como preenchido
      return true;
    });
    setTodosCamposPreenchidos(camposPreenchidos);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    const { email, photo, displayName, uid } = user;

    // Verifique se projeto.imagens está definido antes de mapear
    const imagens = projeto.imagens
      ? projeto.imagens.map((imagem) => imagem.name)
      : [];

    addDoc(collection(db, "projetos"), {
      ...projeto,
      email: email,
      nome: displayName,
      fotoUrls: imagens,
      tel: use.tel,
      uid: uid,
      photo: user?.photo || "",
    })
      .then(() => {
        toast.info("Projeto adicionado com sucesso!");
      })
      .catch((erro) => {
        toast.info("Erro ao adicionar o projeto:", erro);
      });

    // Resetar o estado do todosCamposPreenchidos
    setTodosCamposPreenchidos(false);
  };

  const handleFileInputChange = (event) => {
    const arquivos = event.target.files;
    const storage = getStorage();

    Promise.all(
      Array.from(arquivos).map((arquivo) => {
        // Gera um nome de arquivo único baseado no tempo atual e no nome original do arquivo
        const nomeUnico = `${Date.now()}-${arquivo.name}`;

        const storageRef = ref(storage, `projectos/${nomeUnico}`);
        return uploadBytes(storageRef, arquivo)
          .then((snapshot) => getDownloadURL(snapshot.ref))
          .then((url) => ({ name: nomeUnico, url })) // Adiciona o nome do arquivo único ao objeto
          .catch((erro) => {
            console.error("Erro ao enviar o arquivo:", erro);
            throw erro;
          });
      })
    )
      .then((urlsImagens) => {
        // Atualiza o estado do projeto incrementalmente
        setProjeto((prevProjeto) => ({
          ...prevProjeto,
          imagens: [...(prevProjeto.imagens || []), ...urlsImagens],
        }));
      })
      .catch((erro) => {
        console.error("Erro ao enviar arquivos:", erro);
      });
  };

  return (
    <div className="">
      <Header cart={cart} nomee={nomee} emaill={emaill} />
      <BannerPreto>Adicionar Artigo</BannerPreto>
      <br />
      <br />
      <br />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <b>Adicione seu equipamento/material {use.name}!</b>
          <br />
          <hr />
        {
          use.tel !== '' ?

          <>
          <div className="row">
            <div className="col-12 col-sm-4 my-2">
              <label htmlFor="titulo" className="f-12 text-secondary">
                Nome
              </label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={projeto.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-sm-4 my-2">
              <label htmlFor="titulo" className="f-12 text-secondary">
                Marca
              </label>
              <input
                type="text"
                className="form-control"
                name="marca"
                value={projeto.marca}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-sm-4 my-2">
              <label htmlFor="titulo" className="f-12 text-secondary">
                Modelo
              </label>
              <input
                type="text"
                className="form-control"
                name="modelo"
                value={projeto.modelo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 my-2">
              <label htmlFor="descricao" className="f-12 text-secondary">
                Descricão do Projeto
              </label>
              <textarea
                maxLength={2000}
                type="text"
                placeholder="Adicione uma descricao "
                className="form-control"
                name="descricao"
                value={projeto.descricao}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="col-12 col-sm-6 my-2">
              <label htmlFor="thumbnail" className="f-12 text-secondary">
                Imagens (Adicione no mínimo 3)
              </label>
              <input
                multiple
                type="file"
                id="thumbnail"
                name="thumbnail"
                className="form-control"
                onChange={handleFileInputChange}
                required
              />
            </div>
            <div className="col-12 col-sm-6 my-2">
              <label htmlFor="titulo" className="f-12 text-secondary">
                Ano de fabrico
              </label>
              <input
                type="number"
                className="form-control"
                name="ano"
                value={projeto.ano}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-sm-6 my-2">
              <label htmlFor="titulo" className="f-12 text-secondary">
                Localização
              </label>
              <input
                type="text"
                className="form-control"
                name="endereco"
                value={projeto.endereco}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-sm-6 my-2">
              <label htmlFor="link" className="f-12 text-secondary">
                Tempo mínimo de Aluguel
              </label>
              <select
                className="form-control"
                name="minimo"
                value={projeto.minimo}
                onChange={handleChange}
                required
                id=""
              >
                <option value="">Selecione</option>
                <option value="1 hora">1 Hora</option>
                <option value="3 horas">3 horas</option>
                <option value="5 horas">5 horas</option>
                <option value="1 dia">1 dia</option>
                <option value="1 semana">1 semana</option>
                <option value="1 mês">1 mês</option>
              </select>
            </div>
          </div>
          <div className="col-12 my-2">
            <fieldset>
              <div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Hora/tempo</th>
                      <th>Preço (AOA)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>8h</td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="oitoh"
                          value={projeto.oitoh}
                          onChange={handleChange}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>1 dia</td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="dia"
                          value={projeto.dia}
                          onChange={handleChange}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>1 semana</td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="semana"
                          value={projeto.semana}
                          onChange={handleChange}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>1 mês</td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="ummes"
                          value={projeto.ummes}
                          onChange={handleChange}
                          required
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>
          </div>
          <div className="d-grid mt-4">
            <button
              disabled={!todosCamposPreenchidos}
              type="submit"
              className="btn btn-primary btn-block text-dark"
            >
              Enviar Artigo
            </button>
          </div>
        </>

        :

        <>
        <br />
         <center>Adicione primeiro seu <NavLink to={'/pt/perfil'}>telefone</NavLink> para adicionar seu equipamento!</center>
        </>
        }
        </form>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default SubmitP;
