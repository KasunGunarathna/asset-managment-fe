import React from "react";
import Paper from "@mui/material/Paper";
import { Box, Container, Divider, Typography } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import BreadcrumbTrail from "../components/BreadcrumbTrail";
import CopyrightTrail from "../components/Copyright";

interface YourReusableTemplateProps {
  userDetails: any;
  handleLogout: () => void;
  breadCrumb: string[];
}

const MainTemplate: React.FC<YourReusableTemplateProps> = ({
  userDetails,
  handleLogout,
  breadCrumb,
  children,
}) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header userDetails={userDetails} onLogout={handleLogout} />
        <Sidebar />
        <Container sx={{ flexGrow: 1, paddingTop: "16px" ,overflowY: 'auto',paddingBottom:"50px"}}>
          <MainContent>
            <Paper elevation={3} sx={{ padding: "15px" }}>
              <BreadcrumbTrail items={breadCrumb} />
              <Typography variant="h5" component="div" sx={{ flexGrow: 1,margin:"5px" }}>
                {breadCrumb[2]||null}
              </Typography>
              <Divider sx={{ marginBottom:"25px" }}/>
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
