"use client";
import React from "react";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import RunningText from "@/app/components/RunningText";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <nav className="flex w-full items-center flex-row justify-center fixed px-6 py-4 top-0 z-10 bg-[#6b8af6]">
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
            className="w-full h-screen flex flex-row gap-10 justify-center items-center px-0 py-2.5 section"
            id="home"
          >
            <div className="relative w-[350px] h-full">
              <Image
                src="/images/photo_ilits.png"
                alt="Foto Awan"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="flex flex-col justify-center items-center w-fit h-fit gap-2">
              <p className="dm_serif_text text-9xl text-[#6b8af6]">
                Hi <br />
                I'm Awan<span className="text-[#3c45b9]">.</span>
              </p>
              <div className="flex flex-row w-full h-full gap-4 items-center">
                <Link className="relative w-[42px] h-[42px]" href="">
                  <Image
                    src="/images/curriculum-vitae.png"
                    alt="Icon CV"
                    layout="fill"
                    objectFit="contain"
                  />
                </Link>
                <Link href="">
                  <AiFillGithub size={42} color="#6b8af6" />
                </Link>
                <Link href="">
                  <FaLinkedin size={42} color="#6b8af6" />
                </Link>
                <Link href="">
                  <MdEmail size={42} color="#6b8af6" />
                </Link>
              </div>
            </div>
          </section>
          <section
            className="flex flex-col w-full h-screen justify-center items-center section"
            id="about"
          >
            <div className="flex justify-center items-center bg-[#6b8af6] mb-[50px] px-5 py-0 rounded-[30px]">
              <h2 className="dm_serif_text text-4xl">About</h2>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center items-center px-10">
              <div className="relative w-[400px] h-full rounded">
                <Image
                  src="/images/1688908285904.JPG"
                  alt="Foto Awan"
                  layout="fill"
                  objectFit="contain"
                  className="rounded"
                />
              </div>
              <div className="w-full flex flex-col items-center h-fit justify-center mr-0 mt-5 p-0">
                <div className="w-full flex flex-row justify-center items-center">
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
          <section
            className="w-screen h-screen flex flex-col justify-center items-center bg-[#483D8B] pt-[10px] pb-[10px] section"
            id="portofolio"
          >
            <div className="flex flex-row justify-center items-center bg-[#483D8B] pt-[10px] pb-[10px]">
              <h2 style={{ fontSize: 40, color: "white" }}>Portofolio</h2>
            </div>
            <div className="flex flex-row justify-center items-center bg-[#483D8B] pt-[10px] pb-[10px]"></div>
          </section>
          <section
            className="bg-gray-800 w-screen h-screen flex flex-col justify-center items-center pt-[10px] pb-[10px] section"
            id="blog"
          >
            <div className="flex flex-row justify-center items-center pt-[10px] pb-[10px]">
              <h2 style={{ fontSize: 40, color: "white" }}>Blog</h2>
            </div>
            <div className="flex flex-row justify-center items-center bg-[#483D8B] pt-[10px] pb-[10px]"></div>
          </section>
          <footer className="h-screen w-full section">Ini Footer</footer>
        </div>
      </div>
    </>
  );
}
