import React, { useState } from 'react';
import StarRating from 'react-star-rating-component';

const AvaliacaoComponent = ({ onAvaliacaoChange }) => {
  const [avaliacao, setAvaliacao] = useState(0);

  const handleAvaliacaoClick = (nextValue, prevValue, name) => {
    const newRating = nextValue === avaliacao ? nextValue - 0.5 : nextValue;
    setAvaliacao(newRating);
    onAvaliacaoChange(newRating);
  };

  return (
    <div className="avaliacao-component">
      <StarRating
        name="avaliacao"
        starCount={5}
        value={avaliacao}
        onStarClick={handleAvaliacaoClick}
        starColor="#ffb400" // Cor das estrelas preenchidas
        emptyStarColor="#cccccc" // Cor das estrelas vazias
        renderStarIcon={(index, value) => {
          return (
            <span
              style={{
                fontSize: '3em', // Ajuste o tamanho das estrelas aqui
                marginRight: '9px', // Ajuste o espaço no eixo x aqui
              }}
            >
              {index <= value - 1 ? '\u2605' : '\u2606'}
            </span>
          );
        }}
      />
      <p className='mt-2'>Nota: {avaliacao !== null ? avaliacao : 'Nenhuma avaliação selecionada'}</p>
    </div>
  );
};

export default AvaliacaoComponent;
