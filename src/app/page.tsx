"use client";
import React from "react";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import RunningText from "@/app/components/RunningText";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import Contact from '@/app/components/Contact';



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
            className="w-full min-h-screen flex flex-col justify-center items-center px-4 md:px-0 py-2.5 pt-20 md:pt-2.5 section"
            id="home"
          >
            <div className="flex flex-col justify-center items-center w-fit h-fit gap-4">
              <p className="dm_serif_text text-5xl md:text-9xl text-[#6b8af6] text-center">
                Hi <br />
                I&apos;m Awan<span className="text-[#3c45b9]">.</span>
              </p>
              <p className="text-lg md:text-2xl text-gray-600 text-center max-w-[600px]">
                Information Systems Student &amp; Web Developer
              </p>
              <div className="flex flex-row w-full h-full gap-4 items-center justify-center mt-4">
                <Link className="relative w-[32px] h-[32px] md:w-[42px] md:h-[42px] hover:scale-110 transition-transform" href="">
                  <Image
                    src="/images/curriculum-vitae.png"
                    alt="Icon CV"
                    layout="fill"
                    objectFit="contain"
                  />
                </Link>
                <Link href="https://github.com/nawa316" target="_blank" className="hover:scale-110 transition-transform">
                  <AiFillGithub className="w-8 h-8 md:w-[42px] md:h-[42px]" color="#6b8af6" />
                </Link>
                <Link href="https://www.linkedin.com/in/muhammad-ade-dzakwan/" target="_blank" className="hover:scale-110 transition-transform">
                  <FaLinkedin className="w-8 h-8 md:w-[42px] md:h-[42px]" color="#6b8af6" />
                </Link>
                <Link href="mailto:muhammadadedzakwan@gmail.com" target="_blank" className="hover:scale-110 transition-transform">
                  <MdEmail className="w-8 h-8 md:w-[42px] md:h-[42px]" color="#6b8af6" />
                </Link>
              </div>
            </div>
          </section>
          <section
            className="flex flex-col w-full min-h-screen justify-center items-center section px-4 md:px-0 py-8 md:py-0"
            id="about"
          >
            <div className="flex justify-center items-center bg-[#6b8af6] mb-8 md:mb-[50px] px-5 py-2 rounded-[30px]">
              <h2 className="dm_serif_text text-2xl md:text-4xl text-white">About Me</h2>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 px-4 md:px-40">
                <Image
                  src="/images/1688908285904.JPG"
                  alt="Foto Awan"
                  width={2848}
                  height={4288}
                  className="w-[200px] md:w-[300px] h-fit rounded-xl"
                />
              <div className="w-full flex flex-col items-center md:items-start h-fit justify-start gap-5 p-0">
                <div className="w-full flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                  <p className="text-center md:text-left">
                    <span className="text-2xl md:text-4xl font-bold">Muhammad Ade Dzakwan</span>{" "}
                    <br />
                    <span className="text-lg md:text-2xl">Bondowoso, Jawa Timur</span>
                  </p>
                  <Image
                    src="/images/Lambang ITS.png"
                    alt="FSLDK"
                    width={1559}
                    height={1559}
                    className="w-16 h-16 md:w-20 md:h-20 md:ml-auto md:mr-5"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-lg md:text-xl font-medium">Description</h2>
                  <p className="text-base md:text-lg">
                    Information Systems student with a passion for web
                    development, combining technical expertise with strong
                    communication skills. Proven ability to excel in team
                    environments, collaborating effectively to achieve shared
                    goals. Known for handling responsibilities with diligence
                    and reliability, I bring a dynamic approach to
                    problem-solving in the world of programming.
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-lg md:text-xl font-medium">Education &amp; Qualifications</h2>
                  <ul className="text-base md:text-lg list-disc pl-6 md:pl-10 text-left">
                    <li>
                      Information Systems, Institut Teknologi Sepuluh Nopember -
                      2023-Now
                    </li>
                    <li>
                      Science, National Senior High School 1 Tenggarang -
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
            className="bg-[#3c45b9] w-full min-h-screen gap-6 md:gap-10 flex flex-col justify-center items-center section py-8 md:py-0 px-4"
            id="experience"
          >
            <div className="flex flex-row justify-center items-center">
              <h2 className="dm_serif_text text-2xl md:text-4xl text-white">Experience</h2>
            </div>
            <div className="flex flex-row flex-wrap md:flex-nowrap gap-4 px-4 md:px-8 justify-center md:justify-start items-center w-full md:overflow-x-auto md:py-4">
              <div className="flex flex-col p-2 justify-center items-center border-[10px] md:border-[15px] bg-gray-50 rounded-xl flex-shrink-0">
                <Image
                  src="/images/FSLDK.jpeg"
                  alt="FSLDK"
                  width={320}
                  height={320}
                  className="w-auto h-16 md:h-24 p-2 rounded-xl"
                />
                <h3 className="dm_serif_text text-sm md:text-base">FSLDK Surabaya Raya</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center border-[10px] md:border-[15px] rounded-xl flex-shrink-0">
                <Image
                  src="/images/Ini Lho ITS!.jpeg"
                  alt="Ini Lho ITS!"
                  width={200}
                  height={200}
                  className="w-auto h-16 md:h-24 p-2 rounded-xl"
                />
                <h3 className="dm_serif_text text-sm md:text-base">Ini Lho ITS!</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center border-[10px] md:border-[15px] rounded-xl flex-shrink-0">
                <Image
                  src="/images/ISE.jpeg"
                  alt="ISE"
                  width={320}
                  height={320}
                  className="w-auto h-16 md:h-24 p-2 rounded-xl"
                />
                <h3 className="dm_serif_text text-sm md:text-base">ISE!</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center border-[10px] md:border-[15px] rounded-xl flex-shrink-0">
                <Image
                  src="/images/Logo_PMII.png"
                  alt="PMII"
                  width={307}
                  height={325}
                  className="w-auto h-16 md:h-24 p-2 rounded-xl"
                />
                <h3 className="dm_serif_text text-sm md:text-base">PMII</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center border-[10px] md:border-[15px] rounded-xl flex-shrink-0">
                <Image
                  src="/images/Logo JMMI.png"
                  alt="JMMI"
                  width={500}
                  height={500}
                  className="w-auto h-16 md:h-24 p-2 rounded-xl"
                />
                <h3 className="dm_serif_text text-sm md:text-base">JMMI</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center border-[10px] md:border-[15px] rounded-xl flex-shrink-0">
                <Image
                  src="/images/Logo IMBS.png"
                  alt="Habits"
                  width={500}
                  height={500}
                  className="w-auto h-16 md:h-24 p-2 rounded-xl"
                />
                <h3 className="dm_serif_text text-sm md:text-base">Habits</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center border-[10px] md:border-[15px] rounded-xl flex-shrink-0">
                <Image
                  src="/images/pp.png"
                  alt="Remaja Masjid Baitul Makmur"
                  width={640}
                  height={640}
                  className="w-auto h-16 md:h-24 p-2 rounded-xl"
                />
                <h3 className="dm_serif_text text-sm md:text-base text-center">Remaja Masjid<br/>Baitul Makmur</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center border-[10px] md:border-[15px] rounded-xl flex-shrink-0">
                <Image
                  src="/images/Logo Ahbabur Rasul.png"
                  alt="Remaja Masjid Baitul Makmur"
                  width={3118}
                  height={3881}
                  className="w-auto h-16 md:h-24 p-2 rounded-xl"
                />
                <h3 className="dm_serif_text text-sm md:text-base">Ahbabur Rasul</h3>
              </div>
            </div>
          </section>
          <section
            className="w-full min-h-screen flex flex-col justify-center items-center bg-[#483D8B] gap-6 md:gap-10 section py-8 px-4"
            id="portofolio"
          >
            <div className="flex flex-row justify-center items-center bg-[#483D8B]">
              <h2 className="dm_serif_text text-2xl md:text-4xl text-white">Portofolio</h2>
            </div>
            <div className="w-full flex justify-center">
              <iframe
                src="https://www.canva.com/design/DAGFQGwI09Y/cX4lBmKpLpEETk8VAfdk-Q/view?embed"
                className="w-full max-w-[1000px] h-[300px] md:h-[500px]"
                sandbox="allow-scripts"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>
            </section>
          <section
            className="bg-gray-800 w-full min-h-screen flex flex-col justify-center items-center gap-6 md:gap-10 section py-8 px-4"
            id="blog"
          >
            <div className="flex flex-row justify-center items-center">
              <h2 className="dm_serif_text text-2xl md:text-4xl text-white">Blog</h2>
            </div>
            <div className="flex flex-col justify-center items-center gap-8 w-full">
              <iframe
                src="https://thismadura-pride.blogspot.com/"
                className="w-full max-w-[1000px] h-[300px] md:h-[500px]"
                sandbox="allow-scripts"
                allowFullScreen
                style={{ border: 'none' }}
              />
              <Link href="https://thismadura-pride.blogspot.com/" target="_blank" className="p-2 px-4 bg-[#6b8af6] rounded-full">
                <p className="text-white text-lg md:text-xl font-medium">Visit Site</p>
              </Link>
            </div>
          </section>
          <footer className="min-h-screen w-full flex flex-col justify-center items-center section bg-[#6b8af6] gap-6 md:gap-10 py-8 px-4">
            <div className="flex flex-col gap-2 justify-center items-center text-center">
              <h2 className="dm_serif_text text-2xl md:text-4xl text-white">Contact Me!</h2>
              <p className="text-base md:text-lg">Apakah Anda tertarik untuk berkolaborasi atau sekedar berdiskusi seputar Pengembangan Web dan Perangkat Lunak? <br/> Jangan ragu untuk menghubungi saya!</p>
            </div>
            <div className="w-full lg:w-[1000px] h-auto flex justify-center items-center">
              <Contact />
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
