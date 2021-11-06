import axios from "axios";

const initialState = {
   items: [],
   loading:false
};

export default function trending (state = initialState, action) {
   switch (action.type) {
      case 'trending/load/start':
         return {
            ...state,
            loading:true
         };
      case 'trending/load/success':
         return {
            ...state,
            items:action.payload,
            loading:false
         };
      default:
         return state;
   }
}

export const loadTrending =  (page) => {
   return async (dispatch) => {
      dispatch({
         type:'trending/load/start'
      })
       axios.get(
         `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
         .then(response =>{
            dispatch({
               type:"trending/load/success",
               payload:response.data.results
            })
         })
          
         .catch(error=>{
            dispatch({
               type:"trending/load/failure",
               payload:error.message
            })
         }) 
   }}