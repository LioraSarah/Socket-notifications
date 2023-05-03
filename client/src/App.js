import logo from './logo.svg';
import './App.css';
import { Login } from './components/login/login';
import { useEffect, useState } from 'react';
import { Navbar } from './components/navbar/Navbar';
import { Card } from './components/card/Card';
import { posts } from './data/data';
import { io } from "socket.io-client";

function App() {
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);
  
  useEffect(()=>{
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(()=>{
    socket?.emit("newUser", user);
  },[socket, user]);

  return (
    <div className="App container">
      {user? (
        <>
          <Navbar username={user} socket={socket} />
          <div className='main-content'>
            {posts.map((post) => (
              <Card key={post.id} post={post} socket={socket} user={user} />
            ))}
          </div>
        </>) : (
          <div className="login-view">
            <Login setAppUser={setUser} />
          </div>
        )}
    </div>
  );
}

export default App;
