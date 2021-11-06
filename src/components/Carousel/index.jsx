import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useEffect, useState } from 'react';
import { img_300, noPicture } from '../config/config.jsx';
import axios from 'axios';
import styles from "./Carousel.module.css"

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ id, media_type }) => {
   const [credits, setCredits] = useState([]);

   const fetchCredits = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setCredits(data.cast);
    };
  
    useEffect(() => {
      fetchCredits();
      // eslint-disable-next-line
    }, []);  

    const responsive = {
      0: {
        items: 3,
      },
      512: {
        items: 5,
      },
      1024: {
        items: 7,
      },
    };

    const items = credits.map((item) => (
      <div className={styles.carousel_item}>
        <img
          src={item.profile_path ? `${img_300}/${item.profile_path}` : noPicture}
          alt={item?.name}
          onDragStart={handleDragStart}
          className={styles.carousel_img}
        />
        <b className={styles.carousel_txt}>{item?.name}</b>
      </div>
    ));

  return (
    <AliceCarousel 
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
}

export default Carousel;