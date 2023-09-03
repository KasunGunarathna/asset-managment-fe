import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from React Router if needed



interface BreadcrumbTrailProps {
  items: string[];
}

const BreadcrumbTrail: React.FC<BreadcrumbTrailProps> = ({ items }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ paddingBottom: '10px' }}>
      {items.map((item,index) => (
        <Typography
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          color="inherit"
        >
          {item}
        </Typography>
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbTrail;
