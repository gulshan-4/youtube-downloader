"use client";
import { useRouter } from "next/navigation";
import { IoMdDownload } from "react-icons/io";
import YouTube from 'react-youtube';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { resetCurrentVideo, setCurrentVideo } from "@/redux/features/currentVideoSlice";
import './videopage-styles.css'
import { ThreeDots } from "react-loader-spinner";
import { BsVolumeMute } from "react-icons/bs"

const baseServerUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

function VideoPage() {
  const router = useRouter();
  const currentVideo = useAppSelector(state => state.currentVideo.data)
  const [formats, setFormats] = useState([])
  const [audioFormats, setAudioFormats] = useState([])
  const [downloading, setDownloading] = useState(false)
  const [audioTab , setAudioTab] = useState(false)
  const dispatch  = useAppDispatch()

//set CurrrentVideo Slice null when page loads
useEffect(()=>{
  console.log('set currrent video');
  dispatch(resetCurrentVideo())
}, [dispatch])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  const bytesToMegabytes = (bytes) => {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2) + 'mb';
};
function getTimeAgo(uploadDate) {
  const now = new Date();
  const upload = new Date(uploadDate);

  const timeDiff = now.getTime() - upload.getTime();
  const secondsDiff = Math.floor(timeDiff / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);
  const monthsDiff = Math.floor(daysDiff / 30);
  const yearsDiff = Math.floor(monthsDiff / 12);

  if (yearsDiff > 0) {
      return yearsDiff === 1 ? '1 year ago' : `${yearsDiff} years ago`;
  } else if (monthsDiff > 0) {
      return monthsDiff === 1 ? '1 month ago' : `${monthsDiff} months ago`;
  } else if (daysDiff > 0) {
      return daysDiff === 1 ? '1 day ago' : `${daysDiff} days ago`;
  } else if (hoursDiff > 0) {
      return hoursDiff === 1 ? '1 hour ago' : `${hoursDiff} hours ago`;
  } else if (minutesDiff > 0) {
      return minutesDiff === 1 ? '1 minute ago' : `${minutesDiff} minutes ago`;
  } else {
      return 'Just now';
  }
}
  // console.log(currentVideo)

useEffect(() => {
  if (currentVideo.videoId) {
    // console.log(
    //   currentVideo.formats.filter((format) => format.container.includes("mp4"))
    // );
    
    let mp4Formats = currentVideo.formats.filter((format) =>{
      console.log('currentVideo :' , currentVideo);
      return (format.mimeType?.includes("video/mp4") && format.qualityLabel?.length && format.contentLength)
    }     
    );

    // Group formats by quality
    let groupedFormats = {};
    mp4Formats.forEach((format) => {
      // console.log(mp4Formats);
      
      if (
        !groupedFormats[format.qualityLabel] ||
        parseInt(groupedFormats[format.qualityLabel].sizeInBytes) < parseInt(format.contentLength)
      ) {
        groupedFormats[format.qualityLabel] = {
          sizeInBytes: format.contentLength,
          quality: format.qualityLabel,
          url: format.url,
          hasAudio : format.hasAudio
        };
      }
    });
    console.log('mp4formats :' , mp4Formats);
    
    let groupedAudioFormats = {}
    currentVideo.audioFormats.forEach((format) => {
      if (
        !groupedFormats[format.audioBitrate] ||
        parseInt(groupedAudioFormats[format.audioBitrate].sizeInBytes) < parseInt(format.contentLength)
      ) {
        groupedAudioFormats[format.audioBitrate] = {
          sizeInBytes: format.contentLength,
          audioBitrate: format.audioBitrate,
          url: format.url,
        };
      }
    });

    // Collect the highest-size formats into a new array
    let filteredFormats = Object.values(groupedFormats).sort((a, b) => b.sizeInBytes - a.sizeInBytes);
    let filteredAudioFormats = Object.values(groupedAudioFormats).sort((a, b) => b.audioBitrate - a.audioBitrate);
// console.log(filteredAudioFormats);
setAudioFormats(filteredAudioFormats);
setFormats(filteredFormats);
console.log(filteredFormats);

    //------------Keep dublicates of qualities-------------//
// let updatedFormats = mp4Formats.map(object => ({
//   sizeInBytes: object.contentLength,
//   quality: object.qualityLabel,
//   url: object.url
// }));

// setFormats([...formats, ...updatedFormats]);

  }
}, [currentVideo]);

