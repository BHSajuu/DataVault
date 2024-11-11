import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import * as React from "react";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  const [userDialogOpen, setUserDialogOpen] = React.useState(false);
  const [reportDialogOpen, setReportDialogOpen] = React.useState(false);

  // Sample data for users and reports
  const users = ["User 1", "User 2", "User 3", "User 4"];
  const reports = ["Report 1", "Report 2", "Report 3", "Report 4"];

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "Row",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "space-evenly",
        gap: 5,
      }}>
      {/* Users Box */}
      <Box
        onClick={() => setUserDialogOpen(true)}
        sx={{
          p: 3,
          backgroundColor: "#f0f0f0",
          borderRadius: 2,
          cursor: "pointer",
          width: 150,
          textAlign: "center",
          "&:hover": { backgroundColor: "#e0e0e0" },
        }}>
        <Typography variant="h6">Users</Typography>
      </Box>

      {/* Reports Box */}
      <Box
        onClick={() => setReportDialogOpen(true)}
        sx={{
          p: 3,
          backgroundColor: "#f0f0f0",
          borderRadius: 2,
          cursor: "pointer",
          width: 150,
          textAlign: "center",
          "&:hover": { backgroundColor: "#e0e0e0" },
        }}>
        <Typography variant="h6">Reports</Typography>
      </Box>

      {/* User Dialog */}
      <Dialog open={userDialogOpen} onClose={() => setUserDialogOpen(false)}>
        <DialogTitle>Users</DialogTitle>
        <DialogContent>
          {users.map((user, index) => (
            <DialogContentText key={index}>{user}</DialogContentText>
          ))}
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog
        open={reportDialogOpen}
        onClose={() => setReportDialogOpen(false)}>
        <DialogTitle>Reports</DialogTitle>
        <DialogContent>
          {reports.map((report, index) => (
            <DialogContentText key={index}>{report}</DialogContentText>
          ))}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default function DashboardLayoutSidebarHidden() {
  const router = useDemoRouter("/dashboard");

  return (
    <AppProvider router={router} theme={demoTheme}>
      <DashboardLayout hideNavigation>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
