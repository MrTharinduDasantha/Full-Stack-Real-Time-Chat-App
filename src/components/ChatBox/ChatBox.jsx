import { useContext, useEffect, useState } from "react"
import assets from "../../assets/assets"
import "./ChatBox.css"
import { AppContext } from "../../context/AppContext"
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { toast } from "react-toastify"
import upload from "../../lib/upload"

const ChatBox = () => {
  const { userData, messagesId, chatUser, messages, setMessages, chatVisible, setChatVisible } = useContext(AppContext)

  const [input, setInput] = useState("")

  const sentMessage = async () => {
    try {
      if (input && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date()
          })
        })

        const userIDs = [chatUser.rId, userData.id]

        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, "chats", id)
          const userChatsSnapshot = await getDoc(userChatsRef)

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data()
            const chatIndex = userChatData.chatsData.findIndex((c) => c.messageId === messagesId)
            userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30)
            userChatData.chatsData[chatIndex].updateAt = Date.now()
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false
            }
            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData
            })
          }
        })
      }
    } catch (error) {
      console.error(error)
      toast.error("Error sending message")
    }

    setInput("")
  }

  const sendImage = async (e) => {
    try {
      const fileUrl = await upload(e.target.files[0])

      if (fileUrl && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            image: fileUrl,
            createdAt: new Date()
          })
        })

        const userIDs = [chatUser.rId, userData.id]

        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, "chats", id)
          const userChatsSnapshot = await getDoc(userChatsRef)

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data()
            const chatIndex = userChatData.chatsData.findIndex((c) => c.messageId === messagesId)
            userChatData.chatsData[chatIndex].lastMessage = "Image"
            userChatData.chatsData[chatIndex].updateAt = Date.now()
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false
            }
            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData
            })
          }
        })
      }
    } catch (error) {
      console.error(error)
      toast.error("Error sending image")
    }
  }
  
  const convertTimestamp = (timestamp) => {
    const date = timestamp.toDate()
    let hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
  
    // Convert to 12-hour format
    hours = hours % 12 || 12
  
    return `${hours}:${minutes} ${ampm}`
  }
  

  useEffect(() => {
    if (messagesId) {
      const onSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        setMessages(res.data().messages.reverse())
      })
      return () => {
        onSub()
      }
    }
  }, [messagesId])
  return chatUser ? (
    <div className={`chat-box ${chatVisible ? "" : "hidden"}`}>
      <div className="chat-user">
        <img src={chatUser.userData.avatar} alt="Profile Image" />
        <p>{chatUser.userData.name} {Date.now() - chatUser.userData.lastSeen <= 70000 ? <img src={assets.green_dot} className="dot" alt="Green Dot" /> : null}</p>
        <img src={assets.help_icon} className="help" alt="Help Icon" />
        <img onClick={() => setChatVisible(false)} src={assets.arrow_icon} className="arrow" alt="Arrow Icon" />
      </div>

      <div className="chat-msg">
        {
          messages.map((msg, index) => (
            <div key={index} className={msg.sId === userData.id ? "s-msg" : "r-msg"}>
              {
                msg["image"]
                ? <img className="msg-img" src={msg.image} alt="Image" />
                : <p className="msg">{msg.text}</p> 
              }
              <div>
                <img src={msg.sId === userData.id ? userData.avatar : chatUser.userData.avatar} alt="Profile Image" />
                <p>{convertTimestamp(msg.createdAt)}</p>
              </div>
            </div>
          ))
        }
      </div>

      <div className="chat-input">
        <input onChange={(e) => setInput(e.target.value)}value={input} type="text" placeholder="Type a message" />
        <input onChange={sendImage} type="file" id="image" accept="image/png, image/jpeg" hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="Gallery Icon" />
        </label>
        <img onClick={sentMessage} src={assets.send_button} alt="Send Button" />
      </div>
    </div>
  )
  : <div className={`chat-welcome ${chatVisible ? "" : "hidden"}`}>
      <img src={assets.logo_icon} alt="Logo Icon" />
      <p>Welcome to our chat app!</p>
    </div>
}

export default ChatBox