import '../App.css';
// Bootstrap CSS
// Bootstrap Bundle JS
import Header from '../components/header';
import Footer from '../components/footer';
import Banners from '../components/banners';
import BannerPreto from '../components/banner_preto';

import logo from '../imgs/logo-d.png'


const Itens = ({ emaill, nomee, cart }) => {
    document.title = 'Itens Permitidos | D-ALUGUEL';
    return (
        <div className="w-100">

            < Header nomee={nomee} emaill={emaill} cart={cart} />
            <BannerPreto>
                Itens Permitidos
            </BannerPreto>
            <div className="container">
                <br />

                <h2>Itens Permitidos e não permitidos</h2><br />

                <p>
                    O site <a href="http://www.d-aluguel.ao">www.d-aluguel.ao</a> é de propriedade da empresa GOKSIDE INC, que é a controladora de seus dados pessoais.
                </p>

                <p>
                    São permitidos quaisquer itens na plataforma excepto:
                </p>


                <ul>
                    <li>Ser humano</li>
                    <li>Animal vivo</li>
                    <li>Aeronave</li>
                    <li>Armas</li>
                    <li>Drogas (Lícitas ou ilícitas)</li>
                    <li>Bilindados</li>
                    <li>Equipamentos de guerra</li>
                </ul>

                <p>
                    Qualquer item postado que infringe as nossas politicas será posto ou colocado junto à justiça local. <br /> Faça bom uso da plataforma e tire maior proveito dela.
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

export default Itens;
