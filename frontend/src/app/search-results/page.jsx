"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

function page() {
  const [results, setResults] = useState([
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
  ]);
  return (
    <div className="results-page bg-[#d8d8d8] mt-0">
      <div className="sticky-search sticky top-0 backdrop-blur-sm z-20">
        <h1 className=" pt-4 pb-1 pl-1 text-[#282828] text-center text-xl font-roboto-med">
          Search Results
        </h1>
        <div className="searchbar relative w-max flex flex-col items-center mx-auto">
          <input
            type="search"
            name="search"
            id="nav-search"
            placeholder="Search any Video..."
            className=" border-2 border-secondary-red pl-4 py-2 w-[75vw] bg-white text-lg rounded-sm outline-none"
          />
          <button className=" search-results-btn absolute right-0 bg-white border-secondary-red border-t-2 border-r-2 border-b-2 text-[24px] pr-2 font-roboto-reg text-secondary-red h-full flex items-center">
            <FiSearch size={24} className=" transform translate-y-[1px]" />
          </button>
        </div>
      </div>
      <div className="search-results mt-4 bg-white h-full overflow-y-auto z-10">
        {results.map((result, index) => (
          <Link
            key={index}
            href={result.videoId}
            className="video-row relative bg-white border-b border-b-[#00000034] flex mb-2 overflow-hidden"
          >
            <Image
              src={result.img}
              className=" aspect-[159/89] max-w-[35%]"
              width={159}
              height={89}
              alt={result.title}
              priority
            />
            <h2 className=" title pl-2 pr-1 font-roboto-reg">{result.title}</h2>
            <div className="duration absolute bottom-0 font-roboto-reg text-sm px-[3px] py-[1px] left-0 rounded-tr w-max bg-[#ffffffbf]">
              8:23
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default page;
