const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    data : {}
}

export const currentVideoSlice = createSlice({
    name : 'currentVideoSlice',
    initialState,
    reducers: {
        setCurrentVideo(state , action) {
            state.data = action.payload
        },
        resetCurrentVideo(state , action){
            state.data = {}
        }
    }
})

export const { setCurrentVideo, resetCurrentVideo } = currentVideoSlice.actions
export default currentVideoSlice.reducer