const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    videos : {}
}

export const mostDownloaded = createSlice({
    name : 'mostDownloadedSlice',
    initialState,
    reducers: {
        setMostDownloaded(state , action) {
            state.videos = action.payload
        }
    }
})

export const { setMostDownloaded } = mostDownloaded.actions
export default mostDownloaded.reducer