import { Box, Button, IconButton, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WhatsAppIcon from "../assets/photo2.png"; // Adjust the path as needed

export default function Footer() {
  const navigate = useNavigate();

  // WhatsApp link for customer support
  const handleContactUs = () => {
    window.open(
      "https://wa.me/916002580289?text=Hello,%20I%20need%20help",
      "_blank"
    );
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#496989",
        color: "white",
        position: "fixed",
        bottom: 0,
        width: "100%",
        py: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px 0px",
        mx: "auto",
        mb: 2,
      }}>
      <Toolbar sx={{ justifyContent: "center", gap: 2 }}>
        {/* Add Details Button */}
        <Button
          onClick={() => navigate("/form")}
          variant="contained"
          sx={{
            backgroundColor: "#384B70",
            color: "white",
            "&:hover": { backgroundColor: "#A594F9" },
          }}>
          Add Details
        </Button>

        {/* View Details Button */}
        <Button
          onClick={() => navigate("/show")}
          variant="contained"
          sx={{
            backgroundColor: "#7E60BF",
            color: "white",
            "&:hover": { backgroundColor: "#A594F9" },
          }}>
          View Details
        </Button>

        {/* WhatsApp Contact Button with Image */}
        <IconButton onClick={handleContactUs} sx={{ p: 0 }}>
          <img
            src={WhatsAppIcon}
            alt="Contact on WhatsApp"
            style={{ width: 150, height: 40, borderRadius: "10px" }}
          />
        </IconButton>
      </Toolbar>
    </Box>
  );
}
