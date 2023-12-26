import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import '../css/footer.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../pages/firebase';
import Swal from 'sweetalert';
import Loader from './loader';
import icone from '../imgs/icone.png'
import logo from '../imgs/logo-d.png'
// import sendEmail from '../pages/server';


function Footer() {
    const [email, setEmail] = useState('');
    const [load, setLoad] = useState(false);

    const alert = (t) => {
        Swal.fire({
            title: 'NewsLetter',
            text: t,
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    }

    const NewsLetter = () => {
        setLoad(true)
        db.collection('newsletter').add({
            email: email,
            dataEnvio: new Date(),
        })
            .then(() => {
                setEmail('');
                setLoad(false);
                toast.success('Seu email foi adicionado a nossa newsletter com sucesso, obrigado!');
                //   sendEmail(email, "NewsLetter Arotec", "Adicionado com sucesso!")
            })
            .catch((error) => {
                setLoad(false);
                toast.error('Erro ao enviar mensagem:' + error);
            });
    }

    return (
        <div className='bg-dark'>
            <div className='container-lg foo'>
                <div className=" mt-4 bg-dark footer">
                    <div className=" row text-white">
                        <div className="col-12 my-2 my-md-1 col-sm-2 col-xl-1 col-md-2 text-start">
                            <img src={icone} className='logo-footer w-100' alt="" />
                        </div>
                        <div className="col-12 my-2 my-md-1 col-sm-3 col-md-3 text-start">
                            <h5 className="text-white">Contacte nos</h5>
                            <ul>
                                <li>Endereço: Luanda - Angola</li>
                                <li>Phone: +244 28 134 249</li>
                                <li>E-mail:  info@gokside.site</li>
                            </ul>
                            <div className="d-flex gap-3 ms-4">
                                <a href="https://www.facebook.com/Arotec1/" className="navlink">
                                    <i className="bi bi-facebook text-white"></i>
                                </a>
                                <a href="https://www.linkedin.com/company/arotecangola" className="navlink">
                                    <i className="bi mx-1 bi-linkedin text-white"></i>
                                </a>
                                <a href="https://www.instagram.com/arotec_ao/" className="navlink">
                                    <i className="bi bi-instagram text-white"></i>
                                </a>
                                <a href="https://www.youtube.com/channel/UCL9FnK9VQGhVowB59P72CjA" className="navlink">
                                    <i className="bi ms-1 bi-youtube text-white"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-12 my-2 my-md-1 col-sm-2 col-md-2 text-start">
                            <h5 className="text-white">Conta</h5>
                            <ul>
                                <li><NavLink className="footerlink" to="/pt/login">Entrar</NavLink></li>
                                <li><NavLink className="footerlink" to="/pt/login">Criar conta</NavLink></li>

                            </ul>
                        </div>
                        <div className="col-12 my-2 my-md-1 col-sm-2 col-md-2 text-start">
                            <h5 className="text-white">Reportes</h5>
                            <ul>
                                <li><NavLink className="footerlink" to="/pt/prestadores">De prestadores</NavLink></li>
                                <li><NavLink className="footerlink" to="/pt/aquisitores">De aquisitores</NavLink></li>

                            </ul>
                        </div>
                        <div className="col-12 my-2 my-md-1 col-sm-3 col-md-3 text-start">
                            <h5 className="text-white">Regulamentos</h5>
                            <ul>
                                <li><NavLink className="footerlink" to="/pt/politicas">Termos & Políticas</NavLink></li>
                                <li><NavLink className="footerlink" to="/pt/reembolso">Politicas de reembolso</NavLink></li>
                                <li><NavLink className="footerlink" to="/pt/seguro">Seguro de aluguel</NavLink></li>
                                <li><NavLink className="footerlink" to="/pt/itens">Itens proibidos</NavLink></li>

                            </ul>
                        </div>
                    </div>
                </div>
                <center><span>&copy; 2023 - D'Aluguel &middot; </span> Desenvolvido por <a href="http://linkedin.com/in/joao-afonso-katumbela" className='footerlink'>João A. Katombela</a></center>
            </div>

        </div>
    )
}

export default Footer;
