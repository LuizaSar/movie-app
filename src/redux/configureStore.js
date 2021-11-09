import { applyMiddleware, combineReducers, createStore } from "redux";
import {movies, tvSeries, trending, movieGenres, seriesGenres} from './ducks'
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

const logger = createLogger({
   diff:true,
   collapsed:true
});

export const store = createStore(
   combineReducers({movies, tvSeries, trending, movieGenres, seriesGenres}),
   applyMiddleware(logger, thunk)
)