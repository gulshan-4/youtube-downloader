"use client";
import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { ImClock } from "react-icons/im";
import { ThreeDots } from "react-loader-spinner"; // Assuming this is imported

function Page({ params }) {
  const [results, setResults] = useState([]);
  const loading = useAppSelector((state) => state.loading.isLoading);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  function handleSearch(e){
    console.log(e.target.value);
    setSearchQuery(e.target.value)
  }

  useEffect(() => {
    async function unwrapParams() {
      const unwrappedParams = await params;
      if (unwrappedParams.searchResults) {
        setSearchQuery(decodeURIComponent(unwrappedParams.searchResults));
      }
    }
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (searchQuery) {
      const baseServerUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

      async function getResults() {
        dispatch(setLoading(true));
        try {
          const response = await fetch(
            `${baseServerUrl}/search-youtube?q=${searchQuery}`
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch video data: ${response.status} ${response.statusText}`
            );
          }
          const data = await response.json();
          console.log(data);

          dispatch(setLoading(false));
          setResults(data);
        } catch (err) {
          console.log("Error searching data:", err);
        }
      }

      getResults();
    }
  }, [searchQuery, dispatch]);

  return (
    <div className="results-page bg-[#d8d8d8] mt-0 pb-16">
      {loading && (
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
      )}

      <div className="sticky-search sticky top-0 backdrop-blur-sm z-20">
        <h1 className="pt-4 pb-1 pl-1 text-[#282828] text-center text-xl font-roboto-med">
          Search Results
        </h1>
        <div className="searchbar relative w-max flex flex-col items-center mx-auto">
          <input
            type="search"
            name="search"
            onChange={(e) => handleSearch(e)}
            value={searchQuery}
            id="nav-search"
            placeholder="Search any Video..."
            className="border-2 border-secondary-red pl-4 py-2 w-[75vw] bg-white text-lg rounded-sm outline-none"
          />
          <button className="search-results-btn absolute right-0 bg-white border-secondary-red border-t-2 border-r-2 border-b-2 text-[24px] pr-2 font-roboto-reg text-secondary-red h-full flex items-center">
            <FiSearch size={24} className="transform translate-y-[1px]" />
          </button>
        </div>
      </div>

      <div className="search-results mt-4 bg-white h-full overflow-y-auto z-10">
        {results.map((result, index) => (
          <Link
            key={index}
            href={`/${result.videoId}`}
            className="video-row relative bg-white border-b border-b-[#00000034] flex mb-2 overflow-hidden"
          >
            <Image
              src={result?.thumbnails[0]?.url}
              className="aspect-[159/89] max-w-[35%]"
              width={159}
              height={89}
              alt={result.title}
              priority
            />
            <h2 className=" relative flex-1 title pl-2 pr-1 font-roboto-reg">
              {result.title.slice(0, 54)}
              {result.title.length > 54 ? "..." : ""}

              <div className="stats w-full absolute bottom-0 left-0 px-2 bg-white text-[12px] font-roboto-med text-[#afafaf] flex items-center justify-between">
                <span className="flex items-center gap-[3px]">
                  {" "}
                  <FaEye /> {result.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-[3px]">
                  <ImClock size={12} />
                  {result.publishDate}
                </span>
              </div>
            </h2>
            <div className="duration absolute bottom-0 font-roboto-reg text-sm px-[3px] py-[1px] left-0 rounded-tr w-max bg-[#ffffffbf]">
              {result.duration ? formatTime(parseInt(result.duration)) : ""}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Page;
