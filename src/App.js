import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import HelloMsg from "./Components/HelloMsg/HelloMsg";
import About from "./Components/About/About";
import Projects from "./Components/Projects/Projects";

import logo from "./logo.svg";
import Contact from "./Components/Contact/Contact";

function App() {
    return (
        <div className="App">
            <Navbar />
            <HelloMsg />
            <About />
            <Projects />
            <Contact />
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
