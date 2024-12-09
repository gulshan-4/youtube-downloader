const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    videos : [
        {
            img: "/thumb.jpg",
            title: "Auto playing image slider using html css and js | web zone",
            videoId: "h5rgy6",
            link: "#",
          },
          {
            img: "/thumb.jpg",
            title: "Auto playing image slider using html css and js | web zone",
            videoId: "h5rgy6",
            link: "#",
          },
          {
            img: "/thumb.jpg",
            title: "Auto playing image slider using html css and js | web zone",
            videoId: "h5rgy6",
            link: "#",
          },
          {
            img: "/thumb.jpg",
            title: "Auto playing image slider using html css and js | web zone",
            videoId: "h5rgy6",
            link: "#",
          },
          {
            img: "/thumb.jpg",
            title: "Auto playing image slider using html css and js | web zone",
            videoId: "h5rgy6",
            link: "#",
          },
          {
            img: "/thumb.jpg",
            title: "Auto playing image slider using html css and js | web zone",
            videoId: "h5rgy6",
            link: "#",
          },
          {
            img: "/thumb.jpg",
            title: "Auto playing image slider using html css and js | web zone",
            videoId: "h5rgy6",
            link: "#",
          },
          {
            img: "/thumb.jpg",
            title: "Auto playing image slider using html css and js | web zone",
            videoId: "h5rgy6",
            link: "#",
          },
    ]
}

export const mostWatchedSlice = createSlice({
    name : 'mostWatchedVideos',
    initialState,
    reducers :{
    }
})

export default mostWatchedSlice.reducer