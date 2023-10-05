import { getAuth, signOut } from "firebase/auth";

export const logOut = () => {

    const auth = getAuth();
    signOut(auth).then(() => {
        console.log("SIGN OUT SUCCESS")
    }).catch((error) => {
        console.log("SIGN OUT ERROR " + error.message)
    });

}
