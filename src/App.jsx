import "./App.css";

function App() {
  return (
    <>
      <main className="coloum">
        <header className="header1">
          <p className="titleHeader">Profile awan</p>
          <img
            src="/assets/image/menubuttonofthreelines_79781.png"
            className="buttonMenu"
            id="button-menu"
            onclick="showNav()"
          />
          <ul className="navigator" id="navigator">
            <li className="nav">
              <a href="#home" id="nav1" className="navbar">
                Home
              </a>
            </li>
            <li className="nav">
              <a href="#about" id="nav2" className="navbar">
                About
              </a>
            </li>
            <li className="nav">
              <a href="#experience" id="nav3" className="navbar">
                Experience
              </a>
            </li>
            <li className="nav">
              <a href="#portofolio" id="nav4" className="navbar">
                Portofolio
              </a>
            </li>
            <li className="nav">
              <a href="#blog" id="nav5" className="navbar">
                Blog
              </a>
            </li>
          </ul>
        </header>
        <section className="header" id="home">
          <div>
            <p className="title">
              I am Awan,
              <br />A Web Designer
            </p>
          </div>
          <div>
            <img src="/assets/image/Foto_Biru.png" className="img" />
          </div>
        </section>
        <section className="header_2" id="about">
          <div className="header21">
            <h2>About</h2>
          </div>
          <div className="header2">
            <img src="/assets/image/1688908285904.JPG" className="img1" />
            <div className="header2-1">
              <div className="header2-1-1">
                <p className="intro">
                  <span className="title1">Muhammad Ade Dzakwan</span> <br />
                  <span className="smallText">Bondowoso, Jawa Timur</span>
                </p>
                <img src="/assets/image/Lambang ITS.png" className="img2" />
              </div>
              <div className="header2-1-2">
                <h2>Description</h2>
                <p className="medium">
                  Information Systems student with a passion for web
                  development, combining technical expertise with strong
                  communication skills. Proven ability to excel in team
                  environments, collaborating effectively to achieve shared
                  goals. Known for handling responsibilities with diligence and
                  reliability, I bring a dynamic approach to problem-solving in
                  the world of programming.
                </p>
              </div>
              <div className="header2-1-3">
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
        </section>
        <section className="header3" id="experience">
          <div className="header3-1">
            <h2>Experience</h2>
          </div>
          <div className="header3-2">
            <div className="header3-2-1">
              <img src="/assets/image/Logo_PMII.png" className="imgOrg" />
              <h3>PMII</h3>
            </div>
            <div className="header3-2-2">
              <img src="/assets/image/Logo JMMI.png" className="imgOrg" />
              <h3>JMMI</h3>
            </div>
            <div className="header3-2-2">
              <img src="/assets/image/Logo IMBS.png" className="imgOrg" />
              <h3>IMBS</h3>
            </div>
            <div className="header3-2-2">
              <img src="/assets/image/pp.png" className="imgOrg" />
              <h3>Remaja Masjid Baitul Makmur</h3>
            </div>
            <div className="header3-2-2">
              <img
                src="/assets/image/Logo Ahbabur Rasul.png"
                className="imgOrg"
              />
              <h3>Ahbabur Rasul</h3>
            </div>
          </div>
        </section>
        <section className="header4" id="portofolio">
          <div className="header4-1">
            <h2 style={{ fontSize: 40, color: "white" }}>Portofolio</h2>
          </div>
          <div className="header4-2">
            <div
              style={{
                position: "relative",
                width: "100%",
                height: 0,
                paddingTop: "56.25%",
                paddingBottom: 0,
                boxShadow: "0 2px 8px 0 rgba(63, 69, 81, 0.16)",
                marginTop: "1.6em",
                marginBottom: "0.9em",
                overflow: "hidden",
                borderRadius: 8,
                willChange: "transform"
              }}
            >
              <iframe
                loading="lazy"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                  border: "none",
                  padding: 0,
                  margin: 0
                }}
                src="https://www.canva.com/design/DAGFQGwI09Y/cX4lBmKpLpEETk8VAfdk-Q/view?embed"
                allowFullScreen="allowfullscreen"
                allow="fullscreen"
              ></iframe>
            </div>
            <a
              href="https://www.canva.com/design/DAGFQGwI09Y/cX4lBmKpLpEETk8VAfdk-Q/view?utm_content=DAGFQGwI09Y&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
              target="_blank"
              rel="noopener"
              className="link-canva"
            >
              Design Portofolio
            </a>
          </div>
        </section>
        <section className="header5" id="blog">
          <div className="header5-1">
            <h2 style={{ fontSize: 40, color: "white" }}>Blog</h2>
          </div>
          <div className="header5-2">
            <iframe
              src="https://thismadura-pride.blogspot.com/"
              width="100%"
              height="100%"
            >
              &lt;p&gt;Your browser does not support iFrames.&lt;/p&gt;
            </iframe>
          </div>
        </section>
        <footer className="footer">
          <p className="text-footer">© 2024 Muhammad Ade Dzakwan</p>
        </footer>
      </main>
    </>
  );
}

export default App;
