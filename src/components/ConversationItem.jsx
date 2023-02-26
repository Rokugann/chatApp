import { Link } from "react-router-dom"

function ConversationItem(props)
{
    const {key, messages, recipient, setCurrentRoom} = props
    return <li key={key} onClick={() => setCurrentRoom({'roomRecipient':recipient, 'roomContent':messages})}>
            <div>{recipient.displayName}</div>
            <div>{messages[0]}</div>
        </li>
}

export default ConversationItem