import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

export default function ShowPage() {
  const [formDataList, setFormDataList] = useState([]);
  const [openDescription, setOpenDescription] = useState(null);

  useEffect(() => {
    const savedData = [
      {
        VehicleNo: "ABC123",
        quantity: "50",
        rate: 100,
        amount: 5000,
        expenses:
          "Transportation Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi explicabo animi quis consectetur, facere nemo obcaecati! Necessitatibus, non? Distinctio qui nihil, neque deleniti adipisci vel odio aut officiis delectus necessitatibus!",
        remarks: "Sample data 1",
        date: "2024-11-06",
      },
      {
        VehicleNo: "XYZ456",
        quantity: "75",
        rate: 120,
        amount: 9000,
        expenses: "Fuel",
        remarks: "Sample data 2",
        date: "2024-11-07",
      },
    ];
    setFormDataList(savedData);
  }, []);

  const handleRowClick = (index) => {
    setOpenDescription(index);
  };

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <IconButton
        onClick={() => navigate("/")}
        sx={{ alignSelf: "flex-start", color: "black", marginBottom: "16px" }}>
        <ArrowBackIcon />
      </IconButton>

      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px", color: "black" }}>
          Submitted Details
        </Typography>

        <Box sx={{ overflowX: "" }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 1000, backgroundColor: "#DFF2EB" }}
              aria-label="user details table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "5%" }}>Sl No.</TableCell>
                  <TableCell sx={{ width: "10%" }}>Vehicle No</TableCell>
                  <TableCell sx={{ width: "10%" }}>Quantity</TableCell>
                  <TableCell sx={{ width: "10%" }}>Rate</TableCell>
                  <TableCell sx={{ width: "10%" }}>Amount</TableCell>
                  <TableCell sx={{ width: "30%" }}>Expenses</TableCell>{" "}
                  {/* 5x width */}
                  <TableCell sx={{ width: "10%" }}>Remarks</TableCell>
                  <TableCell sx={{ width: "10%" }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formDataList.map((row, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleRowClick(index)}
                    sx={{ cursor: "pointer", "& *": { color: "black" } }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.VehicleNo}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.rate}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.expenses}</TableCell>{" "}
                    {/* Expenses column */}
                    <TableCell>{row.remarks}</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {openDescription !== null && (
          <Dialog
            open={openDescription !== null}
            onClose={() => setOpenDescription(null)}
            fullWidth
            maxWidth="md">
            <DialogTitle>Full Details</DialogTitle>
            <DialogContent>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Typography variant="h6">
                  Sl No: {openDescription + 1}
                </Typography>
                <Typography variant="h6">
                  Vehicle No: {formDataList[openDescription].VehicleNo}
                </Typography>
                <Typography variant="h6">
                  Quantity: {formDataList[openDescription].quantity}
                </Typography>
                <Typography variant="h6">
                  Rate: {formDataList[openDescription].rate}
                </Typography>
                <Typography variant="h6">
                  Amount: {formDataList[openDescription].amount}
                </Typography>
                <Typography variant="h6">
                  Expenses: {formDataList[openDescription].expenses}
                </Typography>
                <Typography variant="h6">
                  Remarks: {formDataList[openDescription].remarks}
                </Typography>
                <Typography variant="h6">
                  Date: {formDataList[openDescription].date}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDescription(null)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </>
  );
}
