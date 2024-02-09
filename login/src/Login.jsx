/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [heading,setHeading] =useState(null)
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assume the registration API returns a success response
      const response =await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          
        }),

      });
     
    
    const res = await response.json();
    
    if (response.ok) {
        if (res.msg === "ok") {
            navigate("/home");
        } else {
            setHeading(res.msg);
            console.log(res.msg);
        }
    } else {
        // Redirect to the login page after unsuccessful login
        navigate("/login");
    }
    
    

      // Redirect to the login page after successful registration
      navigate("/login"); // Replace "/login" with the actual login route
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black"
    >
    <h1 className="text-red-500 absolute top-10" >{heading==null?"":heading}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="border rounded w-full py-2 px-3"
          />
        </div>
    
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <Link to={"/"} className="pl-3 text-sm">
        I don't have account? 
      </Link>
      </form>
     
    </div>
  );
}
