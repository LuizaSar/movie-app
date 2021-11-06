import React from 'react'
import {unavailable, img_300} from "../config/config"
import styles from './ContentCard.module.css'
import {Badge} from "@material-ui/core"
import ModalContent from '../ModalContent/index'


function ContentCard({
   id,
   poster,
   title,
   date,
   media_type,
   vote_average,
}) {
   return (
         <ModalContent media_type={media_type} id={id}>
         <Badge badgeContent={vote_average} color={vote_average>6 ? 'primary' : 'secondary' }/>
         <img
        className={styles.poster}
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <div className={styles.card_title}>{title}</div>
      <div className={styles.sub_title}>
        <div className={styles.media_type}>{media_type === "tv" ? "TV Series" : "Movie"}</div>
        <div className={styles.date}>{date}</div>
      </div>
      </ModalContent>
   )
}

export default ContentCard
