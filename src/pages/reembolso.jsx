import '../App.css';
// Bootstrap CSS
// Bootstrap Bundle JS
import Header from '../components/header';
import Footer from '../components/footer';
import Banners from '../components/banners';
import logo from '../imgs/logo-d.png'
import BannerPreto from '../components/banner_preto';

const Reembolso = ({ emaill, nomee, cart }) => {
  document.title = 'Políticas de Reembolso de | D-ALUGUEL';
  return (
    <div className="w-100">

      < Header nomee={nomee} emaill={emaill} cart={cart} />
      <BannerPreto>
        Políticas de Reembolso
      </BannerPreto>
      <div className="container">
        <br />
        <div class="container">

          <h2>Política de Reembolso</h2><br />

          <p>
            O site <a href="http://www.d-aluguel.ao">www.d-aluguel.ao</a> é de propriedade da empresa GOKSIDE INC, que é a controladora de seus dados pessoais.
          </p>

          <p>As condições para reembolso são adicionadas ou prescritas pelo aquisitor no ato do aluguel, posto isto apòs o fechamento ou assinatura do aluguel em ambas as partes, já não serão aceites outras condições fora do contrato </p>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <center>
            <img src={logo} height={'90em'} alt="" />

          </center>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
      < Footer />

    </div>
  );
}

export default Reembolso;
