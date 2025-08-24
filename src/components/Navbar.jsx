import './Navbar.css'
import todo from "../assets/todo.svg";
import sun from "../assets/cloud-sun.svg";
import moon from "../assets/night-white.svg";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ModeContext } from '../context/mode-context';
import { Modal } from './Model';

export function Navbar() {
    const { isDarkMode, toggleMode } = useContext(ModeContext);
    const location = useLocation();

    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    const handleModalClose = () =>{
        setOpenModal(false);
    }
    const handleModalLogout = () =>{
        localStorage.removeItem("loginData");
        navigate("/login");
    }

    return (
        <><div className='navbar'>
            <div className='logo'>
                <a href="">TODO
                    <span>
                        <img className='todo-icon' src={todo} alt="" />
                    </span>
                </a>
            </div>
            <ul>
                <li>
                    <Link to="/" className={location.pathname === '/' ? 'link-active' : 'link'}>Home</Link>
                </li>
                <li>
                    <Link to="/about" className={location.pathname === '/about' ? 'link-active' : 'link'}>About</Link>
                </li>
                <li>
                    <Link to="/alltodos" className={location.pathname === '/alltodos' ? 'link-active' : 'link'}>All Todos</Link>
                </li>
            </ul>
            <div className='logout'>
                <span className='dark-mode-icon' onClick={toggleMode}>
                    {isDarkMode ? (
                        <img className='sun-moon-icon' src={moon} alt="" />
                    ) : (
                        <img className='sun-moon-icon' src={sun} alt="" />
                    )}
                </span>
                {/* <Link to="/model"> */}
                    <button onClick={() => setOpenModal(true)} type='button' className='btn-red'>Logout</button>
                {/* </Link> */}
            </div>
        </div>
        {openModal && <Modal handleModalClose={handleModalClose} handleModalLogout={handleModalLogout} />}
        </>
    )
}