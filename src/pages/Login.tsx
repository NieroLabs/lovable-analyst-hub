import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    if ((username === "sakajiri" && password === "saka@4599.123") || (username === "juan.gargiulo" && password === "juan@1189.32" )) {
      login("fake-token");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
