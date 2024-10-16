import React , {useState , useEffect , createContext} from 'react'
import axios from 'axios'

export const UserContext = createContext()

export const UserProvider = ({children}) => {

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]); 

    const fetchUser = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/user');
          if (response.data.success) {
            setUsers(response.data.users);
            setFilteredUsers(response.data.users); 
          }
        } catch (error) {
          console.log(error.response?.data.message);
        }
      };
    
      const deleteUser = async (userId) => {
        try {
          const response = await axios.delete(`http://localhost:4000/api/user/${userId}`);
          if (response.data.success) {
            setUsers(users.filter(user => user._id !== userId));
            setFilteredUsers(filteredUsers.filter(user => user._id !== userId)); // อัพเดตทั้งสอง State
          }
        } catch (error) {
          console.log(error.message);
        }
      };
    
      const AddUser = async (name , email , password) => {
        try {
          const response = await axios.post('http://localhost:4000/api/user', { name, email, password });
          if (response.data.success) {
            setUsers([...users, response.data.user]);
            setFilteredUsers([...filteredUsers, response.data.user]); 
          }
        } catch (error) {
          console.log(error.message);
        }
      };

      const filterUsers = (query) => {
        if (query.trim() === '') {
          setFilteredUsers(users);
        } else {
            const filtered = users.filter((user) => {
            const queryLower = query.toLowerCase();
            return (
              user.name.toLowerCase().includes(queryLower) ||
              user.email.toLowerCase().includes(queryLower) ||
              user._id.toString().includes(queryLower)
            );
          });
          setFilteredUsers(filtered);
        }
      };

      console.log(filteredUsers);

      useEffect(() => {
        fetchUser();
      }, []);

      
      const value = {
        AddUser,
        filteredUsers,
        deleteUser,
        filterUsers,
      }
      
  return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
  )
}

