import "./Login.css"
import assets from "../../assets/assets"
import { useState } from "react"
import { signup, login, resetPassword } from "../../config/firebase"

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (currentState === "Sign Up") {
      signup(username, email, password)
    } else {
      login(email, password)
    }
  }
  return (
    <div className="login">
      <img src={assets.logo_big} className="logo" alt="Logo" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currentState}</h2>
        {
          currentState === "Sign Up" ? <input onChange={(e) => setUsername(e.target.value)} value={username} type="text"className="form-input" placeholder="Username" required /> : null
        }
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-input" placeholder="Email" required />
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-input" placeholder="Password" required />
        <button type="submit">
          {
            currentState === "Sign Up" ? "Sign Up" : "Login"
          }
        </button>
        <div className="login-term">
          <input type="checkbox" />
          <p>I agree to the terms of service and privacy policy</p>
        </div>
        <div className="login-forgot">
          {
            currentState === "Sign Up" 
            ? <p className="login-toggle">Already have an account? <span onClick={() => setCurrentState("Login")}>Login</span></p>
            : <p className="login-toggle">Don't have an account? <span onClick={() => setCurrentState("Sign Up")}>Create account</span></p>
          }
          {
            currentState === "Login"
            ? <p className="login-toggle">Forgot your password?  <span onClick={() => resetPassword(email)}>Reset password</span></p>
            : null
          }
        </div>
      </form>
    </div>
  )
}

export default Login