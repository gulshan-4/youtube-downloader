const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    videos : [
        {
            img: "/thumb.jpg",
            title: "Trending Video",
            videoId: "h5rgy6",
            link: "#",
          },
          {
            img: "/thumb.jpg",
            title: "Trending Video",
            videoId: "h5rgy6",
            link: "#",
          },
          {
            img: "/thumb.jpg",
            title: "Trending Video",
            videoId: "h5rgy6",
            link: "#",
          },
          {
            img: "/thumb.jpg",
            title: "Trending Video",
            videoId: "h5rgy6",
            link: "#",
          },
          {
            img: "/thumb.jpg",
            title: "Trending Video",
            videoId: "h5rgy6",
            link: "#",
          },
          {
            img: "/thumb.jpg",
            title: "Trending Video",
            videoId: "h5rgy6",
            link: "#",
          },
          {
            img: "/thumb.jpg",
            title: "Trending Video",
            videoId: "h5rgy6",
            link: "#",
          },
          {
            img: "/thumb.jpg",
            title: "Trending Video",
            videoId: "h5rgy6",
            link: "#",
          },
    ]
}

export const trendingSlice = createSlice({
    name : 'trendingSlice',
    initialState,
    reducers :{
    }
})

export default trendingSlice.reducer