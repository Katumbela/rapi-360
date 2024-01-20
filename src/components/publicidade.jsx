import React from "react";
import pub1 from "../imgs/pub1.jpeg";
import pub2 from "../imgs/pub2.jpeg";
import pub3 from "../imgs/pub3.jpeg";
import pub4 from "../imgs/pub4.jpeg";
import pub5 from "../imgs/pub5.png";

const Pub = () => {
  return (
    <>
      <div className="pubb">
        <div className="text-center">
          <b className="text-secondary f-20">Publicidade</b>
       
       <br />
        <span className="f-14 text-secondary">Clique no anuncio</span>
        </div>
        <a href="https://arotec.ao/pt/loja" target="__blank">
          <div className="publicidad text-white my-3 ">
            <img src={pub3} alt="" />
            <img src={pub4} alt="" />
          </div>
        </a>
      </div>
    </>
  );
};

export default Pub;
