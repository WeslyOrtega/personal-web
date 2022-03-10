import "./Home.scss";

import Navbar from "../../Components/Navbar/Navbar";
import HelloMsg from "../../Components/HelloMsg/HelloMsg";
import About from "../../Components/About/About";
import Projects from "../../Components/Projects/Projects";
import Contact from "../../Components/Contact/Contact";

function Home() {
    return (
        <div className="Home">
            <Navbar />
            <HelloMsg />
            <About />
            <Projects />
            <Contact />
        </div>
    );
}

export default Home;
