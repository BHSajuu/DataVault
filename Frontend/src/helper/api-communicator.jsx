import axios from "axios";

export const loginUser = async (email, password) => {
  const res = await axios.post("http://localhost:3000/api/users/login", {
    email,
    password,
  });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (name, email, password) => {
  const res = await axios.post("http://localhost:3000/api/users/signup", {
    name,
    email,
    password,
  });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

// async function for user logout
async function logoutUser() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found - User may already be logged out");
      return;
    }

    // API call for user logout
    await axios.get("http://localhost:3000/api/users/logout", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("User logged out successfully");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.error("Unauthorized access - please log in again.");
        localStorage.removeItem("token");
      } else {
        console.error("Logout failed:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

export default logoutUser;