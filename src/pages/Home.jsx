import './Home.css'
import todo from "../assets/todo.svg";
import { Todolist } from '../components/Todolist';
import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ModeContext } from '../context/mode-context';

export function Home() {
    const {isDarkMode} = useContext(ModeContext);
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todoData")) || []);
    const [editingTodo, setEditingTodo] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddOrUpdate({ id: editingTodo ? editingTodo.id : null, text: inputValue });
        setInputValue('');
    };

    const handleAddOrUpdate = ({ id, text }) => {
        if (id) {
            //Update existing todo
            // const updatedTodos = todos.map((todo) =>
            //     todo.id === id ? { ...todo, text } : todo
            // );
            // setTodos(updatedTodos);
            // setEditingTodo(null);

            const index = todos.findIndex((todo) => todo.id === id);
            const updatedTodos = [...todos];
            updatedTodos[index] = { ...updatedTodos[index], text }; //update the text
            setTodos(updatedTodos);
            setEditingTodo(null); //clear editing state
        } else {
            //Add new todo
            setTodos([...todos, { id: uuidv4(), text }]);
        }
    };

    useEffect(() => {
        localStorage.setItem("todoData", JSON.stringify(todos))
    }, [todos])

    useEffect(() => {
        if (editingTodo) {
            setInputValue(editingTodo.text);
        }
    }, [editingTodo]);

    const handleComplete = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const handleEdit = (id) => {
        const index = todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
            const todoToEdit = todos[index];
            setEditingTodo(todoToEdit);
            setInputValue(todoToEdit.text);
        }
    };

    console.log(editingTodo);

    const handleDelete = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    console.log(todos);

    return (
        <div className={isDarkMode ? 'home' : 'home-dark'}>
            <div className={isDarkMode ? 'todo' : 'todo-dark'}>
                <div className='todo-form'>
                    <div className='title'>
                        My Todos
                        <span><img className='todo-form-icon' src={todo} alt="" /></span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="task-input"
                            type="text"
                            name="taskTitle"
                            id="task"
                            placeholder="Enter your task..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn-blue">
                            {editingTodo ? 'Update' : 'Add'}
                        </button>
                    </form>
                </div>

                <div className='todo-list'>
                    {todos.map((todo) => (
                        <Todolist key={todo.id} todo={todo} onComplete={handleComplete} onEdit={handleEdit} onDelete={handleDelete} />
                    ))}
                </div>

                <div className='todo-list'>
                    {todos.length === 0 && (<div className='empty-list'>No Task Added.</div>)}
                </div>
            </div>
        </div>
    )
}