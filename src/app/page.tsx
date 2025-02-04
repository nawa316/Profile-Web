"use client";
import React, { useEffect, useRef } from "react";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import RunningText from "@/app/components/RunningText";

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <nav className="flex w-full items-center flex-row justify-center fixed px-6 py-4 top-0 z-10 bg-[#009dff]">
          <p className="mr-auto content-center justify-center self-center items-center text-3xl font-bold dm_serif_text text-white">
            Awan
          </p>
          <div className="hidden md:block md:max-w-[400px] lg:max-w-[600px] h-fit border rounded-full border-dashed dm_serif_text">
            <RunningText />
          </div>
          <div className="ml-auto">
            <HamburgerMenu />
          </div>
        </nav>
        <div className="section_wrapper">
          <section
            className="w-full h-screen flex flex-row justify-center items-center px-0 py-2.5 section"
            id="home"
          >
            
          </section>
          <section
            className="w-full h-screen flex flex-col justify-center items-center section"
            id="about"
          >
            <div className="flex flex-col justify-center items-center bg-[#009dff] mb-[50px] px-5 py-0 rounded-[30px]">
              <h2>About</h2>
            </div>
            <div className="w-screen flex flex-col justify-center items-center">
              <img
                src="/images/1688908285904.JPG"
                className="w-[200px] h-auto object-cover object-top ml-0 p-0 rounded-[20px]"
              />
              <div className="w-screen flex flex-col items-center h-fit justify-center mr-0 mt-5 p-0">
                <div className="w-screen flex flex-row justify-center items-center">
                  <p>
                    <span className="text-3xl">Muhammad Ade Dzakwan</span>{" "}
                    <br />
                    <span className="text-xl">Bondowoso, Jawa Timur</span>
                  </p>
                  <img
                    src="/images/Lambang ITS.png"
                    className="w-20 h-20 ml-auto mr-5"
                  />
                </div>
                <div>
                  <h2>Description</h2>
                  <p className="medium">
                    Information Systems student with a passion for web
                    development, combining technical expertise with strong
                    communication skills. Proven ability to excel in team
                    environments, collaborating effectively to achieve shared
                    goals. Known for handling responsibilities with diligence
                    and reliability, I bring a dynamic approach to
                    problem-solving in the world of programming.
                  </p>
                </div>
                <div>
                  <h2>Education &amp; Qualifications</h2>
                  <ul>
                    <li>
                      Information Systems, Institut Teknologi Sepuluh Nopember -
                      2023-Now
                    </li>
                    <li>
                      Sience, National Senior High School 1 Tenggarang -
                      2020-2023
                    </li>
                    <li>
                      National Junior High School 2 Tenggarang - 2017-2020
                    </li>
                    <li>National Elementary School 1 Cindogo - 2014-2017</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section
            className="bg-blue-500 w-screen h-screen py-[10px] flex flex-col justify-center items-center section"
            id="experience"
          >
            <div className="flex flex-row justify-center items-center text-[40px] py-[10px]">
              <h2>Experience</h2>
            </div>
            <div className="flex flex-row justify-center items-center pt-[10px] pb-[20px]">
              <div className="flex flex-col p-2 justify-center items-center border-[15px] bg-gray-50">
                <img src="/images/Logo_PMII.png" className="w-auto h-24 p-2" />
                <h3>PMII</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center ml-5 border-[15px]">
                <img src="/images/Logo JMMI.png" className="w-auto h-24 p-2" />
                <h3>JMMI</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center ml-5 border-[15px]">
                <img src="/images/Logo IMBS.png" className="w-auto h-24 p-2" />
                <h3>IMBS</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center ml-5 border-[15px]">
                <img src="/images/pp.png" className="w-auto h-24 p-2" />
                <h3>Remaja Masjid Baitul Makmur</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center ml-5 border-[15px]">
                <img
                  src="/images/Logo Ahbabur Rasul.png"
                  className="w-auto h-24 p-2"
                />
                <h3>Ahbabur Rasul</h3>
              </div>
            </div>
          </section>
          <div
            className="w-screen flex flex-col justify-center items-center bg-[#483D8B] pt-[10px] pb-[10px]"
            id="portofolio"
          >
            <div className="flex flex-row justify-center items-center bg-[#483D8B] pt-[10px] pb-[10px]">
              <h2 style={{ fontSize: 40, color: "white" }}>Portofolio</h2>
            </div>
            <div className="flex flex-row justify-center items-center bg-[#483D8B] pt-[10px] pb-[10px]"></div>
          </div>
          <div
            className="bg-gray-800 w-screen flex flex-col justify-center items-center pt-[10px] pb-[10px]"
            id="blog"
          >
            <div className="flex flex-row justify-center items-center pt-[10px] pb-[10px]">
              <h2 style={{ fontSize: 40, color: "white" }}>Blog</h2>
            </div>
            <div className="flex flex-row justify-center items-center bg-[#483D8B] pt-[10px] pb-[10px]"></div>
          </div>
        </div>
      </div>
    </>
  );
}
