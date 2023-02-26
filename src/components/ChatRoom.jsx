import ChatMessage from "./ChatMessage";
import { getDocs,collection, orderBy, query, limit, FieldValue, serverTimestamp, addDoc } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore'; 
import { async } from "@firebase/util";
import { useState } from "react";

function ChatRoom (props)
{
    const {recipient, sender, messages, key} = props;
    // const messagesRef = collection(props.firestore, 'messages');
    // const myQuery = query(messagesRef, orderBy('createdAt'), limit(25));
    // const [messages] = useCollectionData(myQuery, {idField:'id'});
    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) =>
    {
        e.preventDefault();

        const {sender_id} = sender.uid;
        const {recipient_id} = recipient.uid;
        console.log(props.auth);

        await addDoc(collection(props.firestore, 'messages'), {
            text: formValue,
            createdAt: serverTimestamp(),
            sender_id,
            recipient_id,
        })

        setFormValue('');
    }

    return (
        <>
            <ul>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} userID={user.uid}/>)}
            </ul>
            <form onSubmit={sendMessage}>
                <input value={formValue} onChange= {(e) => setFormValue(e.target.value)}/>
                <button type="submit">Envoyer</button>
            </form>
        </>
    )
}

export default ChatRoom