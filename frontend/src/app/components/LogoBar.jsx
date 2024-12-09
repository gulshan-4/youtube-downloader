'use client'
import React, { useState } from "react";
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { GrClose } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";

function LogoBar() {
    const [ displaySearchbar , setDisplaySearchbar] = useState(false)

  return (
    <>
      <div className="logo-bar bg-white flex items-center justify-between px-8">
        <Link
          className=" font-hemi-head text-primary-red text-[32px] leading-tight py-2"
          href="/"
        >
          LOGO
        </Link>
        <button onClick={()=>{
            setDisplaySearchbar(true)
        }} className=" nav-search-btn text-[30px] text-primary-red">
          <GoSearch />
        </button>
      </div>

      <div 
      onClick={(event)=>{
        event.target.classList.contains('searchbar-modal') ? setDisplaySearchbar(false) : ''
      }}
      style={{display: displaySearchbar? 'block' : 'none'}}
      className="searchbar-modal h-[100svh] w-[100svw] bg-[#ffffffcb] backdrop-blur-[1px] fixed top-0 left-0 z-50">
      <button 
        onClick={()=>{
            setDisplaySearchbar(false)
        }}
      className=" text-[30px] text-secondary-red absolute top-4 right-5">
      <GrClose />
      </button>

      <div className="searchbar w-full flex gap-2 flex-col items-center mt-[18.5vh]">
        <input 
        type="search" 
        name="search" 
        id="nav-search" 
        placeholder="Search any Video..."
        className=" border-2 border-secondary-red text-center py-2 w-[75%] bg-white text-lg rounded-sm outline-none"
        />
        <button className=" nav-search-btn bg-white text-[24px] font-roboto-reg text-secondary-red px-4 py-[2px] flex items-center gap-1">
            <span>Search</span>
            <FiSearch size={24} className=" transform translate-y-[1px]" />
        </button>
      </div>
      </div>
    </>
  );
}

export default LogoBar;