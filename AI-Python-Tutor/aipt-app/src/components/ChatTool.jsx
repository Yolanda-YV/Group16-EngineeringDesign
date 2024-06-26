import react from 'react';
import parse from 'html-react-parser';

const ChatTool = ({handleSubmit, handlePromptChange, chats}) => {
    return (
        <div className='chat-tool'>
            <div className='chat-space'>
                {chats ? (
                    chats.map((chat, index) => (
                        <p key={index} className={`chat-message ${chat.role}-chat`}>{parse(chat.content)}</p>
                    ))
                ) : null}
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