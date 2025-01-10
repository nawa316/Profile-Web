import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-screen h-fit bg-[#009dff] items-center flex-row justify-center items-center fixed top-0">
          <p className="content-center justify-center self-center items-center text-3xl text-[white] ml-[150px] font-Poppins font-bold">Profile awan</p>
          <ul className="items-center justify-center bg-[white] mx-auto px-2.5 py-[18px] rounded-[10px]">
            <li className="float-left">
              <a href="#home">Home</a>
            </li>
            <li className="float-left">
              <a href="#about">About</a>
            </li>
            <li className="float-left">
              <a href="#experience">Experience</a>
            </li>
            <li className="float-left">
              <a href="#portofolio">Portofolio</a>
            </li>
            <li className="float-left">
              <a href="#blog">Blog</a>
            </li>
          </ul>
          <img
            src="/images/menubuttonofthreelines_79781.png"
            className="w-5 h-auto bg-[white] mr-5 p-2.5 rounded-[10px]"
          />
        </div>
        <div className="w-screen h-[1000px] flex flex-row justify-center items-center px-0 py-2.5" id="home">
          <div>
            <p className="text-3xl text-[#009dff] ml-5 font-Poppins font-bold">
              I am Awan,
              <br />A Web Designer
            </p>
          </div>
          <div>
            <img src="/images/Foto_Biru.png" className="h-auto w-[250px]" />
          </div>
        </div>
        <div className="w-screen flex flex-col justify-center items-center" id="about">
          <div className="flex flex-col justify-center items-center bg-[#009dff] mb-[50px] px-5 py-0 rounded-[30px]">
            <h2>About</h2>
          </div>
          <div className="w-screen flex flex-col justify-center items-center">
            <img src="/images/1688908285904.JPG" className="w-[200px] h-auto object-cover object-top ml-0 p-0 rounded-[20px]" />
            <div className="w-screen flex flex-col items-center h-fit justify-center mr-0 mt-5 p-0">
              <div className="w-screen flex flex-row justify-center items-center">
                <p>
                  <span className="text-3xl">Muhammad Ade Dzakwan</span> <br />
                  <span className="text-xl">Bondowoso, Jawa Timur</span>
                </p>
                <img src="/images/Lambang ITS.png" className="w-20 h-20 ml-auto mr-5" />
              </div>
              <div>
                <h2>Description</h2>
                <p className="medium">
                  Information Systems student with a passion for web development,
                  combining technical expertise with strong communication skills.
                  Proven ability to excel in team environments, collaborating
                  effectively to achieve shared goals. Known for handling
                  responsibilities with diligence and reliability, I bring a dynamic
                  approach to problem-solving in the world of programming.
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
                    Sience, National Senior High School 1 Tenggarang - 2020-2023
                  </li>
                  <li>National Junior High School 2 Tenggarang - 2017-2020</li>
                  <li>National Elementary School 1 Cindogo - 2014-2017</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-500 h-[600px] py-[10px] w-screen flex flex-col justify-center items-center" id="experience">
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
              <img src="/images/Logo Ahbabur Rasul.png" className="w-auto h-24 p-2" />
              <h3>Ahbabur Rasul</h3>
            </div>
          </div>
        </div>
        <div className="w-screen flex flex-col justify-center items-center bg-[#483D8B] pt-[10px] pb-[10px]" id="portofolio">
          <div className="flex flex-row justify-center items-center bg-[#483D8B] pt-[10px] pb-[10px]">
            <h2 style={{ fontSize: 40, color: "white" }}>Portofolio</h2>
          </div>
          <div className="flex flex-row justify-center items-center bg-[#483D8B] pt-[10px] pb-[10px]"></div>
        </div>
        <div className="bg-gray-800 w-screen flex flex-col justify-center items-center pt-[10px] pb-[10px]" id="blog">
          <div className="flex flex-row justify-center items-center pt-[10px] pb-[10px]">
            <h2 style={{ fontSize: 40, color: "white" }}>Blog</h2>
          </div>
          <div className="flex flex-row justify-center items-center bg-[#483D8B] pt-[10px] pb-[10px]"></div>
        </div>
      </div>
    </>
  );
}