//if CurrentVideo object is empty on pageLoad, fetchData using '/getDataWithId' api by extracting Id from url
useEffect(() => {
  const fetchData = async () => {
    console.log('getting data' , window.location.pathname);
    const videoId = window.location.pathname.split('/').pop();
    console.log('--------', videoId);
    try {
      const response = await fetch(`${baseServerUrl}/getDataWithId?id=${videoId}`);
      // console.log(response);
      if (!response.ok) {
        throw new Error(`Failed to fetch video data: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      dispatch(setCurrentVideo(data));
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch video data. Please try again later.");
    }
  };

  if (!currentVideo.videoId) {
    fetchData();
  }
}, [currentVideo , dispatch]);
const hitMostDownloadedAPI = async () => {
  try {
      const resp = await fetch(`${baseServerUrl}/most-downloaded`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json" // Set content type to JSON
          },
          body: JSON.stringify(currentVideo), // Stringify the object
      });
      if (!resp.ok) {
          throw new Error(`Failed while hitting Most Downloaded API: ${resp.status} ${resp.statusText}`);
      }
      console.log(resp);
      return resp.json();
  } catch (error) {
      console.error("Error:", error);
  }
}

const handleDownload = async (url, title, mimeType, format) => {
  await hitMostDownloadedAPI()
  setDownloading(true)

  // Trigger the download by making a GET request to the /download endpoint with query parameters
  const queryString = new URLSearchParams({
    url,
    title,
    mimeType,
    format
  }).toString();

  fetch(`${baseServerUrl}/download?${queryString}`, {
    method: 'GET'
  }).then(response => {
    try{
      window.open(response.url, '_blank')
    }catch{
      router.push(response.url)
    }
    setDownloading(false)
  }).catch(error => {
    console.log(error);
    setDownloading(false)
    alert('Connection Failed, Try Again')
  });
};

const handleAudioDownload = (url, title) => {
  setDownloading(true)
  // Trigger the download by making a GET request to the /download endpoint with query parameters
  const queryString = new URLSearchParams({
    url,
    title
  }).toString();
  console.log(`${baseServerUrl}/downloadAudio?${queryString}`);
  fetch(`${baseServerUrl}/downloadAudio?${queryString}`, {
    method: 'GET'
    // Add any additional headers if needed
  }).then(response => {
    try{
      window.open(response.url, '_blank')
    }catch{
      router.push(response.url)
    }
    setDownloading(false)
  }).catch(error => {
    console.log(error);
    setDownloading(false)
    alert('Connection Failed, Try Again')
  });
};
if (!currentVideo.videoId) {
  return <div className="loading absolute top-0 left-0 w-full h-full bg-[#ffffff73] backdrop-blur-[1px] z-50 flex flex-col items-center justify-center">
  <div className=" text-lg text-[#565656] -mb-[20px]">Please Wait...</div>
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
  </div>; // or display a loading indicator
}
  return (
    <div className="video-page bg-[#f4f4f4] min-h-[91vh] mb-[63px]">
      {downloading && (
        <div className="loading absolute top-0 left-0 w-full h-full bg-[#ffffff73] backdrop-blur-[1px] z-50 flex flex-col items-center justify-center">
          <div className=" text-lg text-[#565656] font-bold -mb-[20px]">
            Starting Download...
          </div>
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
      )}
      <section className="w-[85%] relative mx-auto pt-5">
        <div
          className="thumbnail relative"
          style={{ paddingTop: `${(89 / 159) * 100}%`, width: "100%" }}
        >
          <YouTube
            videoId={currentVideo.videoId}
            className="w-full h-full absolute top-0 left-0 bottom-0 right-0"
            iframeClassName="video w-full h-full"
          />
          <p className=" text-sm font-medium duration bg-[#c0c0c0bf] w-max px-2 py-1 absolute bottom-0 right-0 rounded-tl-md">
            {formatTime(parseInt(currentVideo.lengthInseconds))}
          </p>
        </div>
        <div className="title-bar bg-white shadow-md pt-2 pb-2 pl-3 pr-2 rounded-b">
          <h1 className=" text-lg leading-tight font-roboto-med ">
            {currentVideo.title}
          </h1>
          <h2 className="font-roboto-med text-sm text-[#adadad] pt-1 flex items-center justify-between">
            <span>Views {parseInt(currentVideo.views).toLocaleString()}</span>
            <span>{getTimeAgo(currentVideo.uploadDate)}</span>
          </h2>
        </div>
        <div className="download-options w-max mx-auto bg-white shadow mt-3">
          <div className="tab-buttons flex items-center justify-center">
            <button
            onClick={()=>{
              setAudioTab(false)
            }}
              style={{
                opacity: !audioTab ? 1 : 0.75,
                border: !audioTab ? "3px solid white" : "none",
              }}
              className=" py-2 px-4 w-full text-center bg-secondary-red font-handel-gothic text-white"
            >
              Videos
            </button>
            <button
            onClick={()=>{
              setAudioTab(true)
            }}
              style={{
                opacity: audioTab ? 1 : 0.75,
                border: audioTab ? "3px solid white" : "none",
              }}
              className="py-2 px-4 w-full text-center bg-secondary-red font-handel-gothic text-white"
            >
              Audios
            </button>
          </div>
          <div className="  pl-3 pt-1 text-center text-secondary-red font-roboto-med uppercase">{!audioTab ? 'Video Formats' : 'Audio Formats'}</div>
          {
          audioTab ?
          audioFormats.map((format, index) => (
            <button
              key={index}
              onClick={() =>
                handleAudioDownload(
                  format.url,
                  currentVideo.title,
                )
              }
              className="option flex items-center w-full justify-between font-handel-gothic gap-5 py-3 px-5 border-b border-[#C89294]"
            >
              <span className="quality text-xs text-[#848484]">
                {format.audioBitrate}kbps
              </span>
              <span className="download-text flex items-center">
                Download
                <IoMdDownload className=" text-secondary-red" size={20} />
              </span>
              <span className="size text-xs tracking-wider text-[#8A8A8A]">
                {bytesToMegabytes(format.sizeInBytes)}
              </span>
            </button>
          )) :
          formats.length > 1
            ? formats.map((format, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleDownload(
                      format.url,
                      currentVideo.title,
                      "video/mp4",
                      format.container || "mp4"
                    )
                  }
                  className="option flex items-center w-full justify-between font-handel-gothic gap-5 py-3 px-5 border-b border-[#C89294]"
                >
                  <span className="quality text-xs text-[#848484]">
                    {
                      format.hasAudio ==  false ? <BsVolumeMute size={14} className=" text-primary-red inline mr-[2px]" /> : ""
                    }
                    {format.quality == "2160p" ? (
                      <>
                        {format.quality}
                        <sup className=" text-[11px] text-[#CD201F]">
                          4k
                        </sup>{" "}
                      </>
                    ) : format.quality == "1440p" ? (
                      <>
                        {format.quality}
                        <sup className=" text-[11px] text-[#CD201F]">2k</sup>
                      </>
                    ) : format.quality == "1080p" ? (
                      <>
                        {format.quality}
                        <sup className=" text-[11px] text-[#CD201F]">HD</sup>
                      </>
                    ) : (
                      format.quality
                    )}
                  </span>
                  <span className="download-text flex items-center">
                    Download
                    <IoMdDownload className=" text-secondary-red" size={20} />
                  </span>
                  <span className="size text-xs tracking-wider text-[#8A8A8A]">
                    {bytesToMegabytes(format.sizeInBytes)}
                  </span>
                </button>
              ))
            : "Loading" + `${console.log(formats)}`}
        </div>
      </section>
    </div>
  );
}

export default VideoPage;
