import "./Navbar.css";
import React, { useState} from "react";
import {Link} from 'react-router-dom';
import logo from '../../images/marronBe.jpg';
import Logout from '../logout';
import home from '../../images/maison.svg'

function Navbar(){

    const [focusedNavbar, setFocusedNavbar] = useState(null);
    const [logOut, setLogOut] = useState(false);

    const handleFocused = (event) => {
        if(focusedNavbar){
            focusedNavbar.classList.remove('active')
            focusedNavbar.style.color = 'white'
            // focusedNavbar.style.backgroundColor = 'transparent'
        }
        
        event.target.style.color = '#8a5b25';
        // event.target.style.backgroundColor = 'white';
        event.target.classList.add('active')
        setFocusedNavbar(event.target)
    }

    const handleLogout = () => {
        setLogOut(true)
    }

return(
    <body>
        {logOut && <Logout modal={() => setLogOut(false)}/>}
        <section>
            <nav class="navbar">
                <div className="logo">
                    <img src={logo} className='img-logo'/>
                    <p>Golden Rose Hotel</p>
                </div>
                <ul>
                
                    <li >
                        {/* <img src={home} alt="" class="icon" style={{background : "white"}}/> */}
                        <Link to="/dashboard"><p href="" class="nav-item"  onClick={handleFocused}>Dashboard</p></Link>
                        
                    </li>
                    <li>
                        {/* <img src={lister} alt="" class="icon"/> */}
                        <Link to="/dispo"><p href="" class="nav-item" onClick={handleFocused}>Availability</p></Link>
                    </li>
                    <li>
                        {/* <img src={reserver} alt="" class="icon"/> */}
                        <Link to="/enregistrer"><p href="" class="nav-item" onClick={handleFocused}>Make reservation</p></Link>
                    </li>
                    <li>
                        {/* <img src={reserver} alt="" class="icon"/> */}
                        <Link to="/reservation"><p href="" class="nav-item" onClick={handleFocused}>Reservations list</p></Link>
                    </li>
                    {/* <li onClick={handleFocused}> */}
                        {/* <img src={demande} alt="" class="icon"/> */}
                        {/* <Link to="/demande"><p href="" class="nav-item" >Demande de réservation</p></Link> */}
                    {/* </li> */}
                    
                    <li onClick={handleLogout}>
                        <p class="nav-item">Log out</p>
                    </li>
                </ul>
            </nav>
        </section>
    </body>
)
}

export default Navbar;