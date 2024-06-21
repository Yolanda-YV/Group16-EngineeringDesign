import react from 'react'
import { useState, useEffect } from 'react'
import arrow_down from '/src/assets/arrow_down_transparent.png'
import arrow_up from '/src/assets/arrow_up_transparent.png'
import supabase from '../utilities/Supabase'
import TaskCards from './TaskCards'
import '../index.css'

const TopicCards = ({statistics, topics}) => {
    const [topicList, setTopicList] = useState(null);
    const [openedTopic, setOpenedTopic] = useState(null);
    const [tasks, setTasks] = useState(null);
    useEffect(() => {
        // Takes id of a topic, matches it to an object holding the user's associated stats (tasks completed, task average)
        const getMatchingStat = (id) => {
            const match = statistics.filter((row) => row.topic_id == id)
            if (match.length > 0) {
                return match[0]
            } else {
                return {task_average: 0, tasks_completed: 0}
            }
        }
        // Combines topic name, tasks completed by user, and user task average into a single array of objects
        const combineLists = () => {
            let list = [];
            for (const topic of topics) {
                const stat = getMatchingStat(topic.id)
                list.push({
                    id: topic.id,
                    name: topic.name, 
                    tasks_completed: stat.tasks_completed, 
                    task_average: stat.task_average})
            }
            setTopicList(list)
        }
        combineLists();
    }, [statistics, topics]);

    const onTopicClick = (id) => {
        setOpenedTopic(prevOpenedTopic => prevOpenedTopic == id ? null : id)
    }

    return (
        <div className='topic-cards-container'>
            <h1 className='topic-cards-header'>Topics</h1>
            {topicList ? (
              topicList.map((topic, index) => (
                <div className='topic-card' key={index} id={topic.id}>
                    <div className='topic-detail' onClick={() => onTopicClick(topic.id)}>
                        <div>
                            <img className='expand-condense-img' src={openedTopic == topic.id ? arrow_up : arrow_down}></img>
                            {topic.name}
                        </div>
                        <div>
                            <p>{topic.tasks_completed} Tasks Completed</p>
                            <p>{topic.task_average}%</p>
                        </div>
                    </div>
                    <TaskCards id={topic.id} isOpen={openedTopic == topic.id}/>
                </div>
              ))
            ) : null}
        </div>
        
    );
};

export default TopicCards;