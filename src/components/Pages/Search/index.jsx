import React from 'react';
import styles from './Search.module.css';
import {
  ThemeProvider,
  TextField,
  Button,
  createTheme,
  Tabs,
  Tab,
} from '@material-ui/core';
import  SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomPagination from '../../CustomPagination/index';
import ContentCard from '../../ContentCard/index';



function Search() {

   const [type, setType] = useState(0);
   const [searchText, setSearchText] = useState('');
   const [page, setPage] = useState(1);
   const [content, setContent] = useState([]);
   const [numOfPages, setNumOfPages] = useState();
 
   const darkTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#9b116d',
      },
    },
  });
 
 
   useEffect(() => {
     window.scroll(0, 0);
     fetchSearch();
     // eslint-disable-next-line
   }, [type, page]);
 
   const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`,
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
    // console.log(data);    
  }
 
   return (
      <div>
         <ThemeProvider theme={darkTheme}>
        <div className={styles.search}>
          <TextField
            style={{ flex: 1 }}
            className={styles.search_field}
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10, color: '#9b116d' }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: '50%' }} label="Search Movies" />
          <Tab style={{ width: '50%' }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <div className={styles.cards}>
        {content &&
          content.map((c) => (
            <ContentCard
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? 'tv' : 'movie'}
              vote_average={c.vote_average}
            />
          ))}
        {searchText && !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
      </div>
   )
}

export default Search
