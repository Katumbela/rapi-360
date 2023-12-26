import '../App.css';
// Bootstrap CSS
// Bootstrap Bundle JS
import Header from '../components/header';
import Footer from '../components/footer';
import Banners from '../components/banners';
import BannerPreto from '../components/banner_preto';

import logo from '../imgs/logo-d.png'


const Seguro = ({ emaill, nomee, cart }) => {
    document.title = 'Itens Permitidos | D-ALUGUEL';
    return (
        <div className="w-100">

            < Header nomee={nomee} emaill={emaill} cart={cart} />
            <BannerPreto>
                Seguro de Aluguel
            </BannerPreto>
            <div className="container">
                <br />

                <h2>Seguro de Aluguel</h2><br />

                <p>
                    O site <a href="http://www.d-aluguel.ao">www.d-aluguel.ao</a> é de propriedade da empresa GOKSIDE INC, que é a controladora de seus dados pessoais.
                </p>

                <p>
                    No momento a D'Aluguel não fornece ainda seguro de aluguel. No entanto a segurança e prevenção e segurança dos seus equipamentos ou materiais serão garantidos por sí mesmo com o aquisitor por meio de um acordo.
                </p>


                <p>
                    Qualquer situação ou problema ocorido fora da plataforma não está na jurisdição da plataforma no entanto terá de o resolver sozinho. do contrário o caso será submetido ao suporte da D'Aluguel (GOKSIDE INC) e posteriormente as autoridades locais.
                </p>



                <br />
                <br />
                <center>
                    <img src={logo} height={'90em'} alt="" />

                </center>
                <br />
                <br />
                <br />


            </div>
            < Footer />

        </div>
    );
}

export default Seguro;
