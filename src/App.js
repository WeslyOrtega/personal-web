import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import HelloMsg from "./Components/HelloMsg/HelloMsg";
import About from "./Components/About/About";
import Projects from "./Components/Projects/Projects";

import Contact from "./Components/Contact/Contact";

function App() {
    return (
        <div className="App">
            <Navbar />
            <HelloMsg />
            <About />
            <Projects />
            <Contact />
        </div>
    );
}

export default App;
