

import React from 'react';

export default function StarRating  ({ rating })  {
  const getStarIcons = () => {
    const stars = Array.from({ length: 5 }, (_, index) => (
      <i className={`bi bi-star-fill bg-light2 px-1 mx-0 ${index < rating ? 'text-warning' : 'text-white'}`} key={index} ></i>
    ));
    return stars;
  };

  return (
    <p className="d-flex bg- mt-1 my-auto gap-1 f-14">
      {getStarIcons()}
      
    </p>
  );
};
