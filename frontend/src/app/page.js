'use client'
import { MdDownload } from "react-icons/md";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import { setLoading } from "@/redux/features/loadingSlice";
import { resetCurrentVideo, setCurrentVideo } from "@/redux/features/currentVideoSlice";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { setMostWatchedToday } from "@/redux/features/todayMostWatched";
import { FaEye } from "react-icons/fa";
import { ImClock } from "react-icons/im";

export default function Home() {
  const [inputUrl, setInputUrl] = useState("");
  const loading = useAppSelector(state => state.loading.isLoading) 
  const dispatch  = useAppDispatch()
  const todayMostWatched = useAppSelector(state => state.mostWatchedToday.videos)
  const trendingVideos = useAppSelector(state => state.trending.videos)
  const currentVideo = useAppSelector(state => state.currentVideo.data)
  const router = useRouter();
  const [currentTab , setCurrentTab] = useState({
    mostWatched: true,
    trending: false
  })

  const switchTabs = (tab) => {
    setCurrentTab({
      mostWatched: tab === 'mostWatched',
      trending: tab === 'trending'
    });
  };
  const getVideoData = async () => {
    //This function is triggered when download is clicked
    dispatch(setLoading(true))
    try {
      const baseServerUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

      console.log(`${baseServerUrl}/getData?url=${encodeURIComponent(inputUrl)}`);
  
      // Make sure the input URL is not empty
      if (!inputUrl.trim()) {
        alert("Please enter a valid YouTube link.");
        dispatch(setLoading(false))
        return;
      }
  
      // Make GET request to fetch video data
      const response = await fetch(`${baseServerUrl}/getData?url=${encodeURIComponent(inputUrl)}`);
      
      // Check if response is successful
      if (!response.ok){
        throw new Error(`Failed to fetch video data: ${response.status} ${response.statusText}`);
      }
  
      // Parse JSON response
      const data = await response.json();
      dispatch(setLoading(false))
      dispatch(setCurrentVideo(data))
      router.push(`/${data.videoId}`)
    } catch (error) {
      console.error("Error:", error);
      dispatch(setLoading(false))
      alert("Connection Failed. Try again.");
    }
  };
  function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hoursStr = hours > 0 ? `${hours}:` : '';
    const minutesStr = `${minutes < 10 ? '0' : ''}${minutes}:`;
    const secondsStr = `${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

    return hoursStr + minutesStr + secondsStr;
}
  useEffect(()=>{
    const getMostWatchedToday = async ()=>{
      dispatch(setLoading(true))
      try {
        const baseServerUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  
        console.log(`${baseServerUrl}/most-watched-today`);
    
        // Make GET request to fetch video data
        const response = await fetch(`${baseServerUrl}/most-watched-today`);
        
        // Check if response is successful
        if (!response.ok) {
          throw new Error(`Failed to fetch video data: ${response.status} ${response.statusText}`);
        }
    
        // Parse JSON response
        const data = await response.json();
        console.log('fetched data' , data);
        dispatch(setLoading(false))
        dispatch(setMostWatchedToday(data))
        // Now you can handle the response data, such as displaying it to the user or triggering the download process
      } catch (error) {
        console.error("Error:", error);
        dispatch(setLoading(false))
        alert("Connection Failed. Try again.");
      }
    }
    getMostWatchedToday()
  },[])

  // useEffect(()=>{
  //   if(currentVideoId != null){
  //     router.push(`/${currentVideo.videoId}`)
  //   }
  // },[currentVideoId])
  return (
    <main>
      {loading ? (
          <div className="loading absolute top-0 left-0 w-full h-full bg-[#ffffff73] backdrop-blur-[1px] z-50 flex items-center justify-center">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#cd201f"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          ""
        )}
      <div className="home-downloader relative py-8 flex flex-col gap-2 items-center justify-center">
        <input
          type="search"
          name="search"
          id="nav-search"
          placeholder="Paste any Youtube Link"
          className=" border-2 border-secondary-red text-center py-2 w-[75%] bg-white rounded-sm outline-none"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />
        <button
          onClick={getVideoData}
          style={{ boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.25)" }}
          className=" nav-search-btn bg-white text-[20px] font-handel-gothic text-secondary-red px-3 rounded-[4px] py-[4px] flex items-center"
        >
          <span>Download</span>
          <MdDownload size={28} className=" transform translate-y-[1px]" />
        </button>
      </div>

      <div className="top-charts-home">
        <div className="tabs sticky top-0 z-20 backdrop-blur-[12px] flex justify-center items-center gap-6 bg-[#ffffff58] py-3 border-l-4 border-r-4 border-secondary-red">
          <button
            onClick={() => {
              switchTabs("mostWatched");
            }}
            className={`most-watched-btn ${
              currentTab.mostWatched ? " active " : ""
            } uppercase text-[#8a8a8a] font-roboto-reg font-semibold`}
          >
            Most Watched
          </button>
          <button
            onClick={() => {
              switchTabs("trending");
            }}
            className={`trending-btn ${
              currentTab.trending ? " active " : ""
            } uppercase text-[#8a8a8a] font-roboto-reg font-semibold`}
          >
            Most Downloaded
          </button>
        </div>
        {currentTab.mostWatched ? (
          <div className="most-watched mb-[52px] bg-white h-full overflow-y-auto z-10">
            {todayMostWatched.length > 0
              ? todayMostWatched.map((video, index) => (
                  <Link
                    key={index}
                    href={`/${video.videoId}`}
                    className="video-row relative bg-white border-b border-b-[#00000034] flex mb-2 overflow-hidden"
                  >
                    <Image
                      src={video.thumbnails[0].url}
                      className=" aspect-[159/89] max-w-[35%]"
                      width={159}
                      height={89}
                      alt={video.title}
                    />
                    <h2 className=" relative flex-1 title pl-2 pr-1 font-roboto-reg">
                      {video.title.slice(0, 54)}
                      {video.title.length > 54 ? "..." : ""}

                      <div className="stats w-full absolute bottom-0 left-0 px-2 bg-white text-[12px] font-roboto-med text-[#afafaf] flex items-center justify-between">
                        <span className="flex items-center gap-[3px]"> <FaEye /> {video.views.toLocaleString()}</span>
                        <span className="flex items-center gap-[3px]"><ImClock size={12} />{video.publishDate}</span>
                      </div>
                    </h2>
                    <div className="duration absolute bottom-0 font-roboto-reg text-sm px-[3px] py-[1px] left-0 rounded-tr w-max bg-[#ffffffbf]">
                      {formatDuration(video.duration)}
                    </div>
                  </Link>
                ))
              : ""}
          </div>
        ) : (
          <div className="trending mb-[52px] bg-white h-full overflow-y-auto z-10">
            {trendingVideos.map((video, index) => (
              <Link
                key={index}
                href={video.videoId}
                prefetch={false}
                className="video-row relative bg-white border-b border-b-[#00000034] flex mb-2 overflow-hidden"
              >
                <Image
                  src={video.img}
                  className=" aspect-[159/89] max-w-[35%]"
                  width={159}
                  height={89}
                  alt={video.title}
                />
                <h2 className=" title pl-2 pr-1 font-roboto-reg">
                  {video.title}
                </h2>
                <div className="duration absolute bottom-0 font-roboto-reg text-sm px-[3px] py-[1px] left-0 rounded-tr w-max bg-[#ffffffbf]">
                  8:23
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
