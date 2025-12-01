export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        {/* Navbar */}
        <div className="flex w-full h-fit bg-[#009dff] items-center flex-row justify-between md:justify-center fixed top-0 z-50 px-4 py-2">
          <p className="text-xl md:text-3xl text-white font-Poppins font-bold md:ml-[150px]">Profile awan</p>
          <ul className="hidden md:flex items-center justify-center bg-white mx-auto px-2.5 py-[18px] rounded-[10px] gap-4">
            <li>
              <a href="#home" className="hover:text-[#009dff] transition-colors">Home</a>
            </li>
            <li>
              <a href="#about" className="hover:text-[#009dff] transition-colors">About</a>
            </li>
            <li>
              <a href="#experience" className="hover:text-[#009dff] transition-colors">Experience</a>
            </li>
            <li>
              <a href="#portofolio" className="hover:text-[#009dff] transition-colors">Portofolio</a>
            </li>
            <li>
              <a href="#blog" className="hover:text-[#009dff] transition-colors">Blog</a>
            </li>
          </ul>
          <img
            src="/images/menubuttonofthreelines_79781.png"
            alt="Menu"
            className="w-5 h-auto bg-white p-2.5 rounded-[10px] md:hidden cursor-pointer"
          />
        </div>
        
        {/* Home Section */}
        <div className="w-full min-h-screen flex flex-col-reverse md:flex-row justify-center items-center px-4 py-2.5 pt-20 md:pt-0" id="home">
          <div className="text-center md:text-left">
            <p className="text-2xl md:text-3xl text-[#009dff] md:ml-5 font-Poppins font-bold">
              I am Awan,
              <br />A Web Designer
            </p>
          </div>
          <div className="mb-8 md:mb-0">
            <img src="/images/Foto_Biru.png" alt="Profile" className="h-auto w-[180px] md:w-[250px]" />
          </div>
        </div>
        {/* About Section */}
        <div className="w-full flex flex-col justify-center items-center px-4 py-8" id="about">
          <div className="flex flex-col justify-center items-center bg-[#009dff] mb-8 md:mb-[50px] px-5 py-2 rounded-[30px]">
            <h2 className="text-white text-xl md:text-2xl">About</h2>
          </div>
          <div className="w-full max-w-4xl flex flex-col justify-center items-center">
            <img src="/images/1688908285904.JPG" alt="About" className="w-[150px] md:w-[200px] h-auto object-cover object-top rounded-[20px]" />
            <div className="w-full flex flex-col items-center h-fit justify-center mt-5 px-4">
              <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
                <p className="text-center md:text-left">
                  <span className="text-2xl md:text-3xl">Muhammad Ade Dzakwan</span> <br />
                  <span className="text-lg md:text-xl">Bondowoso, Jawa Timur</span>
                </p>
                <img src="/images/Lambang ITS.png" alt="ITS Logo" className="w-16 h-16 md:w-20 md:h-20 md:ml-auto" />
              </div>
              <div className="mt-6 text-center md:text-left w-full">
                <h2 className="text-xl md:text-2xl font-bold mb-2">Description</h2>
                <p className="text-sm md:text-base">
                  Information Systems student with a passion for web development,
                  combining technical expertise with strong communication skills.
                  Proven ability to excel in team environments, collaborating
                  effectively to achieve shared goals. Known for handling
                  responsibilities with diligence and reliability, I bring a dynamic
                  approach to problem-solving in the world of programming.
                </p>
              </div>
              <div className="mt-6 text-center md:text-left w-full">
                <h2 className="text-xl md:text-2xl font-bold mb-2">Education &amp; Qualifications</h2>
                <ul className="text-sm md:text-base list-disc list-inside md:list-outside">
                  <li>
                    Information Systems, Institut Teknologi Sepuluh Nopember -
                    2023-Now
                  </li>
                  <li>
                    Science, National Senior High School 1 Tenggarang - 2020-2023
                  </li>
                  <li>National Junior High School 2 Tenggarang - 2017-2020</li>
                  <li>National Elementary School 1 Cindogo - 2014-2017</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Experience Section */}
        <div className="bg-blue-500 min-h-[400px] md:h-[600px] py-8 md:py-[10px] w-full flex flex-col justify-center items-center" id="experience">
          <div className="flex flex-row justify-center items-center text-2xl md:text-[40px] py-[10px]">
            <h2 className="text-white">Experience</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-5 pt-[10px] pb-[20px] px-4">
            <div className="flex flex-col p-2 justify-center items-center border-[10px] md:border-[15px] bg-gray-50 w-[120px] md:w-auto">
              <img src="/images/Logo_PMII.png" alt="PMII" className="w-auto h-16 md:h-24 p-2" />
              <h3 className="text-sm md:text-base">PMII</h3>
            </div>
            <div className="bg-white flex flex-col p-2 justify-center items-center border-[10px] md:border-[15px] w-[120px] md:w-auto">
              <img src="/images/Logo JMMI.png" alt="JMMI" className="w-auto h-16 md:h-24 p-2" />
              <h3 className="text-sm md:text-base">JMMI</h3>
            </div>
            <div className="bg-white flex flex-col p-2 justify-center items-center border-[10px] md:border-[15px] w-[120px] md:w-auto">
              <img src="/images/Logo IMBS.png" alt="IMBS" className="w-auto h-16 md:h-24 p-2" />
              <h3 className="text-sm md:text-base">IMBS</h3>
            </div>
            <div className="bg-white flex flex-col p-2 justify-center items-center border-[10px] md:border-[15px] w-[120px] md:w-auto">
              <img src="/images/pp.png" alt="Remaja Masjid" className="w-auto h-16 md:h-24 p-2" />
              <h3 className="text-sm md:text-base text-center">Remaja Masjid<br/>Baitul Makmur</h3>
            </div>
            <div className="bg-white flex flex-col p-2 justify-center items-center border-[10px] md:border-[15px] w-[120px] md:w-auto">
              <img src="/images/Logo Ahbabur Rasul.png" alt="Ahbabur Rasul" className="w-auto h-16 md:h-24 p-2" />
              <h3 className="text-sm md:text-base text-center">Ahbabur Rasul</h3>
            </div>
          </div>
        </div>
        {/* Portfolio Section */}
        <div className="w-full flex flex-col justify-center items-center bg-[#483D8B] py-12 md:py-16 px-4" id="portofolio">
          <div className="flex flex-row justify-center items-center">
            <h2 className="text-2xl md:text-[40px] text-white">Portofolio</h2>
          </div>
          <div className="flex flex-row justify-center items-center pt-4">
            {/* Portfolio content can be added here */}
          </div>
        </div>
        
        {/* Blog Section */}
        <div className="bg-gray-800 w-full flex flex-col justify-center items-center py-12 md:py-16 px-4" id="blog">
          <div className="flex flex-row justify-center items-center">
            <h2 className="text-2xl md:text-[40px] text-white">Blog</h2>
          </div>
          <div className="flex flex-row justify-center items-center pt-4">
            {/* Blog content can be added here */}
          </div>
        </div>
      </div>
    </>
  );
}
