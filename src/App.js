// import logo from './logo.svg';
import  React, { useState } from 'react';
import './App.css';
import UserForm from './Components/UserForm';
import UserList from './Components/UserList';

function App() {
  const [_newUser, setNewUser] = useState(null);

  const newUser=async(user)=>{
    console.log(user, "is new user");
    await setNewUser(user);
  }
  return (
    <div className="App">
      <UserForm  newUser={newUser} />
      <UserList _newUser={_newUser} />
    </div>
  );
}

export default App;
