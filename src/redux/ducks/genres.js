import axios from "axios";

const initialState = {
   items: [],
   selectedItems:[],
   loading:false
};

export default function genres (state = initialState, action) {
   switch (action.type) {
      case 'genres/load/start':
         return {
            ...state,
            loading:true
         };
      case 'genres/load/success':
         return {
            ...state,
            items:action.payload,
            loading:false
         };
         case 'add/genre':
            return {
               ...state,
               selectedItems:[...state.selectedItems, action.payload],
               items:state.items.filter((item) => item.id !== action.payload.id),
            };
            case 'remove/genre':
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
         type:'genres/load/start'
      })
       axios.get(
         `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
         .then(response =>{
            dispatch({
               type:"genres/load/success",
               payload:response.data.genres
            })
         })
          
         .catch(error=>{
            dispatch({
               type:"genres/load/failure",
               payload:error.message
            })
         }) 
   }}


   export function addGenre(genre) {
      return { 
            type:'add/genre',
            payload:genre
      }
   }

   export function removeGenre(genre) {
      return { 
            type:'remove/genre',
            payload:genre
      }
   }