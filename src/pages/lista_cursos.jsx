import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';

const fetchDataFromFirestore = async () => {
  const empresasCollection = collection(db, 'empresas');

  try {
    const querySnapshot = await getDocs(empresasCollection);

    const data = querySnapshot.docs.map((doc) => {
      const empresa = doc.data();
      const docId = doc.id;

      // Ajuste os campos conforme necessário
      return {
        selo: empresa.selo,
        id: empresa.id,
        nome: empresa.nomeEmpresa,
        localizacao: empresa.enderecoEmpresa,
        avaliacao: empresa.avaliacao,
        banner: empresa.banner,
        site: empresa.siteEmpresa,
        whatsapp: empresa.whatsapp,
        fb: empresa.fb,
        insta: empresa.insta,
        youtube: empresa.youtube,
        nif: empresa.nif,
        sobre: empresa.sobre,
        logo: empresa.logo,
        docId,
      };
    });

    return data;
  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
    throw error;
  }
};

const getEmpresasData = async () => {
  const empresas = await fetchDataFromFirestore();
  return empresas;
};

export default getEmpresasData;
