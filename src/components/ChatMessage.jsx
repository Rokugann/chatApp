function ChatMessage(props)
{
    const {message, userID} = props 
    const messageClass = message.sender_id === userID ? 'sent' : 'received';
    return <li className={messageClass} key={props.key}>{message.text}</li>
}

export default ChatMessage