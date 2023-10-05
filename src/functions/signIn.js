import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const signIn = (email, password) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("LOGIN_SUCCESS" + userCredential)
            return userCredential
        })
        .catch((error) => {
            console.log("LOGIN_ERROR " + error.message)
        });


}



