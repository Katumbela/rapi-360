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
import ScrollToTopLink from "./scrollTopLink";
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
    <div className="footerr bg-dark">
      <div className="container-fluid foo">
        <div className=" mt-4 footer">
          <div className=" row">
            <div className="col-12 container px-3 text-start py-3">
            <img src={icon} className="logo-foo rounded-2" alt="" />
       
            </div>
            <div className="col-12 my-2 my-md-1 col-sm-3 col-md-3 text-start">
              <h5 className="">Contacte nos</h5>
              <ul className="ende">
                <li>Endereço: Luanda - Angola</li>
                <li>Phone: +244 928 134 249</li>
                <li>E-mail: info@reputacao360.online</li>
              </ul>
            </div>
            <div className="col-12 my-2 my-md-1 col-sm-3 col-md-3 text-start">
              <h5 className="">Para empresas</h5>
              <ul>
                <li>
                  <ScrollToTopLink className="footerlink -sm rounded-1 text-white   -success" to="/pt/login">
                    Área da empresa
                  </ScrollToTopLink>
                </li>
                <li>
                  <ScrollToTopLink  className="footerlink" to="/pt/cadastro/empresa">
                    Cadastrar empresa
                  </ScrollToTopLink>
                </li>
              </ul>
            </div>
            <div className="col-12 my-2 my-md-1 col-sm-3 col-md-3 text-start">
              <h5 className="">Para consumidor</h5>
              <ul>
                <li>
                  <ScrollToTopLink className="footerlink -sm rounded-1 text-white  -success" to="/pt/login">
                    Área do consumidor
                  </ScrollToTopLink>
                </li>
                <li>
                  <ScrollToTopLink className="footerlink" to="/pt/ranking">
                    Rankings
                  </ScrollToTopLink>
                </li>
                <li>
                  <ScrollToTopLink className="footerlink" to="/pt/descontos">
                    Buscar descontos
                  </ScrollToTopLink>
                </li>
              </ul>
            </div>
            <div className="col-12 my-2 my-md-1 col-sm-3 col-md-3 text-start">
              <h5 className="">Central de Ajuda</h5>
              <ul>
                <li>
                  <ScrollToTopLink className="footerlink -sm  -outline-danger rounded-1 " to="/pt/reclamar">
                    Reclamar de uma empresa
                  </ScrollToTopLink>
                </li>
                <li>
                  <ScrollToTopLink className="footerlink" to="/pt/central-de-ajuda">
                   Preciso de ajuda
                  </ScrollToTopLink>
                </li>
                <li>
                  <ScrollToTopLink className="footerlink" to="/pt/blog">
                    Blog R360
                  </ScrollToTopLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="d-flex bg-dark flex-wrap text-success midias justify-content-between">
          <div className="d-flex gap-3 ms-4">
            <a target="__blank" href="https://www.facebook.com/j.a.katombela/" className="navlink">
              <i className="bi bi-facebook text-success"></i>
            </a>
            <a target="__blank"
              href="https://www.linkedin.com/company/reputa360"
              className="navlink"
            >
              <i className="bi mx-1 bi-linkedin text-success"></i>
            </a>
            <a target="__blank" href="https://www.instagram.com/afonso.katumbela/" className="navlink">
              <i className="bi bi-instagram text-success"></i>
            </a>
          
          </div>
         <div className="pol">
          <ScrollToTopLink className="link" to="/pt/politicas">
                    Termos & Políticas
                  </ScrollToTopLink>

          </div>
        </div>
        <center className="bg-dark">
        <br />
          <span>&copy; 2024 - Reputação 360 &middot; </span> Desenvolvido por{" "}
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
