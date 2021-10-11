import React , { useEffect , useState } from 'react';
import netflix from './images/netflix.jpg'
import './Nav.css'



const Nav = () => {

    const [show , handleShow] = useState (false)

    useEffect (() => {
        window.addEventListener('scroll' , () => {
            if (window.scrollY > 100) {
                handleShow (true)
            } else handleShow (false)
        });
        return () => {
            window.removeEventListener ('scroll')
        }

    } , [])

    return (
        <div className={`nav ${show && "nav__black"}`}>

            <div className="nav__logo">NETFLIX</div>
            <img className={'nav__avatar'}
                 src={`${netflix}`}
                 alt="Netflix logo"/>
        </div>
    );
}

export default Nav;

