import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";;

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    vertical: "top",
    horizontal: "right",
    right: -5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function CustomizedBadges({ icon, badgeContent }) {
  return (
    <IconButton aria-label="cart">
      <StyledBadge  badgeContent={badgeContent} color="secondary">
      {icon}
      </StyledBadge>
    </IconButton>
  );
}
