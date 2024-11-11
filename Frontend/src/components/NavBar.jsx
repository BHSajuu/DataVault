import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#001F3F" }}>
      <Toolbar>
        {/* Left Side: Icon and Name */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{
            mr: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Avatar
            alt="App Icon"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnyu7pe1JTJrB_w59j8GqHD45le8HNk0TUtw&s"
            sx={{ width: 40, height: 40 }}
          />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontFamily: "monospace", fontWeight: 700 }}>
          Tony Stark
        </Typography>

        {/* Right Side: Login Button */}
        <Button color="inherit" onClick={useAuth()?.logout}>
          LogOut
        </Button>
      </Toolbar>
    </AppBar>
  );
}
