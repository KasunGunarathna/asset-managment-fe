import React from "react";
import Paper from "@mui/material/Paper";
import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import BreadcrumbTrail from "../components/BreadcrumbTrail";
import CopyrightTrail from "../components/Copyright";

interface YourReusableTemplateProps {
    userDetails: any; 
    handleLogout: () => void;
  }

const MainTemplate: React.FC<YourReusableTemplateProps> = ({
  userDetails,
  handleLogout,
  children
}) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header userDetails={userDetails} onLogout={handleLogout} />
        <Sidebar />
        <Container sx={{ flexGrow: 1, paddingTop: "16px" }}>
          <MainContent>
            <Paper elevation={3} sx={{ padding: "15px" }}>
              <BreadcrumbTrail items={["Home", "Users"]} />
              {children}
            </Paper>
          </MainContent>
        </Container>
      </Box>
      <CopyrightTrail />
    </>
  );
};

export default MainTemplate;
