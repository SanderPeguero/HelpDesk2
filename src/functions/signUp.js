import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc } from "firebase/firestore"

export const signUp = async ({ email, password, firstName, lastName }) => {

    const auth = getAuth()
    const db = getFirestore()

    const ref = collection(db, 'users')

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        collection('users').doc(userCredential.user.uid).set({
            firstName: firstName,
            lastName: lastName,
            initials: firstName[0] + lastName[0]
        })

        const docRef = await addDoc(collection(db, "TicketReservations"), {
            name: name,
            lastName: lastName,
            email: email,
            time: time,
            guest: guest,
            address: address,
            number: number,
            event: event,
            submitDate: new Date()
        });

        return userCredential

    }).catch((error) => {

        console.log('Error in SignUp ' + error.message)

    })

}