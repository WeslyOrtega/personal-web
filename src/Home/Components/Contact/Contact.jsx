import './Contact.scss'

import github from '../../../Assets/Icons/github.svg'
import linkedin from '../../../Assets/Icons/linkedin.svg'

function Contact() {
    return (
        <div className='contact-container'>
            <div className='email'>weslyortega@gmail.com</div>
            <a href='https://github.com/WeslyOrtega' target="_blank" rel='noreferrer'>
                <img className='icon' src={github} alt="GitHub Icon" />
            </a>
            <a href='https://www.linkedin.com/in/wesly-ortega/' target="_blank" rel='noreferrer'>
                <img className='icon' src={linkedin} alt="LinkedIn Icon" />
            </a>
        </div>
    );
}

export default Contact;