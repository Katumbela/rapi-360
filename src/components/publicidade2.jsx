import React from "react";
import pub1 from "../imgs/pub1.jpeg";
import pub2 from "../imgs/pub2.jpeg";
import pub3 from "../imgs/pub3.jpeg";
import pub4 from "../imgs/pleno.png";
import pub5 from "../imgs/pl.png";

const Pub2 = () => {
  return (
    <>
      <div className="pubb2 ">
       <div className="container">
       <div className="text-center">
          <b className="text-secondary f-20">Publicidade</b>
       
       <br />
        <span className="f-14 text-secondary">Clique no anuncio</span>
        </div>
          <div className="publicidad2 my-3 ">
          <div className="row">
            <div className="col-12 col-md-6 text-center">
                <img src={pub4} className="logo-pleno" alt="" />
          <h4>
          <b className="text-pleno">
          Domínios e e-mails ilimitados em uma única plataforma
          </b>
          </h4>
          <a className="btn-sm btn btn-pleno">Acessar</a>
            </div>
            <div className="col-12 col-md-6">
                <img src={pub5} alt="" />
            </div>
          </div>
          </div>
       </div>
      </div>
    </>
  );
};

export default Pub2;
