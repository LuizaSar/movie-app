import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import styles from './Movies.module.css'
import ContentCard from '../../ContentCard/index'
import CustomPagination from '../../Pagination/index'
import Genres from '../../Genres/index'
import { useDispatch, useSelector } from 'react-redux'
import {loadMovies} from '../../../redux/ducks/movies'


function Movies() {
   const [page, setPage] = useState(1);
   const [numOfPages, setNumOfPages] = useState();
   const selectedGenres = useSelector(state => state.genres.selectedItems)
   const movies = useSelector(state => state.movies.items)
   const pages = useSelector(state => state.movies.pages)

    
   function genresIDs (selectedGenres) {
      if (selectedGenres.length < 1) {
         return ""
      }
      else { 
      const GenreIds = selectedGenres.map((item) => item.id);
      return GenreIds.reduce((acc, curr) => acc + "," + curr);
   }
   };
    const genreforURL = genresIDs(selectedGenres);
    const dispatch = useDispatch();

    useEffect(() => {
      window.scroll(0, 0);
      dispatch(loadMovies(page, genreforURL));
      setNumOfPages(pages);
    }, [genreforURL, page]);

   return (
      <div>
         <div className={styles.title}>Movies</div>
         <Genres
                  type="movie"
                  setPage={setPage}
         />
         <div className={styles.movie_cards}>
            {movies && movies.map((item)=>{ 
               return ( 
            <ContentCard 
            key={item.id} 
            id={item.id} 
            poster={item.poster_path} 
            title={item.title || item.name} 
            date={item.first_air_date || item.release_date} 
            media_type="movie"
            vote_average={item.vote_average}
            />
            )})}
         </div>
         {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={pages} />
      )}
      </div>
   )
}

export default Movies
