import React, { useEffect, useState } from 'react';

import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header'

import './App.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

useEffect(() => {      // QUANDO CARREGAR A TELA VAI EXECUTAR A FUNÇÃO
  const loadAll = async () => {
// pegando a lista total
let list = await Tmdb.getHomeList();
setMovieList(list);

// pegando o featured

let originals = list.filter(i=>i.slug === 'originals');
let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
let chosen = originals[0].items.results[randomChosen];
// console.log(chosen)
let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
// console.log(chosenInfo);
setFeatureData(chosenInfo)
  }

  loadAll();
}, []);


useEffect(() => {
  const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
  }

  window.addEventListener('scroll', scrollListener);

return () => {
  window.removeEventListener('scroll', scrollListener);
}

}, []);

  return (
    <div className="page">

    <Header black={blackHeader} />

     {featureData &&
     <FeatureMovie item={featureData} />
     }

<section className="list">
  {movieList.map((item, key) => (
      <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
  ))}
</section>

<footer>
  Feito com amor por Laís Malta Dalpozur
</footer>

{movieList.length <= 0 &&
<div className="loading">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />
</div>
}
    </div>
  );
}

