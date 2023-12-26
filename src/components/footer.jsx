import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/footer.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../pages/firebase";
import Swal from "sweetalert";
import Loader from "./loader";
import icone from "../imgs/icone.png";
import logo from "../imgs/logo-d.png";
import icon from "../imgs/icon.png";
// import sendEmail from '../pages/server';

function Footer() {
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);

  const alert = (t) => {
    Swal.fire({
      title: "NewsLetter",
      text: t,
      icon: "success",
      confirmButtonText: "Ok",
    });
  };

  const NewsLetter = () => {
    setLoad(true);
    db.collection("newsletter")
      .add({
        email: email,
        dataEnvio: new Date(),
      })
      .then(() => {
        setEmail("");
        setLoad(false);
        toast.success(
          "Seu email foi adicionado a nossa newsletter com sucesso, obrigado!"
        );
        //   sendEmail(email, "NewsLetter Arotec", "Adicionado com sucesso!")
      })
      .catch((error) => {
        setLoad(false);
        toast.error("Erro ao enviar mensagem:" + error);
      });
  };

  return (
    <div className="footerr">
      <div className="container-fluid foo">
        <div className=" mt-4 footer">
          <div className=" row">
            <div className="col-12 my-2 my-md-1 col-sm-3 col-md-3 text-start">
              <h5 className="text-dark">Contacte nos</h5>
              <ul>
                <li>Endereço: Luanda - Angola</li>
                <li>Phone: +244 28 134 249</li>
                <li>E-mail: info@gokside.site</li>
              </ul>
            </div>
            <div className="col-12 my-2 my-md-1 col-sm-3 col-md-3 text-start">
              <h5 className="text-dark">Para empresas</h5>
              <ul>
                <li>
                  <NavLink className="footerlink rounded-1 text-white w-100 btn btn-success" to="/pt/login">
                    Área da empresa
                  </NavLink>
                </li>
                <li>
                  <NavLink className="footerlink" to="/pt/login">
                    Cadastrar empresa
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-12 my-2 my-md-1 col-sm-3 col-md-3 text-start">
              <h5 className="text-dark">Para consumidor</h5>
              <ul>
                <li>
                  <NavLink className="footerlink rounded-1 text-white btn btn-success w-100" to="/pt/prestadores">
                    Área do consumidor
                  </NavLink>
                </li>
                <li>
                  <NavLink className="footerlink" to="/pt/aquisitores">
                    Rankings
                  </NavLink>
                </li>
                <li>
                  <NavLink className="footerlink" to="/pt/aquisitores">
                    Buscar descontos
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-12 my-2 my-md-1 col-sm-3 col-md-3 text-start">
              <h5 className="text-dark">Central de Ajuda</h5>
              <ul>
                <li>
                  <NavLink className="footerlink btn btn-outline-danger rounded-1 w-100" to="/pt/politicas">
                    Reclamar de uma empresa
                  </NavLink>
                </li>
                <li>
                  <NavLink className="footerlink" to="/pt/reembolso">
                   Quero trocar minha senha
                  </NavLink>
                </li>
                <li>
                  <NavLink className="footerlink" to="/pt/seguro">
                    Blog R360
                  </NavLink>
                </li>
                <li>
                  <NavLink className="footerlink" to="/pt/itens">
                    Itens proibidos
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="d-flex text-success midias justify-content-between">
          <div className="d-flex gap-3 ms-4">
            <a href="https://www.facebook.com/Arotec1/" className="navlink">
              <i className="bi bi-facebook text-success"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/arotecangola"
              className="navlink"
            >
              <i className="bi mx-1 bi-linkedin text-success"></i>
            </a>
            <a href="https://www.instagram.com/arotec_ao/" className="navlink">
              <i className="bi bi-instagram text-success"></i>
            </a>
            <a
              href="https://www.youtube.com/channel/UCL9FnK9VQGhVowB59P72CjA"
              className="navlink"
            >
              <i className="bi ms-1 bi-youtube text-success"></i>
            </a>
          </div>
          <img src={icon} className="logo-blogg" alt="" />
          <div className="pol">
          <NavLink className="footerlink" to="/pt/politicas">
                    Termos & Políticas
                  </NavLink>

          </div>
        </div>
        <br />
        <center>
          <span>&copy; 2023 - Reputação 360 &middot; </span> Desenvolvido por{" "}
          <a
            href="http://linkedin.com/in/joao-afonso-katumbela"
            className="footerlink"
          >
            João A. Katombela
          </a>
        </center>
      </div>
    </div>
  );
}

export default Footer;
