import React from 'react';

import { useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import { useDispatch, useSelector } from 'react-redux'
import {loadGenres, addGenre, removeGenre} from '../../redux/ducks/genres'

function Genres({
  type,
  setPage,
}) {
  
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(loadGenres(type));
      return () => {    
      };
      // eslint-disable-next-line
    }, []);
  
   const genres = useSelector(state => state.genres.items)
   const selectedGenres = useSelector(state => state.genres.selectedItems)
   const handleAddGenre = (genre) => {
   dispatch(addGenre(genre))
   setPage(1)
  };
   const handleRemoveGenre = (genre) => {
   dispatch(removeGenre(genre))
   setPage(1);
 };

  return (
    <div style={{ padding: '6px 0' }}>
        {selectedGenres && selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2}}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemoveGenre(genre)}
        />
      ))}
      {genres && genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAddGenre(genre)}
        />
      ))}
    </div>
  );
}

export default Genres;
