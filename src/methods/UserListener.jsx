async function UserListener(props)
{
    const {user, firestore, event} = props
    event.preventDefault();
    
    //Récuperer tous les utilisateurs connecter et écouter si de nouveaux utilisateurs se connectent 
    //ou de déconnectent
    previousUserUID = user.uid;
    const usersColQuery = query(collection(firestore, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const usersList = [];
    querySnapshot.forEach((user) => {
        usersList.push(user);
    });
    setUsers(usersList);
    });
    unsubscribe(usersColQuery);

    //Vérifier si l'utilsateur actuel existe puis changer son status en connecté, à défaut créer 
    //l'utilisateur et le connecter
    const {uid, photoURL, displayName} = user;
    const userDocRef = doc(firestore, 'users', uid);
    const userDocSnap = getDoc(userDocRef)
    if((await userDocSnap).exists())
    {
    await updateDoc(userDocRef, {
        isConnected: true
    })
    }
    else
    {
    await setDoc(userDocRef, {
        uid: uid,
        displayName: displayName,
        photoURL: photoURL,
        isConnected: true
    })
    }
    console.log(users)
}

export default UserListener