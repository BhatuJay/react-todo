import { useContext } from 'react'
import '../pages/About.css'
import { ModeContext } from '../context/mode-context'

export function About() {
    const {isDarkMode} = useContext(ModeContext);
    return (
        <div className='about'>
            <div className={isDarkMode ? 'home':'home-dark'}>
                <div className="content">
                    <div className="title">About ToDo</div>
                    <div className="desc">
                        A to-do list is a list of items that{" "}
                        <span className="text-red">need to be completed</span>. The items on the
                        list can range from simple activities like replying to an email, to more
                        complex tasks like creating project briefs.
                    </div>
                    <div className="desc">
                        The items on a to-do list are usually{" "}
                        <span className="text-red">action-oriented</span>, such as “Schedule a
                        meet with the R&D team” or “Call back customer X.” Some lists include
                        more abstract goals, such as “improve your time management skills” or
                        “learn how to use a new software program.”
                    </div>
                </div>
            </div>
        </div>
    )
}