import React from 'react'
import styles from './Trending.module.css'
import {useState, useEffect} from "react"
import ContentCard from '../../ContentCard/index'
import CustomPagination from '../../Pagination/index'
import { useDispatch, useSelector } from 'react-redux'
import {loadTrending} from "../../../redux/ducks/trending"

function Trending() {
const dispatch = useDispatch();
const [page, setPage] = useState(1);
const [numOfPages, setNumOfPages] = useState(10);
  const content = useSelector((state=>{
      return state.trending.items
   }))

   useEffect(() => {
      dispatch(loadTrending(page))
   }, [page])

 

   return (
      <div>
         <div className={styles.title}> TRENDING TODAY</div>
         <div className={styles.trending_cards}>
            {content && content.map((item)=>{ 
               return ( 
            <ContentCard 
            key={item.id} 
            id={item.id} 
            poster={item.poster_path} 
            title={item.title || item.name} 
            date={item.first_air_date || item.release_date} 
            media_type={item.media_type}
            vote_average={item.vote_average}
            />
            )})}
         </div>
         <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
      </div>
   )
}

export default Trending
