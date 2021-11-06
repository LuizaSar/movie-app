import React from 'react'
import styles from './Header.module.css'

function Header () {
   return (
      <div>
         <div onClick={()=>window.scroll(0,0)} className={styles.header}>Entertainment Hub</div>
      </div>
   )
}

export default Header 
