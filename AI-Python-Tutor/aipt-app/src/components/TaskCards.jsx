import react from 'react'
import { useState, useEffect } from 'react'
import '../index.css'
import supabase from '../utilities/Supabase'

const TaskCards = ({id, isOpen}) => {
    const [tasks, setTasks] = useState(null);
    const [feedbackIsOpen, setFeedbackIsOpen] = useState(null);
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

    const onFeedbackClick = (index) => {
        setFeedbackIsOpen(prevFeedbackIsOpen => prevFeedbackIsOpen == index ? null : index);
    };

    return (
        <div className={`task-cards-container ${isOpen && tasks ? 'active' : ''}`}>
            {tasks ? (
              tasks.map((task, index) => (
                <div className='task-card' key={index}>
                    <div className='task-card-info'>
                        <div className='task-card-info-1'>
                            <p><strong>{index + 1}.)</strong></p>
                            <p>{task.content}</p>
                        </div>
                        <div className='task-card-info-2'>
                            <p>{task.status}</p>
                            <p>{task.score}%</p>
                        </div>
                    </div>
                    <div className='task-card-feedback'>
                        <p className={feedbackIsOpen == index ? 'active' : ''} onClick={() => onFeedbackClick(index)}><strong>Feedback</strong></p>
                        <p className={feedbackIsOpen == index ? 'active' : ''}>{task.feedback}</p>
                    </div>
                </div>
              ))
            ) : null}
        </div>
    );
}

export default TaskCards;