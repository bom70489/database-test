import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Home = () => {

const {
        AddUser,
        filteredUsers,
        deleteUser,
        filterUsers,
  } = useContext(UserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddUser = (e) => {
    e.preventDefault();
    AddUser(name, email, password);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterUsers(e.target.value);
  };

  return (
    <div>
      <h1>User Management</h1>

      <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter name'
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter email'
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter password'
          required
        />
        <button type="submit">Add User</button>
      </form>

      <div style={{ marginTop: '20px'}}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          style={{width: '200px'}}
          placeholder="Search by name or email or id"
        />
      </div>

      {filteredUsers.map((item , index) => (
        <ul key={index}>
          <li style={{ listStyle: 'none' , border: '1px solid' , padding: '10px' , margin: 'auto' , width: '700px' }}>
            <p>ID :{item._id}</p>
            <p>Name:{item.name}</p>
            <p>Email: {item.email}</p>
            <p>Password: {item.password}</p>
            <button onClick={() => deleteUser(item._id)}>Delete</button>
            <Link to={`/edit/${item._id}`}><button style={{marginLeft: '10px'}}>Edit</button></Link>
          </li>
        </ul>
      ))}
    </div>
  )
}

export default Home
