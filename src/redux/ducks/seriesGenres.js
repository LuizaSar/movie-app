import axios from "axios";

const initialState = {
   items: [],
   selectedItems:[],
   loading:false
};

export default function seriesGenres (state = initialState, action) {
   switch (action.type) {
      case 'seriesGenres/load/start':
         return {
            ...state,
            loading:true
         };
      case 'seriesGenres/load/success':
         return {
            ...state,
            items:action.payload,
            loading:false
         };
         case 'add/seriesGenre':
            return {
               ...state,
               selectedItems:[...state.selectedItems, action.payload],
               items:state.items.filter((item) => item.id !== action.payload.id),
            };
            case 'remove/seriesGenre':
               return {
                  ...state,
                  selectedItems:state.selectedItems.filter((selected) => selected.id !== action.payload.id),
                  items:[...state.items, action.payload]
               }
      default:
         return state;
   }
}

export const loadGenres =  (type) => {
   return async (dispatch) => {
      dispatch({
         type:'series_genres/load/start'
      })
       axios.get(
         `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
         .then(response =>{
            dispatch({
               type:"seriesGenres/load/success",
               payload:response.data.genres
            })
         })
          
         .catch(error=>{
            dispatch({
               type:"seriesGenres/load/failure",
               payload:error.message
            })
         }) 
   }}


   export function addGenre(genre) {
      return { 
            type:'add/seriesGenre',
            payload:genre
      }
   }

   export function removeGenre(genre) {
      return { 
            type:'remove/seriesGenre',
            payload:genre
      }
   }