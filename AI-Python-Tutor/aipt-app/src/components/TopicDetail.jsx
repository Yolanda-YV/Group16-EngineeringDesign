import react from 'react';
import '../index.css';
import { useEffect, useState } from 'react'; 

const TopicDetail = ({name, id, statistics}) => {
    const [statistic, setStatistic] = useState(null);
    useEffect(() => {
        const getMatchingAverage = () => {
            const match = statistics.filter((row) => row.topic_id == id)
            console.log(`Matches ${match}`)
            if (match.length > 0) {
                setStatistic(match[0])
            } else {
                setStatistic({task_average: 0, tasks_completed: 0})
            }
        }
        getMatchingAverage();
    }, [statistics]);
    return (
        <div className='topic-detail'>
            <p>{name}</p>
            <div>
                <p>{statistic ? statistic.tasks_completed : 0} Tasks Completed</p>
                <p>{statistic ? statistic.task_average : 0}</p>
            </div>
        </div>
    );
}

export default TopicDetail;