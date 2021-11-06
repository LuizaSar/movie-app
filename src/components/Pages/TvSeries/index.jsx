import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import styles from './TvSeries.module.css'
import ContentCard from '../../ContentCard/index'
import CustomPagination from '../../Pagination/index'
import Genres from '../../Genres/index'
import {useSelector, useDispatch} from 'react-redux'
import { loadTVSeries } from '../../../redux/ducks/tvSeries';

function TvSeries() {

   const [page, setPage] = useState(1);
   const [numOfPages, setNumOfPages] = useState();
   const selectedGenres = useSelector(state => state.genres.selectedItems)
   const series = useSelector(state => state.tvSeries.items)
   const pages = useSelector(state => state.tvSeries.pages)
   const dispatch = useDispatch();
   
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


    useEffect(() => {
      window.scroll(0, 0);
      dispatch(loadTVSeries(page, genreforURL));
      setNumOfPages(pages);
    }, [genreforURL, page]);

   

   return (
      <div>
          <div className={styles.title}>TV Series</div>
          <Genres
                  type="tv"
                  setPage={setPage}
         />
         <div className={styles.tv_cards}>
            {series && series.map((item)=>{ 
               return ( 
            <ContentCard 
            key={item.id} 
            id={item.id} 
            poster={item.poster_path} 
            title={item.title || item.name} 
            date={item.first_air_date || item.release_date} 
            media_type="tv"
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

export default TvSeries
