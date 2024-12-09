import { configureStore } from '@reduxjs/toolkit'
import mostWatchedReducer from './features/mostWatchedSlice'
import trendingReducer from './features/trendingSlice'
import loadingReducer from './features/loadingSlice'
import currentVideoReducer from './features/currentVideoSlice'
import todayMostWatchedReducer from './features/todayMostWatched'

export const makeStore = () => {
  return configureStore({
    reducer: {
        mostWatched: mostWatchedReducer,
        mostWatchedToday: todayMostWatchedReducer,
        trending: trendingReducer,
        loading: loadingReducer,
        currentVideo: currentVideoReducer
    },
  })
}