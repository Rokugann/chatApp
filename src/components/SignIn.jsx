import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function SignIn(props) {
    const signInWithGoogle = () =>
    {
        const provider = new GoogleAuthProvider();
        signInWithPopup(props.auth, provider);
    }

    return (
        <button onClick={signInWithGoogle}></button>
    )
}

export default SignIn