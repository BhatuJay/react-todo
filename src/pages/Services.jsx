import { useContext, useEffect, useState } from 'react'
import '../pages/Services.css'
import { ModeContext } from '../context/mode-context'
import { useFetch } from '../hooks/useFetch';

export function Services() {
    const { isDarkMode } = useContext(ModeContext);
    const [dummyTodos, setDummyTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const todosPerPage = 10;

    const [data, loading] = useFetch("https://jsonplaceholder.typicode.com/todos");
    // const [data, loading] = useFetch("https://jsonplaceholder.typicode.com/posts");

    useEffect(() => {
        if (data) {
            setDummyTodos(data);
        }
    }, [data]);


    // Calculate indexes for current page
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = dummyTodos.slice(indexOfFirstTodo, indexOfLastTodo);

    const totalPages = Math.ceil(dummyTodos.length / todosPerPage); // Calculate total pages

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };                                  // Change page handler

    return (
        <div className="services">
            <div className={isDarkMode ? 'home' : 'home-dark'}>
                <div className="content">
                    <div className="title">List of ToDos</div>
                    <div className="container">
                        {!loading && currentTodos.length === 0 && (<div className='empty-todos-list'>No Todos Added.</div>)}
                        
                        {loading && <p className='empty-todos-list'>loading...</p>}

                        {currentTodos.map((item) => (
                            <div
                                className={isDarkMode ? 'card' : 'card-dark'}
                                key={item.id}>
                                <div className="todo-title">{item.title}</div>
                                <div
                                    className={`${item.completed ? "chip completed" : "chip pending"}`}>
                                    {item.completed ? "Completed" : "Pending"}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination controls */}
                    <div className='title'></div>
                    <div className="pagination">
                        <button
                            className={currentPage === 1 ? "btn-blue-disable" : "btn-blue"}
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>

                        <span className="current-page">{currentPage}</span>

                        <button
                            className={currentPage === totalPages ? "btn-red-disable" : "btn-red"}
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}