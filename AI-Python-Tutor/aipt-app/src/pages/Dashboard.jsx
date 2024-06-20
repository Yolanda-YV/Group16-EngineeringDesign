import '../index.css';
import React, { useState, useEffect } from 'react';
import supabase from '../utilities/Supabase'; // Import Supabase client instance
import ProfileCard from '../components/ProfileCard';
import TopicDetail from '../components/TopicDetail';

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [topics, setTopics] = useState(null);
    const [userTopicCalculation, setUserTopicCalculation] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [topicTasksData, setTopicTasksData] = useState([]);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          // Fetch the authenticated user
          const { data: { user }, error: userError } = await supabase.auth.getUser();
          if (userError) {
            throw userError;
          }
          // Fetch UserInfo for the logged-in user
          const { data: userInfoData, error: userInfoError } = await supabase
            .from('UserInfo')
            .select('level, username')
            .eq('user_id', user.id)
            .single();
          if (userInfoError) {
            throw userInfoError;
          }
          // Fetch calculated averages for user topics
          const { data: calculatedUserInfo, error: calculatedUserInfoError } = await supabase.rpc("calculate_all_average_scores", {
              u_id: user.id
          });
          if (calculatedUserInfoError) {
            throw calculatedUserInfoError;
          }
          console.log(calculatedUserInfo)
          setUserInfo({username: userInfoData.username, email: user.email, level: userInfoData.level})
          setUserTopicCalculation(calculatedUserInfo)


        //   // fetch topic and task data
        //   const { data: topicTasksData, error: topicTasksError } = await supabase
        //    .from('Tasks')
        //    .select('content, topic_id, Topics (name, level_id)')
        //    .order('id');

        //   if (topicTasksError) {
        //     throw topicTasksError;
        //   }
 
        //  // Set topic tasks data
        //  setTopicTasksData(topicTasksData);

        //  console.log('Topic Tasks data:', topicTasksData);

        //  // fetch user tasks data
        //  const { data: tasksData, error: tasksError } = await supabase
        //    .from('UserTasks')
        //    .select('status, started_at, feedback, completed_at, score')
        //    .eq('user_id', user.id);

        //   if (tasksError) {
        //   throw tasksError;
        //   }

        //   // Set tasks data
        //  setTasks(tasksData);

        //  console.log('Tasks data:', tasksData);

        //  setLoading(false);
        } catch (error) {
          setError(error.message);
        }
      };
      const fetchTopics = async () => {
        const { data, error } = await supabase
          .from('Topics')
          .select('id, name');
        if (data) {
          setTopics(data);
        } else {
          console.error('Error fetching Topics:', error);
        }
      };
      fetchUserData();
      fetchTopics();
    }, []); // Empty dependency array ensures useEffect runs only once after component mounts

    const fetchUserTasks = () => {
      // 
    };
    
    return (
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <ProfileCard userInfo={userInfo} />
          <div className='topics-container'>
            <h1>Topics</h1>
            {topics && userInfo ? (
              topics.map((topic, index) => (
                <div className='topic-card' key={index}>
                  <TopicDetail name={topic.name} id={topic.id} statistics={userTopicCalculation} />
                </div>
              ))
            ) : null}
          </div>
        </div>
        
      </div>
    );

    // return (
    //   <div className='dashboard-page'>
    //     <h1>Welcome to the Dashboard</h1>
    //     <div className='user-info-card'>
    //       <h2>User Info</h2>
    //       <p><strong>Email:</strong> {userInfo ? userInfo.email : null}</p>
    //       <p><strong>Name:</strong> {userInfo ? userInfo.username : null}</p>
    //       <p><strong>Level:</strong> {userInfo ? userInfo.level : null}</p>
    //     </div>
    //     <div className='topics-tasks-container'>
    //     <div className='topics-card'>
    //     <h2>Topics</h2>
    //     {topicTasksData.length > 0 ? (
    //       <ul>
    //         {topicTasksData.map((topics, index) => (
    //           <li key={index}>
    //             <p><strong>Name:</strong> {topics.Topics.name}</p>
    //             <p><strong>Content:</strong> {topics.content}</p>
    //             <p><strong>Level:</strong> {topics.Topics.level_id}</p>
    //             <p><strong>Topic #:</strong> {topics.topic_id}</p>
    //           </li>
    //         ))}
    //       </ul>
    //     ) : (
    //       <p>No topics found.</p>
    //     )}
    //   </div>
    //   <div className='tasks-card'>
    //     <h2>Tasks</h2>
    //     {tasks.length > 0 ? (
    //       <ul>
    //         {tasks.map((task, index) => (
    //           <li key={index}>
    //             <p><strong>Status:</strong> {task.status}</p> 
    //             <p><strong>Started At:</strong> {task.started_at}</p>
    //             <p><strong>Feedback:</strong> {task.feedback}</p>
    //             <p><strong>Completed At:</strong> {task.completed_at}</p>
    //             <p><strong>Score:</strong> {task.score}</p>
    //           </li>
    //         ))}
    //       </ul>
    //     ) : (
    //       <p>No tasks found for this user.</p>
    //     )}
    //     </div>
    //   </div>
    //   </div>
    // );
  };
  
  export default Dashboard;