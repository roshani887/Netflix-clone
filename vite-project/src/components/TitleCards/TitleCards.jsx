import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = ({title,category}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzcxYzVmODUzNjEzODg2YTczNWUzMGQ3NmUwZTdlNSIsIm5iZiI6MTc0MDEyODgxMy4zNTksInN1YiI6IjY3Yjg0MjJkNTUwMzI5Mjc1NjIyNjUxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HSVr-J3oNVKplwkJ-GN8MR8B5HewFsn5PosZEyBCcrM'
    }
  };
  
  
  const handleWheel = (event) =>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err)); 
   cardsRef.current.addEventListener('wheel',handleWheel);
  },[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
   


      {apiData.map((card,index)=>{
          return <div className="card" key={index}>
          <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=""  /> 
          <p>{card.original_title}</p>
          </div>
      })}
        
      </div>
    </div>
  )
}

export default TitleCards






