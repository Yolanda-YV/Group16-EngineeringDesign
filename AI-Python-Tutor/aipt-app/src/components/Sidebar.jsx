import react from 'react';
import '../index.css';
import { useState, useEffect } from 'react';
import Book from './svg/Book.jsx';
import Lock from './svg/Lock.jsx';

const Sidebar = ({topics, onTopicClick, level}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [Topics, setTopics] = useState(null);
    useEffect(() => {
        //console.log(level)
        if (topics) {
            const topics_1 = topics.filter(topic => topic.level_id == 1);
            const topics_2 = topics.filter(topic => topic.level_id == 2);
            const topics_3 = topics.filter(topic => topic.level_id == 3);
            setTopics({beginner: topics_1, intermediate: topics_2, expert: topics_3});
        }
        console.log(level)
    }, [topics, level]);

    const handleTopicClick = (e) => {
        onTopicClick(e);
        // Setting time gap between these two functions to reduce the jaggedness of the sidebar transition
        setTimeout(function(){
            setIsOpen(false);
        }, 450);
    };

    return (
        <div className={`side-bar ${isOpen ? '' : 'active'}`}>
            <button onClick={() => setIsOpen(!isOpen)}><Book /> {isOpen ? 'Topics' : null}</button>
            {isOpen && Topics && level ? (
                <dl>
                    <dt>Beginner</dt>
                    {Topics.beginner.map((topic, index) => (
                        <dd key={index} id={topic.id} onClick={handleTopicClick}>{topic.name}</dd>
                    ))}
                    <dt>Intermediate {level == "Beginner" ? <Lock /> : null}</dt>
                    {Topics.intermediate.map((topic, index) => (
                        <dd 
                            className={level == "Beginner" ? 'inactive' : ''} 
                            key={index} id={topic.id} 
                            onClick={level == "Beginner" ? null : handleTopicClick}>{topic.name}</dd>
                    ))}
                    <dt>Expert {level == "Beginner" || level == "Intermediate" ? <Lock /> : null}</dt>
                    {Topics.expert.map((topic, index) => (
                        <dd 
                            className={level == "Beginner" || level == "Intermediate" ? 'inactive' : ''} 
                            key={index} id={topic.id} 
                            onClick={level == "Beginner" || level == "Intermediate" ? null : handleTopicClick}>{topic.name}</dd>
                    ))}
                </dl>
            ) : null}
        </div>
    );
}

export default Sidebar;