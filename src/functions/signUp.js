import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore"

export const signUp = ({ email, password, firstName, lastName }) => {

    const auth = getAuth()
    const db = getFirestore()

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

        // Add a new document in collection "cities"
        setDoc(doc(db, "users", userCredential.user.uid), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            initials: firstName[0] + lastName[0],
            submitDate: new Date()
        })

        return userCredential

    }).catch((error) => {

        console.log('Error in SignUp ' + error.message)

    })

}