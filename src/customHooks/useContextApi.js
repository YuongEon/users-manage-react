import { createContext, useState } from "react"

export const GlobalContextApi = createContext()

const UseContextApi = ({children}) => {
  const [user, setUser] = useState({
    email: "",
    auth: false
  })

  const userLogin = (email, token) => {
    setUser({
      email: email,
      auth: true,
      token: token
    })
    let user = {
      email: email,
      auth: true,
      token: token
    }
    localStorage.setItem("user", JSON.stringify(user))
  }

  const userLogout = () => {
    setUser({
      email: "",
      auth: false,
      token: ""
    })
    localStorage.removeItem("user")
  }

  const store = {
    user: user,
    userLogin: (email, token) => userLogin(email, token),
    userLogout: () => userLogout()
  }

  return (
    <GlobalContextApi.Provider value={store}>
      {children}
    </GlobalContextApi.Provider>
  )
}

export default UseContextApi