import React, { useState } from "react";
import StarRating from "../starts";

const MaxCaracteres = 150;

export default function ReclamacaoIt({ reclamacao }) {
  const [mostrarMais, setMostrarMais] = useState(false);

  const historiaExibida = mostrarMais
    ? reclamacao.historia
    : reclamacao.historia.slice(0, MaxCaracteres);

  const mostrarElipse = reclamacao.historia.length > MaxCaracteres;

  const toggleMostrarMais = () => {
    setMostrarMais(!mostrarMais);
  };

  return (
    <div className="p-3 bg-light my-3 border-rounded-2">
      <div className="d-flex gap-2">
        {reclamacao?.photo ? (
          <>
            <img
              src={reclamacao.photo}
              style={{ height: "96px" }}
              alt="User"
              className="foto"
            />
          </>
        ) : (
          <>
            <div className="foto">
              <div>
                {reclamacao.cliente.split(" ")[0][0]}{" "}
                {reclamacao.cliente.split(" ")[1][0]}
              </div>
            </div>
          </>
        )}
        <div className="d-flex flex-column">
          <b>{reclamacao.cliente}</b>
          <span className="text-secondary f-12">Empresa: <b><a href={"/pt/empresa/"+reclamacao.empresaId}>{reclamacao.nomeEmpresa}</a></b></span>
        </div>
      </div>
      <hr />
      <StarRating rating={reclamacao.classificacao.toFixed(1)} />
      <b className="f-reg"> {reclamacao.titulo}</b>

      <p className="text-secondary mt-2">
        {historiaExibida}
        {mostrarElipse && !mostrarMais && "..."}
      </p>
      {mostrarElipse && (
        <button className="btn btn-sm btn-link" onClick={toggleMostrarMais}>
          {mostrarMais ? "Ver Menos" : "Ver Mais"}
        </button>
      )}
      <div className="d-flex gap-3 justify-content-between">
        <div
          className={`d-flex my-auto gap-2 ${
            reclamacao.status === "respondido" ? " bg-success2" : " bg-danger"
          } w-auto rounded-pill f-10 px-3 py-1 text-white`}
        >
          {reclamacao.status === "respondido" ? (
            <>
              <i className="bi bi-emoji-laughing"></i> Respondido
            </>
          ) : (
            <a className="text-white cursor-pointer text-decoration-none" href={"mailto:"+reclamacao.emailCliente} >
             Responder
            </a>
          )}
        </div>
        <span className="text-secondary f-10 my-auto">{reclamacao.quando}</span>
      </div>
    </div>
  );
}
