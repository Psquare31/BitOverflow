import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Tags from "./Tags";
import FlagIcon from "@mui/icons-material/Flag";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import NumberedBadge from "./NumberedBadge";
import Comments from "./Comments";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

export default function BasicStack() {
  // Mock question data
  const questionData = [
    {
      id: 1,
      question: "What is React?",
      tags: ["React", "JavaScript"],
      upvotes: 10,
      reports: 2,
    },
    // {
    //   id: 2,
    //   question: "How does useState work?",
    //   tags: ["React Hooks", "State Management"],
    //   upvotes: 5,
    //   reports: 1,
    // },
  ];

  return (
    <Box sx={{ width: "80vw" }}>
      <Stack spacing={5}>
        {questionData.map((q) => (
          <Paper elevation={24} key={q.id}>
            <Tags tags={q.tags} />
            <div style={{ padding: "16px 8px" }}>{q.question}</div>
            <div style={{ marginTop: "8px", paddingBottom: "16px" }}>
              <NumberedBadge
                icon={<FlagIcon fontSize="medium" />}
                badgeContent={q.reports}
              />
              <NumberedBadge
                icon={<ThumbUpIcon fontSize="small" />}
                badgeContent={q.upvotes}
              />
            </div>
          </Paper>
        ))}
        <Comments />
      </Stack>
    </Box>
  );
}
