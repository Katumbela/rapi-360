import { db } from "../pages/firebase";

const obterDadosDoFirebase = async () => {
  try {
    const empresasRef = db.collection('empresa');
    const snapshot = await empresasRef.get();

    const dadosEmpresas = await Promise.all(snapshot.docs.map(async (doc) => {
      const empresaData = doc.data();

      // Supondo que as reclamações estejam em uma coleção "reclamacoes"
      const reclamacoesRef = db.collection('reclamacoes');
      const reclamacoesSnapshot = await reclamacoesRef
        .where('empresaId', '==', doc.id)
        .get();

      const reclamacoesData = reclamacoesSnapshot.docs.map((reclamacaoDoc) => ({
        id: reclamacaoDoc.id,
        ...reclamacaoDoc.data(),
      }));

      const totalClassificacoes = reclamacoesData.reduce(
        (total, reclamacao) => total + reclamacao.classificacao,
        0
      );

      const mediaClassificacoes =
        reclamacoesData.length > 0
          ? totalClassificacoes / reclamacoesData.length
          : 0;

      return {
        id: doc.id,
        avaliacao: mediaClassificacoes.toFixed(1),
        ...empresaData,
      };
    }));

    // console.log('Dados do Firebase:', dadosEmpresas);
    return dadosEmpresas;
  } catch (error) {
    // console.error('Erro ao obter dados do Firebase:', error.message);
    return []; // ou retorne um valor padrão caso ocorra um erro
  }
};

export default obterDadosDoFirebase;
