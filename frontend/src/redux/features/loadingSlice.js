const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    isLoading: false
}

export const loadingSlice = createSlice({
    name : 'loading',
    initialState,
    reducers: {
        setLoading(state , action) {
            state.isLoading = action.payload
        }
    }
})
// export const mostWatchedSlice = createSlice({
//     name : 'mostWatchedVideos',
//     initialState,
//     reducers :{
//     }
// })

export const { setLoading } = loadingSlice.actions
export default loadingSlice.reducer