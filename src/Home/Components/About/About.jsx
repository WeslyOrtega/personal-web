import './About.scss'

import cap from '../../../Assets/Icons/graduation-cap.svg'
import briefcase from '../../../Assets/Icons/briefcase.svg'

function About() {
    return (
        <div className='about-container'>
            <h1>About</h1>
            <div className='about-item section'>
                <div className='section-header'>
                    <div className='section-header-text'>Education</div>
                    <img className='section-header-icon' src={cap} alt='cap icon' />
                </div>
                <div className='section-content'>
                    B.S. - Computer Science - Cal Poly: San Luis Obispo
                </div>
            </div>
            <div className='about-item section'>
                <div className='section-header'>
                    <div className='section-header-text'>Experience</div>
                    <img className='section-header-icon' src={briefcase} alt='cap icon' />
                </div>
                <div className='section-content'>
                    Software Engineer Intern @ Intuit - Summer 2021
                </div>
            </div>
        </div>
    );
}

export default About;