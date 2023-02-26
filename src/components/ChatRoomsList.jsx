import ChatRoom from "./ChatRoom";
import { getDocs,collection, orderBy, query, limit, FieldValue, serverTimestamp, addDoc, getDoc, where } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore'; 
import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import ConversationItem from "./ConversationItem";

function ChatRoomsList (props)
{
    const {user, firestore, auth} = props
    const [currentRoom, setCurrentRoom] = useState({
        'roomRecipient':null, 'roomContent': []
    });
    const [users, setUsers] = useState([]);
    const [userConversationsItems, setUserConversationItems] = useState([]);
    
    const populateList = (data) =>
    {
        const uList = []
        data.forEach((u) => {uList.push(u.data())});
        return uList
    }

    const refreshUsersHandler = async () => {
        await getDocs(collection(firestore, "users")).then((data) => setUsers(populateList(data)))
        .then(console.log(users));
        
        // querySnapshot.forEach((u) => {uList.push(u.data())});
        // setUsers(data.map(u => u.data))
        // setUsers(uList);
        
    }

    const conversationsList =[];

    const generateConversations = () => {
        users.map(async recipientUser => {
            if(recipientUser.uid != user.uid)
            {
                const messagesRef = collection(firestore, 'messages');
                const messagesQuery = query(messagesRef, orderBy('createdAt'), where('sender_id','==',user.uid),where("recipient_id", "==", recipientUser.uid));
                const messageList = [];
                const messageListSnap = await getDocs(messagesQuery)
                .then((data) => {
                    data.forEach((msg) => {
                    console.log(msg.data())
                    messageList.push(msg.data())})
                    console.log(messageList)
                    conversationsList.push({'userkey': recipientUser, 'messages': messageList})
                });
            }
        })
        console.log(conversationsList);
        // setUserConversationItems([...conversationsList])
    }

    return (
        <>
            <button onClick={refreshUsersHandler} className='onClickButton'> Reload user list</button>
            <ul className={currentRoom.roomRecipient != null ? "flex mx-16 my-auto" : "flex-column mx-auto my-auto"}>
                {/* {userConversationsItems && userConversationsItems.map((item) =>console.log(item))} */}
             {/* <ConversationItem key={item.uid} messages={item} recipient={userKey} sender={user} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom}/>)} */}
            </ul>
            <div className={currentRoom.roomRecipient != null ? "notHidden" : "hidden"}>
                {currentRoom.roomRecipient ? <ChatRoom key={currentRoom.roomRecipient.id} recipient={roomRecipient} sender={user} messages={userConversationsItems[recipientUser]} /> : "no room currently selected"}
            </div>
        </>
    )
}

export default ChatRoomsList