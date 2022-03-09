import './Navbar.scss'

function Navbar() {
    return (
        <div className='nav-container'>
            <div className='nav-item personal-logo'>W</div>
            <div className='nav-item'>Home</div>
            <div className='nav-item'>About</div>
            <div className='nav-item'>Projects</div>
            <div className='nav-item'>Contact</div>
        </div>
    )
}

export default Navbar;