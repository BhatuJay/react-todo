import { useContext } from 'react';
import '../components/Tododetail.css'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ModeContext } from '../context/mode-context';

export function Tododetail() {
    const {isDarkMode} = useContext(ModeContext);
    const location = useLocation();
    const { todo } = location.state || {};

    if (!todo) {
        return <div className='title'>No Todo Found</div>;
    }

    return (
        <div className={isDarkMode ? 'home':'home-dark'}>
            <div className="title">Todo Detail</div>
            <div className='tododetail'>
                <div className='todotext'>{todo.text}</div>
                <Link to="/" className='btn-red'>Go Back</Link>
            </div>
        </div>
    )
}