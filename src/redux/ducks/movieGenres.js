import axios from "axios";

const initialState = {
   items: [],
   selectedItems:[],
   loading:false
};

export default function movieGenres (state = initialState, action) {
   switch (action.type) {
      case 'movieGenres/load/start':
         return {
            ...state,
            loading:true
         };
      case 'movieGenres/load/success':
         return {
            ...state,
            items:action.payload,
            loading:false
         };
         case 'add/movieGenre':
            return {
               ...state,
               selectedItems:[...state.selectedItems, action.payload],
               items:state.items.filter((item) => item.id !== action.payload.id),
            };
            case 'remove/movieGenre':
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
         type:'movieGenres/load/start'
      })
       axios.get(
         `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
         .then(response =>{
            dispatch({
               type:"movieGenres/load/success",
               payload:response.data.genres
            })
         })
          
         .catch(error=>{
            dispatch({
               type:"movieGenres/load/failure",
               payload:error.message
            })
         }) 
   }}


   export function addGenre(genre) {
      return { 
            type:'add/movieGenre',
            payload:genre
      }
   }

   export function removeGenre(genre) {
      return { 
            type:'remove/movieGenre',
            payload:genre
      }
   }