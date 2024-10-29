import { useContext, useEffect, useState } from "react"
import assets from "../../assets/assets"
import "./ProfileUpdate.css"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../../config/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import upload from "../../lib/upload"
import { AppContext } from "../../context/AppContext"

const ProfileUpdate = () => {
  const navigate = useNavigate()
  const [image, setImage] = useState(false)
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [uid, setUid] = useState("")
  const [prevImage, setPrevImage] = useState("")

  const { setUserData } = useContext(AppContext)

  const profileUpdate = async (e) => {
    e.preventDefault()
    
    try {
      if (!prevImage && !image) {
        toast.error("Please select an image to upload")
      }

      const docRef = doc(db, "users", uid)

      if (image) {
        const imgUrl = await upload(image)
        setPrevImage(imgUrl)
        await updateDoc(docRef, {
          avatar: imgUrl,
          name: name,
          bio: bio,
        })
      } else {
        await updateDoc(docRef, {
          name: name,
          bio: bio,
        })
      }

      const snap = await getDoc(docRef)
      setUserData(snap.data())

      navigate("/chat")
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid)
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.data().name) {
          setName(docSnap.data().name)
        }
        if (docSnap.data().bio) {
          setBio(docSnap.data().bio)
        }
        if (docSnap.data().avatar) {
          setPrevImage(docSnap.data().avatar)
        }
      } else {
        navigate("/")
      }
    })
  }, [])
  return (
    <div className="profile">
      <div className="profile-container">
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="avatar" accept=".png, .jpg, .jpeg" hidden />
            <img src={image ? URL.createObjectURL(image) : assets.avatar_icon} alt="Avatar Icon" />
            Upload profile picture
          </label>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Your name" required />
          <textarea onChange={(e) => setBio(e.target.value)} value={bio} placeholder="Write something about yourself"></textarea>
          <button type="submit">Save</button>
        </form>
        <img src={image ? URL.createObjectURL(image) : prevImage ? prevImage : assets.logo_icon} className="profile-pic" alt="Logo Icon" />
      </div>
    </div>
  )
}

export default ProfileUpdate