import React, { useEffect, useState } from 'react';

import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';

import './App.css';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);

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


  return (
    <div className="page">

     {featureData &&
     <FeatureMovie item={featureData} />
     }

<section className="list">
  {movieList.map((item, key) => (
      <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
  ))}
</section>
    </div>
  );
}

