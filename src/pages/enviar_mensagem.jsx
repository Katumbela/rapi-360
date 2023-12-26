import React, { useState } from 'react';
import { useParams } from 'react-router-dom';  // Importe o hook useParams
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Header from '../components/header';
import Footer from '../components/footer';

function EnviarMensagem({nomee, emaill, cart}) {
  const { uid } = useParams();  // Use o hook useParams para obter os parâmetros da URL
  const [mensagem, setMensagem] = useState('');

  const enviarMensagem = async () => {
    const remetenteUid = firebase.auth().currentUser?.uid;

    if (remetenteUid && uid) {
      const mensagensRef = firebase.firestore().collection('mensagens');

      await mensagensRef.add({
        remetenteUid,
        destinatarioUid: uid,
        mensagem,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // Limpe o campo de mensagem após o envio
      setMensagem('');
    }
  };

  return (
    <div>
        < Header nomee={nomee} emaill={emaill} cart={cart} />
       <br />
        <br />

      <h2>Enviar Mensagem</h2>
      <textarea
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Digite sua mensagem"
      />
      <button onClick={enviarMensagem}>Enviar</button>


  <br />
  <br />
  <br />
  <Footer /> 
    </div>
  );
}

export default EnviarMensagem;
