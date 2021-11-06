import axios from "axios";

const initialState = {
   items: [],
   pages:0,
   loading:false
};

export default function movies (state = initialState, action) {
   switch (action.type) {
      case 'movies/load/start':
         return {
            ...state,
            loading:true
         };
      case 'movies/load/success':
         return {
            ...state,
            items:action.payload.results,
            pages:action.payload.total_pages,
            loading:false
         };
      default:
         return state;
   }
}

export const loadMovies =  (page, genreforURL) => {
   return async (dispatch) => {
      dispatch({
         type:'movies/load/start'
      })
       axios.get(
         `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
         .then(response =>{
            dispatch({
               type:"movies/load/success",
               payload:response.data
            })
         })
          
         .catch(error=>{
            dispatch({
               type:"movies/load/failure",
               payload:error.message
            })
         }) 
   }}



   