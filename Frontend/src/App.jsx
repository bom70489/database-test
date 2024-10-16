import React from 'react';
import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home';
import EditUser from './pages/EditUser';

const App = () => {
  
  return (
    <div>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/edit/:userId' element={<EditUser/>}/>
        </Routes>
    </div>
  );
};

export default App;
