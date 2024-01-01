import React, { useEffect, useState } from "react";
import "./banner.css";
import { NavLink } from "react-router-dom";
import arobot from "../../imgs/bann_kit.gif";
import play from "../../imgs/play.png";
import v2 from "../../video/v1.mp4";
import v1 from "../../video/v2.mp4";
import { Fade } from "react-awesome-reveal";
import CardCurso from "../card_serv/card_serv";
import getCursosData from "../../pages/lista_cursos";
import bom from "../../imgs/bom.png";
import mau from "../../imgs/mau.png";
import arreiou from "../../imgs/arreiou.jpeg";
import bomm from "../../imgs/bomm.webp";
import maxi from "../../imgs/maxi.png";
import naorecomendado from "../../imgs/naorecomendado.webp";
import otimo from "../../imgs/otimo.webp";
import xyami from "../../imgs/xyami.jpeg";
import shoprite from "../../imgs/shoprite.jpeg";
import unitel from "../../imgs/unitel.png";
import r360 from "../../imgs/r360.png";
import sdq from "../../imgs/logo_s.png";
import eduka from "../../imgs/eduka.png";
import gk from "../../imgs/gokside.png";
import pleno from "../../imgs/pleno.png";
import ruim from "../../imgs/ruim.webp";
import logo from "../../imgs/icon.png";
import desconto from "../../imgs/descontos.webp";
import desc from "../../imgs/desc.png";
import blog from "../../imgs/blog.png";
import b1 from "../../imgs/blog/1.png";
import b2 from "../../imgs/blog/2.png";
import b3 from "../../imgs/blog/3.png";
import b4 from "../../imgs/blog/4.png";
import regular from "../../imgs/regular.png";
import africa from "../../imgs/africa.png";
import AbreviarTexto from "../abreviarTexto";
import ScrollToTopLink from "../scrollTopLink";
import dadosEmpresas from "../../model/empresas";
import articles from "../../model/artigos";

