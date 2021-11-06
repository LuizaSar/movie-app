import React from 'react';
import styles from './App.module.css'
import Header from '../Header/index'
import Trending from '../Pages/Trending/index'
import Movies from '../Pages/Movies/index'
import Series from '../Pages/TvSeries/index'
import Search from '../Pages/Search/index'
import Navigation from '../Navigation/index'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from '@material-ui/core';

function App() {
  return ( 
   <BrowserRouter>
   <Header/>
   <div className={styles.container}>
   <Container>
      <Switch>
         <Route exact path='/' component={Trending}/>
         <Route path='/movies' component={Movies}/>
         <Route path='/series' component={Series}/>
         <Route path='/search' component={Search}/>
      </Switch>
   </Container>
  </div>
  <Navigation/>
  </BrowserRouter>
  );
}

export default App;
