import React from 'react'
import Pagination from '@material-ui/lab/Pagination';


function CustomPagination({setPage,numOfPages}) {
   const handlePageChange = (page) => {
      setPage(page);
      window.scroll(0, 0);
    };
   return (
      <div 
      style={{
         width: "100%",
         display: "flex",
         justifyContent: "center",
         marginTop: 10,
       }}
       > 
         <Pagination 
         count={numOfPages} 
         color="secondary"  
         onChange={(e)=> handlePageChange(e.target.textContent)}
         hideNextButton
         hidePrevButton
         />
      </div>
   )
}

export default CustomPagination
