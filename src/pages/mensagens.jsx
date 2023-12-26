import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Header from '../components/header';
import Footer from '../components/footer';

function Mensagens({cart, emaill, nomee}) {
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    // Obtenha o UID do usuário autenticado (se estiver autenticado)
    const uid = firebase.auth().currentUser?.uid;

    if (uid) {
      // Obtenha todas as mensagens em que o usuário é o remetente ou destinatário
      const mensagensRef = firebase.firestore().collection('mensagens');
      const query = mensagensRef.where('remetenteUid', '==', uid).orderBy('timestamp', 'desc');

      query.onSnapshot((snapshot) => {
        const novasMensagens = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMensagens(novasMensagens);
      });
    }
  }, []);

  
  return (
    <div>
         < Header style={{ marginBottom: '5rem' }} nomee={nomee} emaill={emaill} cart={cart} />
   
      <h2>Mensagens</h2>
      <ul>
        {mensagens.map((mensagem) => (
          <li key={mensagem.id}>
            <a href={`/conversa/${mensagem.destinatarioUid}`}>{mensagem.mensagem}</a>
          </li>
        ))}
      </ul>
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Mensagens;
