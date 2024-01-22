import React from "react";

export default function StarRating({ rating }) {
  const getStarIcons = () => {
    const roundedRating = Math.round(rating); // Round the rating
    const stars = Array.from({ length: 5 }, (_, index) => {
      const filled = index < roundedRating;
      const halfFilled =
        index === roundedRating - 1 && rating % 1 !== 0 && rating % 1 <= 0.9;

      return (
        <i
          className={`bi bi-star-fill text-white px-1 mx-0 ${
            filled && roundedRating >= 3 && roundedRating <= 3.9
              ? "bg-success"
              : ""
          } 
          ${filled && roundedRating >= 4 ? "bg-success2" : ""} 
            
          ${filled && roundedRating < 2 ? "bg-danger" : ""} 
              
            ${
              filled && roundedRating >= 2 && roundedRating <= 2.9
                ? "bg-warning"
                : ""
            } 
              
              ${
                halfFilled && roundedRating >= 2 && roundedRating <= 2.9
                  ? "bg-warning-half"
                  : ""
              }
          bg-secondary2
          ${
            halfFilled && roundedRating >= 3 && roundedRating <= 3.9
              ? "bg-success-half"
              : ""
          }${
            halfFilled && roundedRating < 2
              ? "bg-danger-half"
              : ""
          }
        ${halfFilled && roundedRating >= 4 ? "bg-success2-half" : ""}`}
          key={index}
        ></i>
      );
    });
    return stars;
  };

  return <p className="d-flex bg- mt-1 my-auto gap-1 f-14">{getStarIcons()}</p>;
}
