import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { db } from './firebase';

function Conversa({ match }) {
  const [conversa, setConversa] = useState([]);

  useEffect(() => {
    // Obtenha o UID do usuário autenticado (se estiver autenticado)
    const uid = firebase.auth().currentUser?.uid;

    if (uid) {
      // Obtenha todas as mensagens entre o usuário autenticado e o usuário da conversa
      const destinatarioUid = match.params.uid;
      const mensagensRef = db.collection('mensagens');

      const query = mensagensRef
        .where('remetenteUid', 'in', [uid, destinatarioUid])
        .where('destinatarioUid', 'in', [uid, destinatarioUid])
        .orderBy('timestamp', 'asc');

      query.onSnapshot((snapshot) => {
        const novasMensagens = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setConversa(novasMensagens);
      });
    }
  }, [match.params.uid]);

  return (
    <div>
      <h2>Conversa</h2>
      <ul>
        {conversa.map((mensagem) => (
          <li key={mensagem.id}>{mensagem.mensagem}</li>
        ))}
      </ul>
    </div>
  );
}

export default Conversa;
