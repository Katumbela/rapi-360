import '../App.css';
// Bootstrap CSS
// Bootstrap Bundle JS
import Header from '../components/header';
import Footer from '../components/footer';
import BannerPreto from '../components/banner_preto';
import { db } from './firebase';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/loader';

const Contactar = ({emaill,nomee, cart }) => {
  document.title = 'Formulario de Contacto | D-ALUGUEL';
  
  const [nomeCompleto, setNC] = useState('');
  const [telefone, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMsg] = useState('');
  const [load, setLoad] = useState(false);

  
  const salvar = () => {
    setLoad(true)
    db.collection('mensagens').add({
      nomeCompleto: nomeCompleto,
      telefone: telefone,
      email: email,
      mensagem: mensagem,
      dataEnvio: new Date(),
    })
    .then(() => {
      setEmail('');
      setTel('');
      setNC('');
      setMsg('');
      setLoad(false);
      toast.success('Recebemos a sua mensagem com sucesso!');
    })
    .catch((error) => {
      setLoad(false);
      toast.error('Erro ao enviar mensagem:');
    });
  }
  
  return (
    <div className="w-100">
      <ToastContainer />

      < Header  nomee={nomee} emaill={emaill} cart={cart} />
      <BannerPreto>
        CONTACTAR AROTEC
      </BannerPreto>
      <br />
      <br /><br />
      <div className="container">
        <div className="row">
          <div style={{display: 'grid', }} className="col-12 col-sm-6 text-center">
            <span className="text-secondary py-3 my-auto">
              Industry.Robotics.Tecnology
            </span>
          </div>
          <div className="col-12 col-sm-6">
            <div className="">
              <b>Preencha o Formulário</b>
              <div className="row">
                <div className="col-12 col-lg-6 my-2">
                  <label className='text-secodary f-12' htmlFor="">Nome completo </label>
                  <input value={nomeCompleto} onChange={(e)=> setNC(e.target.value)} type="text" name="" placeholder="Nome completo" id="" className="form-control" />
                </div>
                <div className="col-12 col-lg-6 my-2">
                  <label className='text-secodary f-12' htmlFor="">Telefone</label>
                  <input value={telefone} onChange={(e)=> setTel(e.target.value)}  type="text" name="" placeholder="909 433 978" id="" className="form-control" />
                </div>
                <div className="col-12 col-lg-6 my-2">
                  <label className='text-secodary f-12' htmlFor="">Email</label>
                  <input value={email} onChange={(e)=> setEmail(e.target.value)}  type="text" name="" placeholder="Seu email" id="" className="form-control" />
                </div>
                <div className="col-12 col-lg-6 my-2">
                  <label className='text-secodary f-12' htmlFor="">Ficheiro ( Opcional )</label>
                  <input  type="file" name="" id="" className="form-control" />
                </div>
                <div className="col-12 col-lg-6 my-2">
                  <label className='text-secodary f-12' htmlFor="">Sua Mensagem</label>
                  <textarea value={mensagem} onChange={(e)=> setMsg(e.target.value)}  type="text" name="" placeholder="Seu email" id="" className="form-control" ></textarea>
                </div>
                  <div className="col-12 my-3">
                     <button disabled={!nomeCompleto || !mensagem || !email || !telefone} onClick={()=> salvar()} className="btn btn-primary w-100"> {load == false ? <span>Envar <i className="bi bi-send ms-2"></i></span> : <Loader/>} </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br /><br /><br />
      < Footer />

    </div>
  );
}

export default Contactar;
