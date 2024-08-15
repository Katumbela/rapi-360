import React from "react"; 

const Pub = () => {
  return (
    <>
      <div className="pubb">
        <div className="text-center">
          <b className="text-secondary f-20">Publicidade</b>

          <br />
          <span className="f-14 text-secondary">Clique no anuncio</span>
        </div>
        <a href="https://www.linkedin.com/company/m2j-tecnologia/about/" target="__blank">
          <div className="publicidad text-white my-3 ">
            <img src={'https://media.licdn.com/dms/image/v2/D4D22AQGzd6c-ZQVdkA/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1713438279526?e=1726704000&v=beta&t=r5ZlLu865nMRyDz7VxV_tvCsB9hlHE315pNONVmJL1c'} alt="" />
            <img src={'https://media.licdn.com/dms/image/D4D22AQFz1inOMuXSKw/feedshare-shrink_800/0/1705486380366?e=1726704000&v=beta&t=tqYA8ZWsjee1SgEagf_rOuBea1xpuQhWj8rWrfi4MGY'} alt="" />
            <img src={'https://media.licdn.com/dms/image/v2/D4D22AQFVqa6Cxjawzw/feedshare-shrink_800/feedshare-shrink_800/0/1705315159975?e=1726704000&v=beta&t=X07ockOrqYRQuzVk8e3xUfkUJndIXfxA09mJt_Rb56M'} alt="" />
          </div>
        </a>
      </div>
    </>
  );
};

export default Pub;
