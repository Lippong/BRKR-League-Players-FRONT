import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; //


const SummonerData = () => {
  const [summonerData, setSummonerData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://brkrbe-league-players-data.vercel.app/getSummonersList/');
        setSummonerData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do Summoner:', error);
      }
    }

    fetchData();
  }, []);

  const CalcularPorcentagem = (wins, losses) => {
  

  return (wins / (wins + losses)) * 100;

  }

  return (
    <div className='Container'>
      <div className='SpaceBetweenBox'><img src='/logo-brkr.svg'/><div className='MadeByMe'>Feito por Lipping</div></div>
      <ul className='PlayersList'>
        {summonerData.map((summoner, index) => (
          <div className="PlayerCard">
          <li key={index} className="PlayerContent">
          <div className='PlayerName'>{summoner.summonerName}</div>
          <div className='ContentBox'>
            <div className='PlayerCardImg'><img src={`/rankedemblems/${summoner.tier}.png`}/></div>
            <div className='StatusBox'>
              <div className='SpaceBetweenBox'>
                <div className='BoldText'>{summoner.tier} {summoner.rankedPosition}</div>
                {summoner.leaguePoints} PDL
              </div>
              <progress id="file" className='ProgressBar' value={CalcularPorcentagem(summoner.wins, summoner.losses).toFixed(0)} max="100"> 32% </progress>
              <div className='SpaceBetweenBox'>
              <div>{summoner.wins}V - {summoner.losses}D</div>
              <div>{CalcularPorcentagem(summoner.wins, summoner.losses).toFixed(2)} % </div>
              </div>
            </div>
          </div>
            
          </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SummonerData;
