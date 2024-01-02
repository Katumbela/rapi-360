import React, { useState } from 'react';

const AvaliacaoComponent = ({ onAvaliacaoChange }) => {
  const [avaliacao, setAvaliacao] = useState(null);

  const handleAvaliacaoClick = (valor) => {
    setAvaliacao(valor);
    onAvaliacaoChange(valor);
  };

  const renderBotoesAvaliacao = () => {
    const botoes = [];
    for (let i = 0; i <= 10; i++) {
      botoes.push(
        <button
          key={i}
          className={`btn btn-${avaliacao === i ? avaliacao < 3 ? 'danger' : avaliacao >= 3 && avaliacao <=6 ? 'warning' : 'success' : 'light'}`}
          onClick={() => handleAvaliacaoClick(i)}
        >
          {i}
        </button>
      );
    }
    return botoes;
  };

  return (
    <div className="avaliacao-component">
      {/* <p>Escolha sua avaliação:</p> */}
      <div className="botoes-avaliacao">{renderBotoesAvaliacao()}</div>
      <p className='mt-2'>Nota: {avaliacao !== null ? avaliacao+'.0' : 'Nenhuma avaliação selecionada'}</p>
    </div>
  );
};

export default AvaliacaoComponent;
