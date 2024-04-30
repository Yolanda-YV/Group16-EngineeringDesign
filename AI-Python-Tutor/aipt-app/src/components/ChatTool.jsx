import react from 'react';

const ChatTool = ({handleSubmit, handlePromptChange}) => {
    return (
        <div className='chat-tool'>
            <div className='chat-space'>
                <p className='chat-message user-chat'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id ornare arcu odio ut sem. Eu nisl nunc mi ipsum.</p>
                <p className='chat-message tutor-chat'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula. Pharetra sit amet aliquam id. Mollis nunc sed id semper.</p>
                <p className='chat-message user-chat'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p className='chat-message tutor-chat'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla ut morbi tincidunt augue. Maecenas ultricies mi eget mauris pharetra et. Sed elementum tempus egestas sed sed risus. Fusce id velit ut tortor.</p>
                <p className='chat-message user-chat'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu cursus euismod quis viverra nibh cras. Ut porttitor leo a diam.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    placeholder='Type your message here' 
                    onChange={handlePromptChange}></input>
                <button type='submit' className='submit-btn'>Send</button>
            </form>
        </div>
    );
}

export default ChatTool