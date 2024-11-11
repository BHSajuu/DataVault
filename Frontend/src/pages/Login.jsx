import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Removed the `.tsx` extension

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await auth?.login(email, password);
      console.log("login successful");
    } catch (error) {
      console.log("login failed");
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      navigate("/");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#aaade6",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#ffffff",
          width: "100%",
          maxWidth: "400px",
        }}>
        <Typography variant="h5" sx={{ marginBottom: "16px", color: "black" }}>
          Login
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
          }}>
          <TextField
            sx={{ color: "black" }}
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
        <Typography sx={{ mt: 2, color: "black" }}>
          Don't have an account?{" "}
          <Button
            onClick={() => navigate("/signup")}
            sx={{ textTransform: "none" }}>
            Sign Up
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}
