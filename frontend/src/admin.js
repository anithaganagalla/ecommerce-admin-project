import axios from "axios"

const API = "http://localhost:5000/api/admin"

// get token
const getToken = () => {
  return localStorage.getItem("token")
}

// get all users (admin)
export const getAllUsers = async () => {

  try {

    const res = await axios.get(`${API}/users`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    return res.data

  } catch (error) {

    console.error(error)
    return []

  }

}
