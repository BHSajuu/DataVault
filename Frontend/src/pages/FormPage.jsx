import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

export default function FormPage() {
  const [formData, setFormData] = useState({
    VehicleNo: "",
    quantity: "",
    rate: 0,
    amount: 0,
    expenses: "",
    remarks: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("formDataList") || "[]");
    const newData = [...storedData, formData];
    localStorage.setItem("formDataList", JSON.stringify(newData));

    setFormData({
      VehicleNo: "",
      quantity: "",
      rate: 0,
      amount: 0,
      expenses: "",
      remarks: "",
      date: "",
    });

    console.log("Form Data Submitted:", formData);
  };

  const navigate = useNavigate();
  return (
    <>
      {/* Fixed Navbar */}
      <Box sx={{ position: "fixed", top: 0, width: "100%", zIndex: 1 }}>
        <Navbar />
      </Box>

      {/* Main Content Wrapper with Scroll */}
      <Box
        sx={{
          marginTop: "70px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          padding: "16px",
          overflowY: "auto",
        }}>
        {/* Backward Arrow Icon */}
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            alignSelf: "flex-start",
            color: "black",
            marginBottom: "16px",
          }}>
          <ArrowBackIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            maxWidth: "400px",
            width: "100%",
            padding: "24px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}>
          <Typography
            variant="h5"
            style={{ textAlign: "center", color: "black" }}>
            Add Details
          </Typography>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "100%",
            }}>
            {/* Form Fields */}
            <TextField
              label="Vehicle No."
              name="VehicleNo"
              value={formData.VehicleNo}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Rate"
              name="rate"
              type="number"
              value={formData.rate}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Expenses"
              name="expenses"
              value={formData.expenses}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#496989",
                "&:hover": { backgroundColor: "#6589A6" },
              }}>
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}
