import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

function EmailSender({ cart, emaill, nomee }) {

  document.title = 'R360 API | API Reputação 360'

  return (
    <>
      <Header
        style={{ marginBottom: "5rem" }}
        nomee={nomee}
        emaill={emaill}
        cart={cart}
      />

      <div className="container mt-5">
        <h1>API de Envio de E-mails e Mensagens via WhatsApp</h1>
        <p>
          Esta é uma API simples para enviar e-mails e mensagens via WhatsApp. Ele fornece uma rota para enviar e-mails através de um servidor SMTP configurado e outra rota para enviar mensagens via WhatsApp, aceitando solicitações POST com os dados apropriados.
        </p>
        <br />
        <br />

        <h2>API:</h2>
        <p>
          <a href="#">https://api.reputacao360.online</a>
        </p>

        <br />

        <h3>Uso Enviar E-mail</h3>
        <p>
          Para enviar um e-mail, faça uma solicitação POST para a rota{" "}
          <code>/api/enviar-email</code> com os seguintes dados no corpo da
          solicitação:
        </p>
        <ul>
          <li>
            <code>to</code>: Endereço de e-mail do destinatário.
          </li>
          <li>
            <code>subject</code>: Assunto do e-mail.
          </li>
          <li>
            <code>body</code>: Corpo do e-mail.
          </li>
          <li>
            <code>smtp</code>: Configurações do servidor SMTP, incluindo{" "}
            <code>host</code> e <code>port</code>.
          </li>
          <li>
            <code>email</code>: Seu endereço de e-mail para autenticação SMTP.
          </li>
          <li>
            <code>password</code>: Sua senha para autenticação SMTP.
          </li>
          <li>
            <code>emailFrom</code>: Endereço de e-mail remetente.
          </li>
          <li>
            <code>key</code>: Chave de autenticação da API. ( Default:
            Angola2020* )
          </li>
        </ul>
        <p>Exemplo de solicitação:</p>
        <pre>
          <code>
            {`{
              "to": "destinatario@example.com",
              "subject": "Assunto do E-mail",
              "body": "Corpo do E-mail",
              "smtp": {
                "host": "mail.exemplo.com",
                "port": 465
              },
              "email": "seu_email@exemplo.com",
              "password": "sua_senha",
              "emailFrom": "remetente@example.com",
              "key": "Angola2020*"
            }`}
          </code>
        </pre>

        <h3>
          Para envio com o email default da Reputação 360 sem precisar de
          credenciais:
        </h3>
        <pre>
          <code>
            {`{
              "to": "destinatario@example.com",
              "subject": "Assunto do E-mail",
              "body": "<p>Corpo do E-mail</p>",
              "key": "Angola2020*"
            }`}
          </code>
        </pre>

        <br />
        <br />
        <hr />
        <br />
        <br />

        <h3>Uso Enviar Mensagem via WhatsApp</h3>
        <p>
          Para enviar uma mensagem via WhatsApp, faça uma solicitação POST para a rota{" "}
          <code>/api/whatsapp/sendText</code> com os seguintes dados no corpo da
          solicitação:
        </p>
        <ul>
          <li>
            <code>chatId</code>: Nº Telefone no WhatsApp.
          </li>
          <li>
            <code>text</code>: Texto da mensagem.
          </li>

        </ul>
        <p>Exemplo de solicitação:</p>
        <pre>
          <code>
            {`{
              "chatId": "244928134249",
              "text": "Hi there! test ",
              
            }`}
          </code>
        </pre>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

export default EmailSender;
