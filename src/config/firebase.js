import { initializeApp } from "firebase/app"
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore"
import { toast } from "react-toastify"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Enter your api key here",
  authDomain: "Enter your auth domain here",
  projectId: "Enter your project id here",
  storageBucket: "Enter your storage bucket here",
  messagingSenderId: "Enter your messaging sender id here",
  appId: "Enter your app id here"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Signup function
const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: "",
            avatar: "",
            bio: "Hey, I'm using Real-Time Chat App",
            lastSeen: Date.now()
        })

        await setDoc(doc(db, "chats", user.uid), {
            chatsData: []
        })
    } catch (error) {
        console.error(error)
        toast.error(error.code.split("/")[1].split("-").join(" "))
    }
}

// Login function
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.error(error)
        toast.error(error.code.split("/")[1].split("-").join(" "))
    }
}

// Logout function
const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.error(error)
        toast.error(error.code.split("/")[1].split("-").join(" "))
    }
}

const resetPassword = async (email) => {
    if (!email) {
        toast.error("Please enter your email")
        return null
    }

    try {
        const userRef = collection(db, "users")
        const q = query(userRef, where("email", "==", email))
        const querySnap = await getDocs(q)

        if (!querySnap.empty) {
            await sendPasswordResetEmail(auth, email)
            toast.success("Password reset email sent")
        } else {
            toast.error("Email not found")
        }
    } catch (error) {
        console.error(error)
        toast.error(error.code.split("/")[1].split("-").join(" "))
    }
}

export { signup, login, logout, auth, db, resetPassword }