const Banner = () => {
  const [load, setLoad] = useState(false);
  const [cursos, setCursos] = useState([]);

  const melhoresEmpresasOrdenadas = dadosEmpresas
    .sort((a, b) => b.avaliacao - a.avaliacao)
    .filter((empresa) => empresa.avaliacao >= 6);

  const pioresEmpresasOrdenadas = dadosEmpresas
    .sort((a, b) => a.avaliacao - b.avaliacao)
    .filter((empresa) => empresa.avaliacao < 6);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCursosData();
      setCursos(data);
    };

    fetchData();
  }, []); // o segundo argumento do useEffect é um array de dependências, coloque aqui qualquer dependência necessária

  const [searchTerm, setSearchTerm] = useState("");
  function handleSearchInputChange(e) {
    setSearchTerm(e.target.value);
  }
  const [searchTerm2, setSearchTerm2] = useState("");
  function handleSearchInputChange2(e) {
    setSearchTerm2(e.target.value);
  }

  const filteredEquipements = cursos.filter(
    (curso) =>
      curso.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (searchTerm2 === "" ||
        curso.endereco.toLowerCase().includes(searchTerm2.toLowerCase()))
  );

  const listarTudo = () => {
    setSearchTerm("");
  };

  return (
    <>
      <div className="banner shadow-md">
        <div className="body-banner text-center container">
          <h4 className="f-reg  titulo">
            O <b className="text-">Reputa</b> <b className="text-">360</b> te
            aproxima das marcas que têm a confiança do consumidor!
          </h4>
          <p className="f-14  text-secondary">
            Compre de modo mais <b className="text-success">seguro</b>,
            pesquisando empresas e buscando uma solução para algum problema.
          </p>

          <br />
          <div className="quadros w-md-75 w-lg-75 mx-auto">
            <ScrollToTopLink
              to={"/pt/reclamar"}
              className="qq text-decoration-none hover btn rounded-2 btn-outline-primary"
            >
              <span>Pesquise uma empresa </span>{" "}
              <i className="bi bi-search"></i>
            </ScrollToTopLink>
            <ScrollToTopLink
              to={"/pt/cadastro/empresa"}
              className="q text-decoration-none rounded-2"
            >
              <span>Cadastre uma empresa</span>{" "}
              <i className="bi bi-building-add"></i>
            </ScrollToTopLink>
            <a
              href="https://pleno.ao"
              target="__blank"
              className="text-decoration-none q rounded-2"
            >
              <span>Domínios AO</span> <i className="bi bi-hdd-rack"></i>
            </a>
            <ScrollToTopLink
              to={"/pt/descontos"}
              className="q text-decoration-none rounded-2"
            >
              <span>Cupons de Desconto</span>{" "}
              <i className="bi bi-ticket-perforated"></i>
            </ScrollToTopLink>
            <ScrollToTopLink
              to={"/pt/central-de-ajuda"}
              className="q text-decoration-none rounded-2"
            >
              <span> Central de Ajuda </span>{" "}
              <i className="bi bi-question-circle"></i>
            </ScrollToTopLink>
            <ScrollToTopLink
              to={"/pt/reclamar"}
              className="q text-decoration-none rounded-2"
            >
              <span>Faça uma Reclamação</span>{" "}
              <i className="bi bi-megaphone"></i>
            </ScrollToTopLink>
          </div>
        </div>
      </div>
      {/* <div className="container-fluid container-lg">
        <div className="row">
          <div className="col-12 col-md-4 col-xl-3 col-xxl-2 pt-1">
            <div className="shadow-md card-opt p-3">
              <button
                onClick={() => listarTudo()}
                className="btn btn-primary w-100"
              >
                Listar tudo
              </button>

              <button className="btn my-3 btn-secondary w-100">
                Ver por Categoria
              </button>
              <br />
              <b>Endereço</b>
              <div className="search-by">
                <label htmlFor="d" className="">
                  Buscar por endereço
                </label>
                <input
                  type="text"
                  value={searchTerm2}
                  onChange={handleSearchInputChange2}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="col-12 container-xxl container-fluid col-md-8 col-xl-9 col-xxl-10">
            {(searchTerm.length > 0 || searchTerm2.length > 0) && (
              <div className="row">
                {filteredEquipements.map((item) => (
                  <CardCurso key={item.id} c={item} />
                ))}
              </div>
            )}

            // || filteredEquipements == 0 //

            {filteredEquipements == 0 && (
              <center>
                <span className="mx-auto text-secondary">
                  Não foi encontrado um outro resultado para o que procura!
                </span>
              </center>
            )}

            {searchTerm.length == "" && searchTerm2.length == "" && (
              <div className="row mx-2">
                {cursos.map((item) => (
                  <CardCurso key={item.id} c={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div> */}

      <br />
      <center>
        <ScrollToTopLink
          to={"/pt/empresa/produtos"}
          className={"btn conheca btn-success "}
        >
          Conheça os nossos produtos <i className="bi bi-arrow-right-short"></i>
        </ScrollToTopLink>
      </center>

      <div className="publicidade text-white bg-secondary my-3 py-5 text-center">
        <br />
        <br />
        <h5>Publicidade</h5>

        <br />
        <br />
      </div>

      <div className="ranking-emp bg-light py-4 container">
        <div className="row">
          <div className="col-12 col-lg-4">
            <h3>
              <b>Ranking das empresas</b>
            </h3>

            <i className="f-12 fw-400">Referente aos últimos 30 dias</i>
            <br />
            <span>
              Com base nas avaliações que os consumidores deixam para as
              empresas das quais reclamaram, a gente constrói nossos rankings. É
              assim que nosso site ajuda as pessoas a saberem em quais marcas
              podem confiar mais!
            </span>
            <br />
            <br />
            <ScrollToTopLink
              to={"/pt/ranking"}
              className="btn rounded-1 btn-outline-success"
            >
              Ver Ranking Completo
            </ScrollToTopLink>
          </div>
          <div className="col-12 col-lg-8 my-lg-0 my-5">
            <div className="tabss w-100   overflow-x-auto">
              <ul className="w-100 overflow-x-auto">
                <li>
                  <button className="btn btn-sm btn-success">Todos</button>
                </li>
                <li>
                  <button className="btn  btn-sm btn-outline-success">
                    Supermercados
                  </button>
                </li>
                <li>
                  <button className="btn  btn-sm btn-outline-success">
                    Bancos
                  </button>
                </li>
                <li>
                  <button className="btn btn-sm btn-outline-success">
                    <span> Telefonia,</span> <span>TV </span> <span>&</span>{" "}
                    <span>Internet</span>
                  </button>
                </li>
                <li>
                  <button className="btn  btn-sm btn-outline-success">
                    <span>Beleza</span> <span>&</span> <span>Estética</span>
                  </button>
                </li>
                <li>
                  <button className="btn  btn-sm btn-outline-success">
                    Seguradoras
                  </button>
                </li>
                <li>
                  <button className="btn  btn-sm btn-outline-success">
                    <span>Sites</span> <span>& </span>
                    <span>Portais</span>
                  </button>
                </li>
                <li>
                  <button className="btn  btn-sm btn-outline-success">
                    Softwares
                  </button>
                </li>
                <li>
                  <button className="btn  btn-sm btn-outline-success">
                    <span> E-</span>
                    <span>commerce</span>{" "}
                  </button>
                </li>
              </ul>
            </div>

            {/* Cards com os dados das melhores empresas  */}

            <div className="bests-worst">
              <div className="row">
                <div className="melhores col-12 col-md-6">
                  <div className="card-best bg-white border-lightt p-2 rounded-1">
                    <div className="bg-success d-flex gap-2 head-texts rounded-1 p-3">
                      <img src={bom} alt="" />
                      <span className="my-auto text-white">
                        <b>Top 5 Melhores empresas mais bem avaliadas</b>
                      </span>
                    </div>
                    <br />
                    {melhoresEmpresasOrdenadas
                      .slice(0, 5)
                      .map((empresa, index) => (
                        <ScrollToTopLink
                          key={empresa.id}
                          to={`/pt/empresa/${empresa.id}`}
                          title={"Clique para ver empresa"}
                          className="empresa text-decoration-none my-3 shadow-sm d-flex gap-2 border-lightt p-2 rounded-1"
                        >
                          <h5 className="my-auto text-success">
                            <b>{`${index + 1}º`}</b>
                          </h5>
                          <img
                            src={empresa.logo}
                            className="logo-empresa"
                            alt=""
                          />
                          <div className="de my-auto">
                            <b>{empresa.nome}</b>
                            <p className="d-flex mt-1 my-auto gap-2 f-14">
                              {empresa.selo ? (
                                <img
                                  src={r360}
                                  alt=""
                                  className="icon-empresa"
                                />
                              ) : empresa.avaliacao >= 5.0 &&
                                empresa.avaliacao <= 6.9 ? (
                                <img
                                  src={regular}
                                  alt=""
                                  className="icon-empresa"
                                />
                              ) : empresa.avaliacao >= 7.0 &&
                                empresa.avaliacao <= 10.0 ? (
                                <img
                                  src={otimo}
                                  alt=""
                                  className="icon-empresa"
                                />
                              ) : empresa.avaliacao >= 3.0 &&
                                empresa.avaliacao <= 4.9 ? (
                                <img
                                  src={ruim}
                                  alt=""
                                  className="icon-empresa"
                                />
                              ) : empresa.avaliacao <= 2.9 ? (
                                <img
                                  src={naorecomendado}
                                  alt=""
                                  className="icon-empresa"
                                />
                              ) : null}

                              {empresa.selo ? (
                                <b className="my-auto f-12 text-secondary">
                                  {" "}
                                  R360
                                </b>
                              ) : empresa.avaliacao >= 5.0 &&
                                empresa.avaliacao <= 6.9 ? (
                                <b className="my-auto f-12 text-secondary">
                                  REGULAR
                                </b>
                              ) : empresa.avaliacao >= 7.0 &&
                                empresa.avaliacao <= 10.0 ? (
                                <b className="my-auto f-12 text-secondary">
                                  ÓTIMO
                                </b>
                              ) : empresa.avaliacao >= 3.0 &&
                                empresa.avaliacao <= 4.9 ? (
                                <b className="my-auto f-12 text-secondary">
                                  RUÍM
                                </b>
                              ) : empresa.avaliacao <= 2.9 ? (
                                <AbreviarTexto
                                  className="my-auto f-12 text-secondary"
                                  texto={"NÃO RECOMENDADO"}
                                  largura={90}
                                />
                              ) : (
                                <b className="my-auto f-12 text-secondary">
                                  SEM DADOS{" "}
                                </b>
                              )}
                            </p>
                          </div>
                        </ScrollToTopLink>
                      ))}
                  </div>
                </div>
                <div className="piores mt-5 mt-md-0 col-12 col-md-6">
                  <div className="card-best bg-white border-lightt p-2 rounded-1">
                    <div className="bg-danger d-flex  gap-2 head-texts rounded-1 p-3">
                      <img src={mau} alt="" />
                      <span className="text-white my-auto">
                        <b>
                          Top 5 <b>Piores</b> empresas mais bem avaliadas
                        </b>
                      </span>
                    </div>
                    <br />
                    {pioresEmpresasOrdenadas
                      .slice(0, 5)
                      .map((empresa, index) => (
                        <ScrollToTopLink
                          key={empresa.id}
                          to={`/pt/empresa/${empresa.id}`}
                          title={"Clique para ver empresa"}
                          className="empresa text-decoration-none my-3 shadow-sm d-flex gap-2 border-lightt p-2 rounded-1"
                        >
                          <h5 className="my-auto text-success">
                            <b>{`${index + 1}º`}</b>
                          </h5>
                          <img
                            src={empresa.logo}
                            className="logo-empresa"
                            alt=""
                          />
                          <div className="de my-auto">
                            <b>{empresa.nome}</b>
                            <p className="d-flex justify-content-start mt-1 my-auto gap-2 f-14">
                              {empresa.selo ? (
                                <img
                                  src={r360}
                                  alt=""
                                  className="icon-empresa"
                                />
                              ) : empresa.avaliacao >= 5.0 &&
                                empresa.avaliacao <= 6.9 ? (
                                <img
                                  src={regular}
                                  alt=""
                                  className="icon-empresa"
                                />
                              ) : empresa.avaliacao >= 7.0 &&
                                empresa.avaliacao <= 10.0 ? (
                                <img
                                  src={otimo}
                                  alt=""
                                  className="icon-empresa"
                                />
                              ) : empresa.avaliacao >= 3.0 &&
                                empresa.avaliacao <= 4.9 ? (
                                <img
                                  src={ruim}
                                  alt=""
                                  className="icon-empresa"
                                />
                              ) : empresa.avaliacao <= 2.9 ? (
                                <img
                                  src={naorecomendado}
                                  alt=""
                                  className="icon-empresa"
                                />
                              ) : null}

                              {empresa.selo ? (
                                <b className="my-auto f-12 text-secondary">
                                  {" "}
                                  R360
                                </b>
                              ) : empresa.avaliacao >= 5.0 &&
                                empresa.avaliacao <= 6.9 ? (
                                <b className="my-auto f-12 text-secondary">
                                  REGULAR
                                </b>
                              ) : empresa.avaliacao >= 7.0 &&
                                empresa.avaliacao <= 10.0 ? (
                                <b className="my-auto f-12 text-secondary">
                                  ÓTIMO
                                </b>
                              ) : empresa.avaliacao >= 3.0 &&
                                empresa.avaliacao <= 4.9 ? (
                                <b className="my-auto f-12 text-secondary">
                                  RUÍM
                                </b>
                              ) : empresa.avaliacao <= 2.9 ? (
                                <AbreviarTexto
                                  className="my-auto f-12 text-secondary"
                                  texto={"NÃO RECOMENDADO"}
                                  largura={90}
                                />
                              ) : (
                                <b className="my-auto f-12 text-secondary">
                                  SEM DADOS{" "}
                                </b>
                              )}
                            </p>
                          </div>
                        </ScrollToTopLink>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <div className="desconto container">
        <div className="row flex-row-reverse">
          <div className="col-12 imm col-md-5">
            <img src={desc} alt="" className=" my-auto -100" />
          </div>
          <div className="col-12 tt col-md-7">
            <div className="my-auto">
              <h2 className="fw-bold">Encontre os melhores descontos</h2>
              <h5 className="text-secondary">
                Compre com desconto e em segurança nas empresas mais confiáveis.
              </h5>

              <br />
              <ScrollToTopLink
                to={"/pt/descontos"}
                className="btn rounded-1 btn-outline-success"
              >
                Ver Todos os Descontos
              </ScrollToTopLink>
            </div>
          </div>
        </div>
      </div>
      <br />

      <br />
      <div className="aba-lojas-online container">
        <h2>
          <b>
            Lojas online com selo R360 ({" "}
            <b className="text-success">Reputação 360 </b> )
          </b>
        </h2>
        <br />
        <div className="lista-lojas">
          <div className="d-flex scroll-md gap-4">
            {dadosEmpresas.map(
              (empresa) =>
                empresa.selo === true && (
                  <div
                    key={empresa.id}
                    className="card-loja text-center rounded-1 border-lightt p-3 shadow-sm"
                  >
                    <img src={empresa.logo} alt="" className="logo-empresa" />
                    <div className="bod">
                      <br />
                      <AbreviarTexto texto={empresa.nome} largura={"200"} />

                      <p className="d-flex justify-content-center mt-1 my-auto gap-2 f-14">
                        {empresa.selo ? (
                          <img src={r360} alt="" className="icon-empresa" />
                        ) : empresa.avaliacao >= 5.0 &&
                          empresa.avaliacao <= 6.9 ? (
                          <img src={regular} alt="" className="icon-empresa" />
                        ) : empresa.avaliacao >= 7.0 &&
                          empresa.avaliacao <= 10.0 ? (
                          <img src={otimo} alt="" className="icon-empresa" />
                        ) : empresa.avaliacao >= 3.0 &&
                          empresa.avaliacao <= 4.9 ? (
                          <img src={ruim} alt="" className="icon-empresa" />
                        ) : empresa.avaliacao <= 2.9 ? (
                          <img
                            src={naorecomendado}
                            alt=""
                            className="icon-empresa"
                          />
                        ) : null}

                        {empresa.selo ? (
                          <b className="my-auto f-12 text-secondary"> R360</b>
                        ) : empresa.avaliacao >= 5.0 &&
                          empresa.avaliacao <= 6.9 ? (
                          <b className="my-auto f-12 text-secondary">REGULAR</b>
                        ) : empresa.avaliacao >= 7.0 &&
                          empresa.avaliacao <= 10.0 ? (
                          <b className="my-auto f-12 text-secondary">ÓTIMO</b>
                        ) : empresa.avaliacao >= 3.0 &&
                          empresa.avaliacao <= 4.9 ? (
                          <b className="my-auto f-12 text-secondary">RUÍM</b>
                        ) : empresa.avaliacao <= 2.9 ? (
                          <AbreviarTexto
                            className="my-auto f-12 text-secondary"
                            texto={"NÃO RECOMENDADO"}
                            largura={90}
                          />
                        ) : (
                          <b className="my-auto f-12 text-secondary">
                            SEM DADOS{" "}
                          </b>
                        )}
                      </p>
                      <a
                        href={`https://${empresa.site}`}
                        className="btn mt-2 btn-sm btn-outline-success"
                      >
                        Acessar <i className="bi bi-arrow-right-short"></i>
                      </a>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />

      <br />
      <br />

      <div className="blog container">
        <center>
          <img src={blog} className="logo-blog" alt="" />
        </center>
        <br />
        <br />

        <div className="lista-blog">
          <div className="d-flex overflow-x-auto scroll-md gap-4">
            {/* <div className="card-blog rounded-1 border-lightt shadow-sm">
              <img src={b1} alt="" className="logo-blog" />
              <div className="bod px-3 pb-3">
                <br />
                <AbreviarTexto
                  texto={
                    "'Informacoa oode kwhewwhechjwbebcmegwmg wehggwe mugewmgduge2ufweg egwhjc  hegwfjgwehh evchj.egwfhgwefwe'"
                  }
                  largura={"350"}
                />

                <p className="d-flex pb-2 mt-1 my-auto gap-2 f-14">
                  <span className="my-auto text-secondary">23/12/2023</span>
                </p>
                <a className=" ">
                  Ler mais <i className="bi bi-arrow-right-short"></i>
                </a>
              </div>
            </div> */}
            {articles.map((artigo) => (
              <div className="card-blog rounded-1 border-lightt shadow-sm">
                <img src={artigo.coverImage} alt="" className="logo-blog" />
                <div className="bod px-3 pb-3">
                  <br />
                  <AbreviarTexto
                    texto={artigo.title}
                    largura={"390"}
                  />

                  <p className="d-flex pb-2 mt-1 my-auto gap-2 f-14">
                    <span className="my-auto text-secondary">{artigo.date}</span>
                  </p>
                  <a href={'/pt/blog/'+artigo.id} className=" ">
                    Ler matéria <i className="bi bi-arrow-right-short"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <br />
        <br />

        <center>
          <button className="btn btn-success">
            Ver todas as materias <i className="bi bi-arrow-right-short"></i>
          </button>
        </center>
      </div>

      <br />
      <br />
      <br />
      <br />
      <div className="benefits pt-4 pb-5 bg-success">
        <div className="bbann justify-content-between d-flex">
          <img src={africa} alt="" className="africa-ban" />
          <img src={africa} alt="" className="africa-ban" />
        </div>
        <div className="container">
          <div className="row ">
            <div className="col-12 col-lg-3 col-xxl-4">
              <div className="titt container">
                <h2 className="text-white">
                  <b>Reputação 360 para empresas</b>
                </h2>
                <h5
                  className="
          text-white"
                >
                  O Reputação 360 é o canal OFICIAL do consumidor Angolano! Ele
                  atua como um canal independente de comunicação entre
                  consumidores e empresas.
                </h5>
                <img src={africa} alt="" className="africa-ban" />
              </div>
            </div>
            <div className="col-12 col-lg-9 col-xxl-8">
              <div className="cards-emp w-100">
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-4 my-3">
                    <div className="card-benefit rounded-1 shadow-md p-3 bg-white">
                      <b className="f-reg">Área da Empresa</b>
                      <br />
                      <span className="f-14">
                        Responda as reclamações, peça avaliação e personalize
                        sua página com informações básicas.
                      </span>
                      <br />
                      <br />
                      <br />
                      <a href="#" className="f-14">
                        Acessar <i className="bi bi-arrow-right-short"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 my-3">
                    <div className="card-benefit rounded-1 shadow-md p-3 bg-white">
                      <b className="f-reg">Cadastrar Empresa</b>
                      <br />
                      <span className="f-14">
                        Conquiste a confiança de milhões de pessoas em todo o
                        Brasil e esteja no maior site de pesquisa de compra.
                      </span>
                      <br />
                      <br />
                      <br />
                      <a href="#" className="f-14">
                        Faça parte do R360{" "}
                        <i className="bi bi-arrow-right-short"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 my-3">
                    <div className="card-benefit rounded-1 shadow-md p-3 bg-white">
                      <b className="f-reg">Blog R360</b>
                      <br />
                      <span className="f-14">
                        O melhor conteúdo para você entender mais sobre o R360,
                        atendimento e direito do consumidor.
                      </span>
                      <br />
                      <br />
                      <br />
                      <a href="#" className="f-14">
                        Acesse o blog{" "}
                        <i className="bi bi-arrow-right-short"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 my-3">
                    <div className="card-benefit rounded-1 shadow-md p-3 bg-white">
                      <b className="f-reg">Divulgue sua marca</b>
                      <br />
                      <span className="f-14">
                        Aproveite para aumentar a confiança dos consumidores que
                        pesquisam sobre você e destaque sua empresa.
                      </span>
                      <br />
                      <br />
                      <br />
                      <a href="#" className="f-14">
                        Saiba mais <i className="bi bi-arrow-right-short"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 my-3">
                    <div className="card-benefit rounded-1 shadow-md p-3 bg-white">
                      <b className="f-reg">Gerencie suas reclamações</b>
                      <br />
                      <span className="f-14">
                        Agilize seu atendimento e facilite a rotina de quem
                        atende o Reputação 360
                      </span>
                      <br />
                      <br />
                      <br />
                      <a href="#" className="f-14">
                        Saiba mais <i className="bi bi-arrow-right-short"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 my-3">
                    <div className="card-benefit rounded-1 shadow-md p-3 bg-white">
                      <b className="f-reg">Aumente a performance do seu time</b>
                      <br />
                      <span className="f-14">
                        Atualize sua equipe com conhecimentos e insights para
                        enfrentar desafios do relacionamento com o consumidor.
                      </span>
                      <br />
                      <br />
                      <br />
                      <a href="#" className="f-14">
                        Saiba mais <i className="bi bi-arrow-right-short"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      <div className="partners text- bg-white my-3 py-5 text-center">
        <center>
          <h2 className="f-reg">PARCEIROS</h2>
        </center>

        <br />
        <center className="d-flex flex-wrap partners gap-4 justify-content-center">
          <img src={gk} alt="" />
          <img src={pleno} alt="" />
          <img src={sdq} alt="" />
        </center>
      </div>
      <br />
      <br />

      <br />
      <div className="desconto container">
        <div className="row flex-row-reverse">
          <div className="col-12 imm col-md-5">
            <img src={eduka} alt="" className=" my-auto -100" />
          </div>
          <div className="col-12 tt col-md-7">
            <div className="my-auto">
              <h2 className="fw-bold f-reg">R360 EDUKA</h2>

              <span>
                Aqui, você e sua equipe adquirem conhecimento e insights
                atualizados para colocar a mão na massa e enfrentar os desafios
                reais de um time de atendimento. Construa uma carreira de
                sucesso com o RA Educa!
              </span>

              <br />
              <br />
              <ScrollToTopLink
                disabled
                to={"/pt/descontos"}
                className="btn rounded-1 disabled btn-outline-success"
              >
                Brevemente Disponível
              </ScrollToTopLink>
            </div>
          </div>
        </div>
      </div>
      <br />

      <br />
      <br />

      <div className="publicidade text-white bg-secondary my-3 py-5 text-center">
        <br />
        <br />
        <h5>Publicidade</h5>

        <br />
        <br />
      </div>
      <br />
      <br />
    </>
  );
};

export default Banner;
