import react from 'react'
import { useState, useEffect } from 'react'
import '../index.css'
import supabase from '../utilities/Supabase'

const TaskCards = ({id, isOpen}) => {
    const [tasks, setTasks] = useState(null);
    useEffect(() => {
        if (isOpen) {
            const fetchUserTasks = async () => {
                try {
                    // get user
                    const { data: {user}, error: userError } = await supabase.auth.getUser();
                    if (userError) {
                        throw userError;
                    }
                    // get tasks
                    const { data: tasks, error: tasksError } = await supabase.rpc("user_tasks_by_topic", {
                        tc_id: id,
                        u_id: user.id,
                    });
                    if (tasksError) {
                        throw tasksError;
                    }
                    setTasks(tasks)
                } catch (error) {
                    console.error('Error fetching user tasks:', error);
                }
            };
            fetchUserTasks();
        } else {
            setTasks(null);
        }
    }, [isOpen]);
    return (
        <div className={`task-cards-container ${isOpen && tasks ? 'active' : ''}`}>
            {tasks ? (
              tasks.map((task, index) => (
                <div className='task-card' key={index} id={task.id}>
                    {task.content}
                </div>
              ))
            ) : null}
        </div>
    );
}

export default TaskCards;