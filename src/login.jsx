import React, {useState} from "react";
import { useAuth } from "./Context/AuthContext";
import axios from "axios";

function Login() {
    const { login } = useAuth();
    const[formData, setformData] = usestate({
        email: "",
        password: ""
    })
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setformData({...formData, [e.target.name]:e.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const user = await login(formData.email, formData.password);
            alert(`Welcome back ${user.name}!`);
        } catch(error) {
            setError(error.response?.data?.message || "Login failed");
        }
    };

    return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;