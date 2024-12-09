const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    videos : {}
}

export const todayMostWatched = createSlice({
    name : 'todayMostWatchedSlice',
    initialState,
    reducers: {
        setMostWatchedToday(state , action) {
            state.videos = action.payload
        }
    }
})

export const { setMostWatchedToday } = todayMostWatched.actions
export default todayMostWatched.reducer