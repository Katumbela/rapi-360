import { Route, BrowserRouter, Routes } from "react-router-dom";
import Contactar from "./contactar";
import CriarConta from "./criar_conta";
import DetalheCurso from "./detalhe_curso";
import Home from "./home";
import Login from "./login";
import Politicas from "./politicas";
import { useEffect, useState } from "react";
import { UserProvider } from "./userContext";
import SubmitP from "./enviar_projecto";
import NotFoundPage from "./notfound";
import Faqs from "./faqs";
import Itens from "./itens_permitidos";
import Reembolso from "./reembolso";
import Seguro from "./seguro_aluguel";
import EnviarMensagem from "./enviar_mensagem";
import Mensagens from "./mensagens";
import Conversa from "./conversa";
import Perfil from "./perfil";


const RotasPT = (props) => {

    const {emaill, setEmaill, nomee, setNomee, cart, adicionar, remover, handleClick } = props;

    return (
        <BrowserRouter>
            <UserProvider>
                <Routes >

                    <Route path="/pt/enviar-mensagem/:uid" exact element={<EnviarMensagem  nomee={nomee} emaill={emaill} cart={cart} />} />
                    <Route element={<Home nomee={nomee} emaill={emaill} cart={cart} />} path="/pt/" />
                    <Route element={<Mensagens nomee={nomee} emaill={emaill} cart={cart}/>} path="/pt/mensagens" />
                    <Route element={<Perfil nomee={nomee} emaill={emaill} cart={cart}/>} path="/pt/perfil" />
                    <Route element={<Conversa nomee={nomee} emaill={emaill} cart={cart}/>} path="/pt/conversa/:uid" />
                    <Route element={<NotFoundPage nomee={nomee} emaill={emaill} cart={cart}/>}  />
                    <Route element={<Contactar  nomee={nomee} emaill={emaill} cart={cart} />} path="/pt/contactar" exact />
                    <Route element={<Faqs  nomee={nomee} emaill={emaill} cart={cart} />} path="/pt/faqs" exact />
                    <Route element={<Login cart={cart}  emaill={emaill} setEmaill = {setEmaill} nomee={nomee} setNomee={setNomee}  />} path="/pt/login" exact />
                    <Route element={<NotFoundPage/>}/>
                    <Route element={<SubmitP  nomee={nomee} emaill={emaill} cart={cart} handleClick={handleClick} />} path="/pt/add-artigo" exact />
                    <Route element={<CriarConta />} path="/pt/criar_conta" exact />
                    <Route element={<Politicas  nomee={nomee} emaill={emaill}cart={cart} />} path="/pt/politicas" exact />
                    <Route element={<Itens  nomee={nomee} emaill={emaill}cart={cart} />} path="/pt/itens" exact />
                    <Route element={<Seguro  nomee={nomee} emaill={emaill}cart={cart} />} path="/pt/seguro" exact />
                    <Route element={<Reembolso  nomee={nomee} emaill={emaill}cart={cart} />} path="/pt/reembolso" exact />
                    <Route element={<DetalheCurso  nomee={nomee} emaill={emaill} cart={cart} />} path="/pt/platform/equipement/daluguel/:id" exact />

                </Routes>
            </UserProvider>
        </BrowserRouter>
    )
}

export default RotasPT;