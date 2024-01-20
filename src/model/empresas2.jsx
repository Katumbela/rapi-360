import { db } from "../pages/firebase";


const obterDadosDoFirebase = async () => {
    try {
      const empresasRef = db.collection('empresa');
      const snapshot = await empresasRef.get();
      const dadosEmpresas = snapshot.docs.map((doc) => ({
        id: doc.id,
        avaliacao: '8.0', // ou parseInt, dependendo do tipo
        ...doc.data(),
      }));
      
  
      console.log('Dados do Firebase:', dadosEmpresas);
      return dadosEmpresas;
    } catch (error) {
      console.error('Erro ao obter dados do Firebase:', error.message);
      return []; // ou retorne um valor padrão caso ocorra um erro
    }
  };
  
  
  export default obterDadosDoFirebase;
  