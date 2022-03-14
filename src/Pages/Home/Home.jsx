import "./Home.scss";

import Navbar from "../../Home/Components/Navbar/Navbar";
import HelloMsg from "../../Home/Components/HelloMsg/HelloMsg";
import About from "../../Home/Components/About/About";
import Projects from "../../Home/Components/Projects/Projects";
import Contact from "../../Home/Components/Contact/Contact";

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
