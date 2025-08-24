import '../components/Todolist.css'
import completebtn from "../assets/complete-btn.svg";
import editbtn from "../assets/edit-btn.svg";
import deletebtn from "../assets/delete-btn.svg";
import morebtn from "../assets/more-btn.svg";
import { Link } from 'react-router-dom';

export function Todolist({ todo, onComplete, onEdit, onDelete }) {

    return (
        <div className='task'>
            <div className={todo.completed ? 'task-title line-through' : 'task-title'}>{todo.text}</div>
            <div className='actions'>
                <div className='complete-btn'>
                    <img className='list-icon' src={completebtn} alt="" onClick={() => onComplete(todo.id)} />
                </div>
                <div className='edit-btn'>
                    <img className='list-icon' src={editbtn} alt="" onClick={() => onEdit(todo.id)} />
                </div>
                <div className='delete-btn'>
                    <img className='list-icon' src={deletebtn} alt="" onClick={() => onDelete(todo.id)} />
                </div>
                <div className='more-btn'>
                    <Link to="/tododetail" state={{todo}} href="">
                        <img className='list-icon' src={morebtn} alt="" />
                    </Link>
                </div>
            </div>
        </div>
    )
}