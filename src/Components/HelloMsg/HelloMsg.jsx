import './HelloMsg.scss'

import { useRef, useEffect } from 'react';
import Typed from 'typed.js';

function HelloMsg() {

    const element = useRef(null);
    const typed = useRef(null)

    useEffect(() => {
        const options = {
            strings: ["Hello! My name is Wesly Ortega"],
            typeSpeed: 50,
        };

        typed.current = new Typed(element.current, options);

        return () => {
            typed.current.destroy();
        }
    }, [])

    return (
        <div className='hello-msg'>
            <span ref={element}></span>    
        </div>
    );
}

export default HelloMsg;