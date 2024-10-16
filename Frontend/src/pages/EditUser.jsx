import axios from 'axios'
import React, { useState , useEffect } from 'react'
import { useNavigate , useParams } from 'react-router-dom'

const EditUser = () => {

  const { userId } = useParams()
  const navigate = useNavigate()
  const [ user , setUser ] = useState({
    name: "",
    email: "",
    password: ""
  }) 

  const handleChange = (e) => {
    setUser((prev) => ({...prev , [e.target.name]: e.target.value}))
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4000/api/user/${userId}` , user);
      if (response.data.success) {
        console.log('User updated successfully', response.data.user);
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleClick}>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default EditUser
