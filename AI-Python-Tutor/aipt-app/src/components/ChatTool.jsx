import react from 'react';
import parse from 'html-react-parser';
import { useEffect, useRef, useState } from 'react'; 
import { PulseLoader, ClipLoader } from 'react-spinners';

const ChatTool = ({handleSubmit, handlePromptChange, chats, chatLoading}) => {
    const [responseLoading, setResponseLoading] = useState(false)
    const chatSpace = useRef(null);
    useEffect(() => {
        chatSpace.current.scrollTop = chatSpace.current.scrollHeight;
        if (chats.length > 0) {
            if (chats[chats.length - 1].role == 'user') {
                setResponseLoading(true);
            } else {
                setResponseLoading(false);
            }
        }
    }, [chats]);
    return (
        <div className='chat-tool'>
            <div className='chat-space' ref={chatSpace}>
                {chats && !chatLoading ? (
                    chats.map((chat, index) => (
                        <p key={index} className={`chat-message ${chat.role}-chat`}>{parse(chat.content)}</p>
                    ))
                ) : (
                    <div className='loader-div'>
                        <ClipLoader
                            color='#088be2'
                            loading={chatLoading}
                            size={30}/>
                    </div>
                )}
                {responseLoading ? (
                    <div className='chat-loader-div'>
                        <PulseLoader
                            color='#088be2'
                            loading={responseLoading}
                            size={10}/>
                    </div>
                ) : null}
            </div>
            <form onSubmit={handleSubmit}>
                <textarea 
                    rows={1}
                    type='text' 
                    placeholder='Type your message here' 
                    onChange={handlePromptChange}></textarea>
                <button type='submit' className='submit-btn'>Send</button>
            </form>
        </div>
    );
}

export default ChatTool