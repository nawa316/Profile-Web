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
                <Link href="https://github.com/nawa316" target="_blank">
                  <AiFillGithub size={42} color="#6b8af6" />
                </Link>
                <Link href="https://www.linkedin.com/in/muhammad-ade-dzakwan/" target="_blank">
                  <FaLinkedin size={42} color="#6b8af6" />
                </Link>
                <Link href="mailto:muhammadadedzakwan@gmail.com" target="_blank">
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
              <h2 className="dm_serif_text text-4xl">About Me</h2>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-10 px-40">
                <Image
                  src="/images/1688908285904.JPG"
                  alt="Foto Awan"
                  width={2848}
                  height={4288}
                  className="w-[300px] h-fit rounded-xl"
                />
              <div className="w-full flex flex-col items-start h-fit justify-start gap-5 p-0">
                <div className="w-full flex flex-row justify-start items-center">
                  <p>
                    <span className="text-4xl font-bold">Muhammad Ade Dzakwan</span>{" "}
                    <br />
                    <span className="text-2xl">Bondowoso, Jawa Timur</span>
                  </p>
                  <Image
                    src="/images/Lambang ITS.png"
                    alt="FSLDK"
                    width={1559}
                    height={1559}
                    className="w-20 h-20 ml-auto mr-5"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-medium">Description</h2>
                  <p className="text-lg">
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
                  <h2 className="text-xl font-medium">Education &amp; Qualifications</h2>
                  <ul className="text-lg list-disc pl-10">
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
            className="bg-[#3c45b9] w-screen h-screen gap-10 flex flex-col justify-center items-center section"
            id="experience"
          >
            <div className="flex flex-row justify-center items-center">
              <h2 className="dm_serif_text text-4xl text-white">Experience</h2>
            </div>
            <div className="flex flex-row flex-wrap px-[100px] xl:px-[500px] justify-center items-center">
              <div className="flex flex-col p-2 justify-center items-center border-[15px] bg-gray-50 rounded-xl mt-10">
                <Image
                  src="/images/FSLDK.jpeg"
                  alt="FSLDK"
                  width={320}
                  height={320}
                  className="w-auto h-24 p-2 rounded-xl"
                />
                <h3 className="dm_serif_text">FSLDK Surabaya Raya</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center ml-5 border-[15px] rounded-xl mt-10">
                <Image
                  src="/images/Ini Lho ITS!.jpeg"
                  alt="Ini Lho ITS!"
                  width={200}
                  height={200}
                  className="w-auto h-24 p-2 rounded-xl"
                />
                <h3 className="dm_serif_text">Ini Lho ITS!</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center ml-5 border-[15px] rounded-xl mt-10">
                <Image
                  src="/images/ISE.jpeg"
                  alt="ISE"
                  width={320}
                  height={320}
                  className="w-auto h-24 p-2 rounded-xl"
                />
                <h3 className="dm_serif_text">ISE!</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center ml-5 border-[15px] rounded-xl mt-10">
                <Image
                  src="/images/Logo_PMII.png"
                  alt="PMII"
                  width={307}
                  height={325}
                  className="w-auto h-24 p-2 rounded-xl"
                />
                <h3 className="dm_serif_text">PMII</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center ml-5 border-[15px] rounded-xl mt-10">
                <Image
                  src="/images/Logo JMMI.png"
                  alt="JMMI"
                  width={500}
                  height={500}
                  className="w-auto h-24 p-2 rounded-xl"
                />
                <h3 className="dm_serif_text">JMMI</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center ml-5 border-[15px] rounded-xl mt-10">
                <Image
                  src="/images/Logo IMBS.png"
                  alt="Habits"
                  width={500}
                  height={500}
                  className="w-auto h-24 p-2 rounded-xl"
                />
                <h3 className="dm_serif_text">Habits</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center ml-5 border-[15px] rounded-xl mt-10">
                <Image
                  src="/images/pp.png"
                  alt="Remaja Masjid Baitul Makmur"
                  width={640}
                  height={640}
                  className="w-auto h-24 p-2 rounded-xl"
                />
                <h3 className="dm_serif_text">Remaja Masjid Baitul Makmur</h3>
              </div>
              <div className="bg-white flex flex-col p-2 justify-center items-center ml-5 border-[15px] rounded-xl mt-10">
                <Image
                  src="/images/Logo Ahbabur Rasul.png"
                  alt="Remaja Masjid Baitul Makmur"
                  width={3118}
                  height={3881}
                  className="w-auto h-24 p-2 rounded-xl"
                />
                <h3 className="dm_serif_text">Ahbabur Rasul</h3>
              </div>
            </div>
          </section>
          <section
            className="w-screen h-screen flex flex-col justify-center items-center bg-[#483D8B] gap-10 section"
            id="portofolio"
          >
            <div className="flex flex-row justify-center items-center bg-[#483D8B] pt-[10px] pb-[10px]">
              <h2 className="dm_serif_text text-4xl text-white">Portofolio</h2>
            </div>
            <div>
              <iframe
                src="https://www.canva.com/design/DAGFQGwI09Y/cX4lBmKpLpEETk8VAfdk-Q/view?embed"
                width="1000px"
                height="500px"
                sandbox="allow-scripts"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>
            </section>
          <section
            className="bg-gray-800 w-screen h-screen flex flex-col justify-center items-center gap-10 section"
            id="blog"
          >
            <div className="flex flex-row justify-center items-center pt-[10px] pb-[10px]">
              <h2 className="dm_serif_text text-4xl text-white">Blog</h2>
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
              <iframe
                src="https://thismadura-pride.blogspot.com/"
                width="1000px"
                height="500px"
                sandbox="allow-scripts"
                allowFullScreen
                style={{ border: 'none' }}
              />
              <Link href="https://thismadura-pride.blogspot.com/" target="_blank" className="p-2 px-4 bg-[#6b8af6] rounded-full">
                <p className="text-white text-xl font-medium">Visit Site</p>
              </Link>
            </div>
          </section>
          <footer className="h-screen w-full section bg-[#6b8af6]">Ini Footer</footer>
        </div>
      </div>
    </>
  );
}
