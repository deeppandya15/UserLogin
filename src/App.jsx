import { useState } from 'react';
import './App.css';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';


const divStyle = {
  backgroundColor: "black",
  width: "100%",
  display: "flex",
  justifyContent: "center", // Center horizontally
  alignItems: "center",    // Center vertically
};

const btnStyle = {
  backgroundColor: "#4CAF50",
  border: "none",
  color: "white",
  padding: "15px 32px",
  textAlign: "center",
  textDecoration: "none",
  // display: "inline-block",
  fontSize: "16px",
  margin: "4px 2px",
  cursor: "pointer",
  borderRadius: "4px",
};

function App() {
  const [currentview, setCurrentview] = useState("")
  return (

    <>
      {/* {currentview === "" && ( */}
      <div style={divStyle}>
        <button style={btnStyle} onClick={() => setCurrentview("signup")}>Sign Up</button><br />
        <button style={btnStyle} onClick={() => setCurrentview("login")}>Login</button>
      </div>
      {/* )} */}
      {currentview === "signup" && <SignUp />}
      {currentview === "login" && <Login />}


    </>
  )
}

export default App;
