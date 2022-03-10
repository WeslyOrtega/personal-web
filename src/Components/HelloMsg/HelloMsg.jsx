import './HelloMsg.scss'

import { useRef, useEffect } from 'react';
import Typed from 'typed.js';

function HelloMsg() {

    const element = useRef(null);
    const typed = useRef(null)

    useEffect(() => {
        const options = {
            strings: ["Hello!", "My name is Wesly Ortega"],
            typeSpeed: 100,
            backSpeed: 70,
        };

        typed.current = new Typed(element.current, options);

        return () => {
            typed.current.destroy();
        }
    }, [])

    return (
        <div className='hello-msg'>
            <span ref={element}/>   
        </div>
    );
}

export default HelloMsg;