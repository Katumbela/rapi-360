import '../App.css';
// Bootstrap CSS
// Bootstrap Bundle JS
import Header from '../components/header';
import Footer from '../components/footer';
import Banners from '../components/banners';
import BannerPreto from '../components/banner_preto';

const Politicas = ({ emaill, nomee, cart }) => {
  document.title = 'Políticas de Privacidade & Termos de uso | D-ALUGUEL';
  return (
    <div className="w-100">

      < Header nomee={nomee} emaill={emaill} cart={cart} />
      {/* <BannerPreto>
        Políticas de Privacidade
      </BannerPreto> */}
      <div className="container">
        <br />
        <br />
        <br />
        <div class="container">

          <h2>Política de privacidade</h2><br />

          <p>
            O site <a href="http://reputacao360.online">reputacao360.online</a> é de propriedade da empresa GOKSIDE INC, que é a controladora de seus dados pessoais.
          </p>

          <p>
            Nós adotamos esta Política de Privacidade, que determina como nós estamos processando as informações coletadas pelo site reputacao360.online e também explica por quais razões nós precisamos coletar dados pessoais sobre você. Portanto, você deve ler esta Política de Privacidade antes de usar o site reputacao360.online.
          </p>

          <p>
            Nós cuidamos dos seus dados pessoais e assumimos a responsabilidade de garantir a confidencialidade e segurança de suas informações pessoais.
          </p>

          <p>

            Estes são as informações pessoais que coletamos:
            Quando você visita o site reputacao360.online, nós automaticamente coletamos certas informações sobre seu dispositivo, incluindo informações sobre seu navegador, endereço IP, fuso horário e alguns dos cookies instalados no seu sispositivo. Além disso, quando você navega pelo Site, nós coletamos informações sobre as páginas individuais ou produtos que você visualiza, sobre quais sites ou termos de busca redirecionaram você para nosso Site, e sobre como você interage com o Site. Nós nos referimos a essas informações coletadas automaticamente como "Informações sobre o dispositivo". Além disso, nós podemos coletar dados pessoais que você fornecer (incluindo, mas não limitado a: Nome, Sobrenome, Endereço, informações de pagamento, etc) durante o processo de registro para poder cumprir o acordo.

          </p>

          <b>Por que fazemos o processamento dos seus dados?</b><br /><br />

          <p>
            Nossa maior prioridade é a segurança dos dados pessoais dos usuários e, portanto, nós podemos processar apenas dados mínimos, apenas enquanto for absolutamente necessário para a manutenção do site. Informações coletadas automaticamente são usadas para identificar possíveis casos de abuso e estabelecer dados estatísticos sobre o uso do site. Esses dados estatísticos não pe agregada de outras formas que permitam a identificação de usuários específicos do sistema.
            <br />
            <br />
            Você pode visitar o site sem nos contar sobre quem você é ou relevar qualquer informação que possa ser usada por outra pessoa para identificar você individualmente. Se, apesar disso, você quiser utilizar algum dos recursos do site, ou quiser receber nossa newsletter, ou quiser conceder outros detalhes através do preencimento e envio de formulários, você poderá fornecer dados pessoais para nós, como seu email, nome, sobrenome, cidade de residência, organização e número de telefone. Você pode escolher não fornecer dados pessoais para nós, mas, dessa forma, talvez você não consiga usar alguns dos resursos do site. Por exemplo, você não vai conseguir receber nossa Newsletter ou entrar em contato conosco diretamente pelo nosso site. Usuários que não tenham certeza sobre quais informações pessoais são obrigatórias são convidados a entrarem em contato conosco pelo e-mail info@reputacao360.online.

          </p>
          <b>Seus direitos:</b><br />

          <p>Se você morar na Europa, estes são os direitos garantidos quando aos seus dados pessoais:
          </p>


          <ul>
            <li>O direito de ser informado.</li>
            <li>O direito ao acesso.</li>
            <li>O direito à retificação.</li>
            <li>O direito de deletar.</li>
            <li>O direito de restringir o processamento.</li>
            <li>O direito da portabilidade de dados.</li>
            <li>O direito à objeção.</li>
          </ul>








          <p>

            Direitos em relação a tomadas de decisão automaticas e à perfilagem.
            Se você quiser exercitar esses direitos, por favor entre em contato conosco usando os dados de contato abaixo.

          </p>

          <p>

            Adicionalmente, se você reside na Europa, nós afirmamos que estamos processando suas informações com a finalidade de cumprir contratos que possamos ter firmado com você (por exemplo, se você fizer uma compra no nosso Site), ou para excercer os interesses legítimos da nossa empresa listados acima. Além disso, por favor saiba que suas informações poder ser transferidas para fora da Europa, incluindo para o Canadá e os Estados Unidos da América.

          </p>

          <p>
            <p>

              <b>Links para outros sites:</b><br />
              Nosso site pode conter links para outros sites que não são controlados por nós e/ou não são de nossa propriedade. Por favor esteja ciente de que nós não somos responsáveis pelas políticas de privacidade de tais sites e organizações terceiras. Nós incentivamos você a estar ciente de quando sair do nosso site, e também incentivamos você a ler a política de privacidade de cada um dos sites que podem coletar suas informações pessoais.

            </p>
          </p>

          <p>

            <b>Segurança das informações:</b><br />
            Nós garantimos que as informações que você fornece estão em servidores e computadores armazenados em ambientes seguros e controlados, protegidos de acessos, usos e divulgações não-autorizadas. Nós matemos medidas de segurança administrativas, técnicas e físicas razoáveis, com finalidade de proteger os dados pessoais sob nossa custódia de de acessos, usos, modificações e divulgações não-autorizadas. Apesar disso, nenhuma transmissão de dados pela Internet ou por sistemas sem fio pode ser garantida.

          </p>

          <p>

            <b>Declaração legal:</b><br />
            Nós vamos divulgar qualquer informação que coletarmos, usarmos ou recebermos caso tal divulgação seja solicitada ou permitida por lei, de forma a cumprir intimações ou processos judiciais similares, e também quando considerarmos em boa fé que a divulgação é necessária para a proteção de nossos direitos, para a proteção da segurança de outros, para investigações de fraude ou para responder a uma solicitação do governo.

          </p>
          <p>

            <b>Informações de contato:</b><br />
            Se você quiser entrar em contato conosco para saber mais sobre esta Política de Privacidade, ou quiser acessar quaisquer informações relativas aos seus direitos individuais e às suas Informações Pessoais, você poderá enviar um e-mail para o endereço info@reputacao360.online.

          </p>

        </div>
      </div>
        <br />
        <br />
        <br />
      < Footer />

    </div>
  );
}

export default Politicas;
