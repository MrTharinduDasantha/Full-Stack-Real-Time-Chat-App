import { useContext, useEffect, useState } from "react"
import assets from "../../assets/assets"
import { logout } from "../../config/firebase"
import "./RightSidebar.css"
import { AppContext } from "../../context/AppContext"

const RightSidebar = () => {
  const { chatUser, messages } = useContext(AppContext)

  const [msgImages, setMsgImages] = useState([])

  useEffect(() => {
    let tempVar = []
    messages.map((msg) => {
      if (msg.image) {
        tempVar.push(msg.image)
      }
    })
    setMsgImages(tempVar)
  }, [messages])
  return chatUser ? (
    <div className="rs">
      <div className="rs-profile">
        <img src={chatUser.userData.avatar} alt="Profile Image" />
        <h3>{Date.now() - chatUser.userData.lastSeen <= 70000 ? <img src={assets.green_dot} className="dot" alt="Green Dot" /> : null} {chatUser.userData.name}</h3>
        <p>{chatUser.userData.bio}</p>
      </div>

      <hr />
      
      <div className="rs-media">
        <p>Media</p>
        <div>
          {
            msgImages.map((url, index) => (
              <img onClick={() => window.open(url)} key={index} src={url} alt="Image" />
            ))
          }
        </div>
      </div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
  : (
    <div className="rs">
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default RightSidebar