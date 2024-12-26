import { configureStore } from '@reduxjs/toolkit'
import mostWatchedReducer from './features/mostWatchedSlice'
import trendingReducer from './features/trendingSlice'
import loadingReducer from './features/loadingSlice'
import currentVideoReducer from './features/currentVideoSlice'
import todayMostWatchedReducer from './features/todayMostWatched'
import mostDownloadedReducer from './features/mostDownloaded'

export const makeStore = () => {
  return configureStore({
    reducer: {
        mostWatched: mostWatchedReducer,
        mostWatchedToday: todayMostWatchedReducer,
        mostDownloaded: mostDownloadedReducer,
        trending: trendingReducer,
        loading: loadingReducer,
        currentVideo: currentVideoReducer
    },
  })
}