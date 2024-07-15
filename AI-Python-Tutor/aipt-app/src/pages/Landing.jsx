import '../index.css';
import React, { useState, useEffect } from 'react';
import supabase from '../utilities/Supabase'; // Import Supabase client instance
import ProfileCard from '../components/ProfileCard';
import TopicCards from '../components/TopicCards';
import { ClipLoader } from 'react-spinners';

const Landing = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [topics, setTopics] = useState(null);
    const [topicCalculations, setTopicCalculations] = useState(null)
    const [loading, setLoading] = useState(true);

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
          // Fetch topics
          const { data: topicData, topicDataError } = await supabase
            .from('Topics')
            .select('id, name');
          if (topicDataError) {
            throw topicDataError;
          }
          
          setUserInfo({username: userInfoData.username, email: user.email, level: userInfoData.level})
          setTopicCalculations(calculatedUserInfo)
          setTopics(topicData);
          
          setLoading(false);

        } catch (error) {
          setError(error.message);
        }
      };
      fetchUserData();
    }, []); // Empty dependency array ensures useEffect runs only once after component mounts

    
    
    return (
      <div className='dashboard-page'>
        
          {loading ? (
            <div className='loader-div'>
              <ClipLoader
                color='#088be2'
                loading={loading}
                size={80}/>
            </div>
          ) : (
            <div className='dashboard-content'>
              <ProfileCard userInfo={userInfo} />
              {topics && topicCalculations ? (
                <TopicCards 
                  statistics={topicCalculations}
                  topics={topics} />
              ) : null}
            </div>
          )}
        
      </div>
    );
  };
  
  export default Landing;